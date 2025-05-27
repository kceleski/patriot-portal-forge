
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
    const { action, ...payload } = await req.json();

    switch (action) {
      case "search_facilities":
        let query = supabaseClient
          .from("facility")
          .select(`
            *,
            facility_amenities(amenities(*)),
            facility_images(*),
            care_types(*)
          `);

        if (payload.location) {
          query = query.ilike("city", `%${payload.location}%`);
        }
        if (payload.care_type) {
          query = query.eq("facility_type", payload.care_type);
        }
        if (payload.price_min) {
          query = query.gte("price_range_min", payload.price_min);
        }
        if (payload.price_max) {
          query = query.lte("price_range_max", payload.price_max);
        }

        const { data: facilities, error: facilitiesError } = await query.limit(20);
        if (facilitiesError) throw facilitiesError;

        return new Response(JSON.stringify({ facilities }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });

      case "get_facility_details":
        const { data: facility, error: facilityError } = await supabaseClient
          .from("facility")
          .select(`
            *,
            facility_amenities(amenities(*)),
            facility_images(*),
            care_types(*),
            tours(*)
          `)
          .eq("id", payload.facility_id)
          .single();

        if (facilityError) throw facilityError;
        return new Response(JSON.stringify({ facility }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });

      case "get_facility_metrics":
        const { data: metrics, error: metricsError } = await supabaseClient
          .from("analytics")
          .select("*")
          .eq("meta->>facility_id", payload.facility_id)
          .gte("timestamp", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

        if (metricsError) throw metricsError;
        return new Response(JSON.stringify({ metrics }), {
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
