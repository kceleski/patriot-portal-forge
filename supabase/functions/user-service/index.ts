
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !user) throw new Error("Authentication failed");

    const { action, ...payload } = await req.json();

    switch (action) {
      case "get_profile":
        const { data: profile, error: profileError } = await supabaseClient
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();
        
        if (profileError) throw profileError;
        return new Response(JSON.stringify({ profile }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });

      case "update_profile":
        const { data: updatedProfile, error: updateError } = await supabaseClient
          .from("users")
          .update(payload.updates)
          .eq("id", user.id)
          .select()
          .single();

        if (updateError) throw updateError;
        return new Response(JSON.stringify({ profile: updatedProfile }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });

      case "get_professional_profile":
        const { data: professionalProfile, error: profError } = await supabaseClient
          .from("user_profile_professional")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (profError) throw profError;
        return new Response(JSON.stringify({ profile: professionalProfile }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });

      default:
        throw new Error("Invalid action");
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
