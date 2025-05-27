
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import OpenAI from "https://esm.sh/openai@4.20.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper function to search facilities from database
async function searchFacilitiesFromDB(args: any, supabaseClient: any) {
  try {
    const { data: facilities, error } = await supabaseClient
      .from("facility")
      .select("*")
      .limit(10);

    if (error) throw error;
    
    return {
      success: true,
      facilities: facilities || [],
      count: facilities?.length || 0
    };
  } catch (error) {
    console.error("Error searching facilities:", error);
    return {
      success: false,
      error: error.message,
      facilities: [],
      count: 0
    };
  }
}

// Helper function to get client list for professionals
async function getClientListFromDB(args: any, supabaseClient: any) {
  try {
    const { data: clients, error } = await supabaseClient
      .from("clients")
      .select("*")
      .limit(20);

    if (error) throw error;
    
    return {
      success: true,
      clients: clients || [],
      count: clients?.length || 0
    };
  } catch (error) {
    console.error("Error getting client list:", error);
    return {
      success: false,
      error: error.message,
      clients: [],
      count: 0
    };
  }
}

// Helper function to get referral metrics
async function getReferralMetricsFromDB(args: any, supabaseClient: any) {
  try {
    const { data: referrals, error } = await supabaseClient
      .from("referrals")
      .select("*");

    if (error) throw error;
    
    const metrics = {
      total_referrals: referrals?.length || 0,
      pending: referrals?.filter(r => r.status === 'pending')?.length || 0,
      completed: referrals?.filter(r => r.status === 'completed')?.length || 0,
      in_progress: referrals?.filter(r => r.status === 'in_progress')?.length || 0
    };
    
    return {
      success: true,
      metrics
    };
  } catch (error) {
    console.error("Error getting referral metrics:", error);
    return {
      success: false,
      error: error.message,
      metrics: {}
    };
  }
}

// Helper function to get facility metrics
async function getFacilityMetricsFromDB(args: any, supabaseClient: any) {
  try {
    const { data: placements, error } = await supabaseClient
      .from("placements")
      .select("*");

    if (error) throw error;
    
    const metrics = {
      total_placements: placements?.length || 0,
      pending: placements?.filter(p => p.status === 'pending')?.length || 0,
      confirmed: placements?.filter(p => p.status === 'confirmed')?.length || 0,
      completed: placements?.filter(p => p.status === 'completed')?.length || 0
    };
    
    return {
      success: true,
      metrics
    };
  } catch (error) {
    console.error("Error getting facility metrics:", error);
    return {
      success: false,
      error: error.message,
      metrics: {}
    };
  }
}

// Helper function to get professional list for facilities
async function getProfessionalListFromDB(args: any, supabaseClient: any) {
  try {
    const { data: professionals, error } = await supabaseClient
      .from("user_profile_professional")
      .select("*")
      .limit(20);

    if (error) throw error;
    
    return {
      success: true,
      professionals: professionals || [],
      count: professionals?.length || 0
    };
  } catch (error) {
    console.error("Error getting professional list:", error);
    return {
      success: false,
      error: error.message,
      professionals: [],
      count: 0
    };
  }
}

// Helper function to update facility listing
async function updateFacilityListingFromDB(args: any, supabaseClient: any, userId: string) {
  try {
    const { facility_id, updates } = args;
    
    const { data: facility, error } = await supabaseClient
      .from("facility")
      .update(updates)
      .eq("id", facility_id)
      .select()
      .single();

    if (error) throw error;
    
    return {
      success: true,
      facility,
      message: "Facility listing updated successfully"
    };
  } catch (error) {
    console.error("Error updating facility listing:", error);
    return {
      success: false,
      error: error.message,
      message: "Failed to update facility listing"
    };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const openai = new OpenAI({
    apiKey: Deno.env.get("OPENAI_API_KEY"),
  });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !user) throw new Error("Authentication failed");

    const { action, assistant_type, message, conversation_id } = await req.json();

    if (action === "chat") {
      let conversationData;
      let threadId;

      // 1. Get or Create Conversation and Thread ID
      if (conversation_id) {
        const { data } = await supabaseClient
          .from("ava_conversations")
          .select("*")
          .eq("id", conversation_id)
          .single();
        conversationData = data;
        threadId = conversationData?.openai_thread_id;

        // If conversation exists but no thread ID, create a new thread
        if (!threadId) {
          const thread = await openai.beta.threads.create();
          threadId = thread.id;
          
          await supabaseClient
            .from("ava_conversations")
            .update({ openai_thread_id: threadId })
            .eq("id", conversation_id);
        }
      } else {
        // Create new conversation and thread
        const thread = await openai.beta.threads.create();
        threadId = thread.id;

        const { data } = await supabaseClient
          .from("ava_conversations")
          .insert({
            user_id: user.id,
            assistant_type,
            openai_thread_id: threadId
          })
          .select()
          .single();
        conversationData = data;
      }

      // 2. Add user's message to the thread
      await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: message
      });

      // Store user message in database
      await supabaseClient
        .from("ava_messages")
        .insert({
          conversation_id: conversationData.id,
          role: "user",
          content: message
        });

      // 3. Select the correct persistent Assistant ID from Env Vars
      const assistantId = Deno.env.get(`OPENAI_ASSISTANT_ID_${assistant_type.toUpperCase()}`);
      if (!assistantId) {
        throw new Error(`Assistant ID not found for type: ${assistant_type}`);
      }

      // 4. Create the Run
      const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId
      });

      // 5. REFACTORED LOOP: Wait for completion or action
      let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);

      while (runStatus.status === 'in_progress' || runStatus.status === 'queued' || runStatus.status === 'requires_action') {
        if (runStatus.status === 'requires_action') {
          const toolOutputs = [];
          const toolCalls = runStatus.required_action.submit_tool_outputs.tool_calls;

          for (const toolCall of toolCalls) {
            const functionName = toolCall.function.name;
            const args = JSON.parse(toolCall.function.arguments || '{}');
            let output;

            // Tool Dispatcher Logic
            switch (functionName) {
              case 'search_facilities':
                output = await searchFacilitiesFromDB(args, supabaseClient);
                break;
              case 'get_client_list':
                output = await getClientListFromDB(args, supabaseClient);
                break;
              case 'get_referral_metrics':
                output = await getReferralMetricsFromDB(args, supabaseClient);
                break;
              case 'get_facility_metrics':
                output = await getFacilityMetricsFromDB(args, supabaseClient);
                break;
              case 'get_professional_list':
                output = await getProfessionalListFromDB(args, supabaseClient);
                break;
              case 'update_facility_listing':
                output = await updateFacilityListingFromDB(args, supabaseClient, user.id);
                break;
              default:
                output = { error: `Function ${functionName} not implemented`, success: false };
            }

            toolOutputs.push({
              tool_call_id: toolCall.id,
              output: JSON.stringify(output)
            });
          }

          // Submit outputs back to the run
          await openai.beta.threads.runs.submitToolOutputs(threadId, run.id, {
            tool_outputs: toolOutputs
          });
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
      }

      // 6. Get final response and return to user
      const threadMessages = await openai.beta.threads.messages.list(threadId);
      const assistantMessage = threadMessages.data[0];
      const responseContent = assistantMessage.content[0].type === "text" 
        ? assistantMessage.content[0].text.value 
        : "I apologize, I couldn't generate a response.";

      // Store assistant response
      await supabaseClient
        .from("ava_messages")
        .insert({
          conversation_id: conversationData.id,
          role: "assistant",
          content: responseContent
        });

      return new Response(JSON.stringify({ 
        response: responseContent,
        conversation_id: conversationData.id
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    throw new Error("Invalid action");
  } catch (error) {
    console.error("AVA Assistant error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
