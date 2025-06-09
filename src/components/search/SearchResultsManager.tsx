
import React, { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SerperMapResult, SerperPlaceResult } from '@/services/serperService';
import { toast } from '@/hooks/use-toast';

interface SearchResultsManagerProps {
  searchQuery: string;
  results: (SerperMapResult | SerperPlaceResult)[];
  userId?: string;
  onSaveComplete?: (savedCount: number) => void;
}

const SearchResultsManager: React.FC<SearchResultsManagerProps> = ({
  searchQuery,
  results,
  userId,
  onSaveComplete
}) => {
  
  const saveSearchResults = async () => {
    if (!searchQuery || results.length === 0) return;
    
    try {
      // Convert results to JSON-compatible format
      const jsonResults = JSON.parse(JSON.stringify(results));
      
      // Save the search query and results
      const { data: searchRecord, error: searchError } = await supabase
        .from('search_results')
        .insert({
          query: searchQuery,
          results: jsonResults,
          senior_id: userId || null
        })
        .select()
        .single();

      if (searchError) {
        console.error('Error saving search results:', searchError);
        return;
      }

      // Log the search activity
      await supabase.from('analytics').insert({
        event_type: 'facility_search',
        user_id: userId || null,
        meta: {
          query: searchQuery,
          results_count: results.length,
          search_id: searchRecord.id
        }
      });

      onSaveComplete?.(results.length);
      console.log('Search results saved successfully');
      
    } catch (error) {
      console.error('Error in search results manager:', error);
      toast({
        title: "Save Error",
        description: "Failed to save search results. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (results.length > 0) {
      saveSearchResults();
    }
  }, [searchQuery, results]);

  return null; // This is a utility component with no UI
};

export default SearchResultsManager;
