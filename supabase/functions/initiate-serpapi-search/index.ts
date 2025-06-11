
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '', 
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { search_criteria, agent_id } = await req.json();
    console.log('Received search request:', {
      search_criteria,
      agent_id
    });

    // Create search request record
    const { data: searchRequest, error: insertError } = await supabase
      .from('user_search_requests')
      .insert({
        agent_id,
        search_criteria,
        status: 'pending_serpapi'
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    // Construct Serper API query
    const query = search_criteria.search_query || 
      `senior living facilities in ${search_criteria.location || 'Phoenix, AZ'}`;
    
    const serperApiUrl = 'https://google.serper.dev/maps';
    const serperPayload = {
      q: query,
      gl: 'us',
      hl: 'en'
    };

    console.log('Making Serper API request:', serperPayload);

    // Update status to processing
    await supabase
      .from('user_search_requests')
      .update({
        status: 'serpapi_processing',
        serpapi_query_sent: query
      })
      .eq('id', searchRequest.id);

    // Make Serper API request
    const serperApiResponse = await fetch(serperApiUrl, {
      method: 'POST',
      headers: {
        'X-API-KEY': Deno.env.get('SERPER_API_KEY') ?? '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(serperPayload)
    });

    const serperApiData = await serperApiResponse.json();
    console.log('Serper API response received, storing raw data');

    // Store raw results in serperapi_raw_results table
    const { error: rawResultsError } = await supabase
      .from('serperapi_raw_results')
      .insert({
        user_search_request_id: searchRequest.id,
        raw_json_data: serperApiData,
        parsing_status: 'new'
      });

    if (rawResultsError) {
      throw rawResultsError;
    }

    // Update search request status
    await supabase
      .from('user_search_requests')
      .update({
        status: 'serpapi_complete'
      })
      .eq('id', searchRequest.id);

    return new Response(JSON.stringify({
      success: true,
      search_request_id: searchRequest.id,
      message: 'Serper API search initiated and raw data stored'
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 200
    });

  } catch (error) {
    console.error('Error in initiate-serpapi-search:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 500
    });
  }
});
