
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Grid3X3, Building } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import StorepointFacilityCard from '@/components/facility/StorepointFacilityCard';

interface StorepointFacility {
  name: string;
  address: string;
  street: string;
  city: string;
  state: string;
  zip: number;
  phone: string;
  email: string;
  website: string;
  type: string;
  capacity: string;
  reviews: string;
  image_url: string;
  lat: string;
  lng: string;
}

const StorepointFacilities = () => {
  const [facilities, setFacilities] = useState<StorepointFacility[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<StorepointFacility[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    fetchStorepointFacilities();
  }, []);

  useEffect(() => {
    filterFacilities();
  }, [facilities, searchTerm, stateFilter, typeFilter]);

  const fetchStorepointFacilities = async () => {
    try {
      const { data, error } = await supabase
        .from('Storepoint')
        .select('*')
        .order('name');

      if (error) throw error;

      const formattedData = data.map(item => ({
        name: item.name || '',
        address: item.address || '',
        street: item.street || '',
        city: item.city || '',
        state: item.state || '',
        zip: item.zip || 0,
        phone: item.phone || '',
        email: item.email || '',
        website: item.website || '',
        type: item.type || '',
        capacity: item.capacity || '',
        reviews: item.reviews || '',
        image_url: item.image_url || '',
        lat: item.lat || '',
        lng: item.lng || ''
      }));

      setFacilities(formattedData);
    } catch (error) {
      console.error('Error fetching Storepoint facilities:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterFacilities = () => {
    let filtered = facilities.filter(facility => {
      const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           facility.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           facility.type.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesState = stateFilter === 'all' || facility.state === stateFilter;
      const matchesType = typeFilter === 'all' || facility.type === typeFilter;
      
      return matchesSearch && matchesState && matchesType;
    });

    setFilteredFacilities(filtered);
  };

  const getUniqueStates = () => {
    const states = [...new Set(facilities.map(f => f.state).filter(Boolean))];
    return states.sort();
  };

  const getUniqueTypes = () => {
    const types = [...new Set(facilities.map(f => f.type).filter(Boolean))];
    return types.sort();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStateFilter('all');
    setTypeFilter('all');
  };

  return (
    <div className="min-h-screen bg-brand-off-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-brand-navy mb-4">Care Facilities Directory</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our network of verified care facilities and providers
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              Gallery View
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Map View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="space-y-6">
            {/* Search and Filters */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-brand-navy">
                  <Search className="h-5 w-5 mr-2" />
                  Search & Filter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search facilities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white border-gray-300"
                    />
                  </div>
                  
                  <Select value={stateFilter} onValueChange={setStateFilter}>
                    <SelectTrigger className="bg-white border-gray-300">
                      <SelectValue placeholder="All States" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      {getUniqueStates().map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="bg-white border-gray-300">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {getUniqueTypes().map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 bg-white"
                  >
                    Clear Filters
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Results Count */}
            <div className="text-sm text-gray-600">
              Showing {filteredFacilities.length} of {facilities.length} facilities
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading facilities...</p>
              </div>
            )}

            {/* Facilities Grid */}
            {!loading && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredFacilities.map((facility, index) => (
                  <StorepointFacilityCard key={index} facility={facility} />
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && filteredFacilities.length === 0 && (
              <div className="text-center py-12">
                <Building className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No facilities found</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-brand-navy">
                  <MapPin className="h-5 w-5 mr-2" />
                  Interactive Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full">
                  <div id="storepoint-container" data-map-id="1645a775a8a422" className="w-full min-h-[600px]"></div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Storepoint Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              var a=document.createElement("script");
              a.type="text/javascript";
              a.async=!0;
              a.src="https://cdn.storepoint.co/api/v1/js/1645a775a8a422.js";
              var b=document.getElementsByTagName("script")[0];
              b.parentNode.insertBefore(a,b);
            }())();
          `
        }}
      />
    </div>
  );
};

export default StorepointFacilities;
