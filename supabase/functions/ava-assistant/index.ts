
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import OpenAI from "https://esm.sh/openai@4.20.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ASSISTANT_CONFIGS = {
  end_user: {
    instructions: "You are AVA, an AI assistant specializing in helping veterans and their families find appropriate senior care facilities. Be friendly, supportive, and patient. Ask clarifying questions to understand their specific needs, budget, location preferences, and care requirements. Provide personalized recommendations based on their responses.",
    tools: ["search_facilities", "update_map_view"]
  },
  professional: {
    instructions: "You are AVA, an AI assistant for healthcare professionals working in senior care placement. Be efficient, professional, and data-focused. Help with client management, referral tracking, and facility searches. Provide metrics and analytics to support their decision-making process.",
    tools: ["search_facilities", "get_client_list", "get_referral_metrics"]
  },
  facility: {
    instructions: "You are AVA, an AI assistant for senior care facility administrators. Be business-focused, analytical, and solution-oriented. Help with facility management, performance metrics, professional networking, and listing optimization. Focus on revenue optimization and operational efficiency.",
    tools: ["get_facility_metrics", "get_professional_list", "update_facility_listing"]
  }
};

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
      // Get or create conversation
      let conversationData;
      if (conversation_id) {
        const { data } = await supabaseClient
          .from("ava_conversations")
          .select("*")
          .eq("id", conversation_id)
          .single();
        conversationData = data;
      } else {
        const { data } = await supabaseClient
          .from("ava_conversations")
          .insert({
            user_id: user.id,
            assistant_type
          })
          .select()
          .single();
        conversationData = data;
      }

      // Store user message
      await supabaseClient
        .from("ava_messages")
        .insert({
          conversation_id: conversationData.id,
          role: "user",
          content: message
        });

      // Get conversation history
      const { data: messages } = await supabaseClient
        .from("ava_messages")
        .select("*")
        .eq("conversation_id", conversationData.id)
        .order("created_at", { ascending: true });

      // Create assistant if not exists
      const assistantConfig = ASSISTANT_CONFIGS[assistant_type];
      const assistant = await openai.beta.assistants.create({
        name: `AVA ${assistant_type} Assistant`,
        instructions: assistantConfig.instructions,
        model: "gpt-4o-mini",
        tools: [
          { type: "function", function: { name: "search_facilities", description: "Search for senior care facilities" } },
          { type: "function", function: { name: "get_client_list", description: "Get client list for professionals" } },
          { type: "function", function: { name: "get_referral_metrics", description: "Get referral metrics" } },
          { type: "function", function: { name: "get_facility_metrics", description: "Get facility performance metrics" } },
          { type: "function", function: { name: "update_facility_listing", description: "Update facility listing" } }
        ]
      });

      // Create thread and run
      const thread = await openai.beta.threads.create({
        messages: messages.map(msg => ({
          role: msg.role as "user" | "assistant",
          content: msg.content
        }))
      });

      const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: assistant.id
      });

      // Wait for completion
      let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      while (runStatus.status === "running" || runStatus.status === "queued") {
        await new Promise(resolve => setTimeout(resolve, 1000));
        runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      }

      // Get the assistant's response
      const threadMessages = await openai.beta.threads.messages.list(thread.id);
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
