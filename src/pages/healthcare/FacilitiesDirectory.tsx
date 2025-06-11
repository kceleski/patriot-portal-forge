import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Phone, 
  Globe, 
  Heart, 
  Building 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Facility {
  id: string;
  name: string;
  location: string;
  type: string;
  rating: number;
  reviews: number;
  partnershipStatus: 'Preferred Partner' | 'Partner' | 'Non-Partner';
  admissions: 'High' | 'Medium' | 'Low';
  capacity: number;
  occupied: number;
  priceRange: string;
  waitingList: number;
  lastUpdate: string;
  description: string;
  amenities: string[];
  contact: string;
}

interface SubscribedProvider {
  uuid: string;
  facilityName: string;
  description: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: number;
  phone: string;
  email: string;
  website: string;
  imageUrl1?: string;
  coreServices: string;
  lifestyleAmenities: string;
}

const FacilitiesDirectory = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [subscribedProviders, setSubscribedProviders] = useState<SubscribedProvider[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [careTypeFilter, setCareTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    fetchSubscribedProviders();
  }, []);

  useEffect(() => {
    if (hasSearched) {
      filterFacilities();
    }
  }, [facilities, searchTerm, careTypeFilter, locationFilter, hasSearched]);

  const fetchSubscribedProviders = async () => {
    try {
      const { data, error } = await supabase
        .from('subscribed')
        .select('*');

      if (error) throw error;

      const formattedData = data.map(item => ({
        uuid: item.uuid,
        facilityName: item['Facility Name'] || '',
        description: item['Description'] || '',
        streetAddress: item['Street Address'] || '',
        city: item['City'] || '',
        state: item['State'] || '',
        zipCode: item['ZIP Code'] || 0,
        phone: item['Phone'] || '',
        email: item['Email'] || '',
        website: item['Website'] || '',
        imageUrl1: item['Image URL 1'],
        coreServices: item['Core Services (comma-separated)'] || '',
        lifestyleAmenities: item['Lifestyle Amenities (comma-separated)'] || ''
      }));

      setSubscribedProviders(formattedData);
    } catch (error) {
      console.error('Error fetching subscribed providers:', error);
    } finally {
      setLoading(false);
    }
  };

  const performSearch = async () => {
    setLoading(true);
    setHasSearched(true);
    
    try {
      // Search across multiple provider tables
      const searchResults: Facility[] = [];
      
      // Search Combined Data table
      const { data: combinedData, error: combinedError } = await supabase
        .from('Combined Data')
        .select('*')
        .ilike('name', `%${searchTerm}%`);

      if (!combinedError && combinedData) {
        const combinedFacilities = combinedData.map(item => ({
          id: item.uuid || Math.random().toString(),
          name: item.name || 'Unknown Facility',
          location: `${item.city || ''}, ${item.state || ''}`,
          type: item.type || 'assisted-living',
          rating: 4.0,
          reviews: 50,
          partnershipStatus: 'Non-Partner' as const,
          admissions: 'Medium' as const,
          capacity: parseInt(item.capacity) || 100,
          occupied: Math.floor((parseInt(item.capacity) || 100) * 0.8),
          priceRange: item.min_range && item.max_range ? `$${item.min_range}-$${item.max_range}` : '$3,000-$5,000',
          waitingList: Math.floor(Math.random() * 20),
          lastUpdate: '1 week ago',
          description: `Healthcare facility providing quality care services in ${item.city || 'your area'}.`,
          amenities: item.care_services ? item.care_services.split(',').slice(0, 4) : ['Care Services'],
          contact: item.phone || '(555) 000-0000'
        }));
        searchResults.push(...combinedFacilities);
      }

      // Search Facility table
      const { data: facilityData, error: facilityError } = await supabase
        .from('facility')
        .select('*')
        .ilike('name', `%${searchTerm}%`);

      if (!facilityError && facilityData) {
        const facilities = facilityData.map(item => ({
          id: item.id,
          name: item.name,
          location: `${item.city || ''}, ${item.state || ''}`,
          type: item.facility_type || 'assisted-living',
          rating: item.rating || 4.0,
          reviews: item.reviews_count || 25,
          partnershipStatus: item.subscription_status === 'active' ? 'Partner' as const : 'Non-Partner' as const,
          admissions: 'Medium' as const,
          capacity: item.capacity || 100,
          occupied: (item.capacity || 100) - (item.current_availability || 20),
          priceRange: item.price_range_min && item.price_range_max ? 
            `$${item.price_range_min}-$${item.price_range_max}` : '$3,500-$6,000',
          waitingList: Math.floor(Math.random() * 15),
          lastUpdate: '3 days ago',
          description: item.description || `Quality care facility in ${item.city || 'your area'}.`,
          amenities: ['24/7 Care', 'Medical Services', 'Activities', 'Dining'],
          contact: item.phone || '(555) 000-0000'
        }));
        searchResults.push(...facilities);
      }

      // Search Storepoint table
      const { data: storepointData, error: storepointError } = await supabase
        .from('Storepoint')
        .select('*')
        .ilike('name', `%${searchTerm}%`);

      if (!storepointError && storepointData) {
        const storepointFacilities = storepointData.map(item => ({
          id: Math.random().toString(),
          name: item.name || 'Care Facility',
          location: `${item.city || ''}, ${item.state || ''}`,
          type: item.type || 'assisted-living',
          rating: 4.2,
          reviews: 75,
          partnershipStatus: 'Non-Partner' as const,
          admissions: 'Medium' as const,
          capacity: parseInt(item.capacity) || 80,
          occupied: Math.floor((parseInt(item.capacity) || 80) * 0.75),
          priceRange: '$3,200-$5,800',
          waitingList: Math.floor(Math.random() * 10),
          lastUpdate: '5 days ago',
          description: `Professional care facility providing comprehensive services.`,
          amenities: ['Professional Care', 'Activities', 'Support Services'],
          contact: item.phone || '(555) 000-0000'
        }));
        searchResults.push(...storepointFacilities);
      }

      setFacilities(searchResults);
    } catch (error) {
      console.error('Error performing search:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterFacilities = () => {
    let filtered = facilities.filter(facility => {
      const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           facility.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCareType = careTypeFilter === 'all' || facility.type === careTypeFilter;
      const matchesLocation = locationFilter === 'all' || facility.location.includes(locationFilter);
      
      return matchesSearch && matchesCareType && matchesLocation;
    });

    setFilteredFacilities(filtered);
  };

  const getPartnershipColor = (status: string) => {
    switch (status) {
      case 'Preferred Partner': return 'bg-green-100 text-green-800';
      case 'Partner': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAdmissionColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (facilityId: string) => {
    console.log('View details for facility:', facilityId);
  };

  const parseServices = (services: string) => {
    return services ? services.split(',').map(s => s.trim()).filter(Boolean) : [];
  };

  const displayedFacilities = hasSearched ? filteredFacilities : [];
  const showSubscribedProviders = !hasSearched && subscribedProviders.length > 0;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-primary font-heading">Facilities Directory</h1>
          <p className="text-gray-600 mt-2">Search and discover care facilities in your area.</p>
        </div>
        <Button className="bg-brand-red hover:bg-red-600">
          Request Partnership
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center font-heading">
            <Filter className="h-5 w-5 mr-2" />
            Search & Filter Facilities
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
                className="pl-10"
              />
            </div>
            <Select value={careTypeFilter} onValueChange={setCareTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Care type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Care Types</SelectItem>
                <SelectItem value="assisted-living">Assisted Living</SelectItem>
                <SelectItem value="memory-care">Memory Care</SelectItem>
                <SelectItem value="skilled-nursing">Skilled Nursing</SelectItem>
                <SelectItem value="independent-living">Independent Living</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Beverly Hills">Beverly Hills</SelectItem>
                <SelectItem value="Santa Monica">Santa Monica</SelectItem>
                <SelectItem value="Pasadena">Pasadena</SelectItem>
                <SelectItem value="Long Beach">Long Beach</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={performSearch} className="bg-brand-sky hover:bg-blue-600">
              Search Facilities
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading facilities...</p>
        </div>
      )}

      {/* Featured Facilities (shown before search) */}
      {showSubscribedProviders && (
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Featured Facilities</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {subscribedProviders.map((provider) => (
              <Card key={provider.uuid} className="hover:shadow-lg transition-shadow">
                {provider.imageUrl1 && (
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={provider.imageUrl1}
                      alt={provider.facilityName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{provider.facilityName}</CardTitle>
                    <Badge variant="default" className="bg-brand-gold text-white">Featured</Badge>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {provider.city}, {provider.state}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm line-clamp-3">{provider.description}</p>

                  {provider.coreServices && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Core Services</h4>
                      <div className="flex flex-wrap gap-1">
                        {parseServices(provider.coreServices).slice(0, 3).map((service, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">{service}</Badge>
                        ))}
                        {parseServices(provider.coreServices).length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{parseServices(provider.coreServices).length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 text-sm">
                    {provider.phone && (
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {provider.phone}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {provider.website && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={provider.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-1" />
                          Website
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {hasSearched && (
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Search Results ({displayedFacilities.length} facilities found)
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {displayedFacilities.map((facility) => (
              <Card key={facility.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-text-primary mb-2 font-heading">{facility.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {facility.location}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                          {facility.rating} ({facility.reviews} reviews)
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge variant="outline" className="text-brand-sky border-brand-sky">
                          {facility.type}
                        </Badge>
                        <Badge className={getPartnershipColor(facility.partnershipStatus)}>
                          {facility.partnershipStatus}
                        </Badge>
                        <Badge className={getAdmissionColor(facility.admissions)}>
                          {facility.admissions} Admissions
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 text-sm">{facility.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600">Capacity:</span>
                        <span className="font-medium">{facility.capacity}</span>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600">Occupied:</span>
                        <span className="font-medium">{facility.occupied}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Available:</span>
                        <span className="font-medium text-green-600">{facility.capacity - facility.occupied}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600">Price Range:</span>
                        <span className="font-medium text-brand-red">{facility.priceRange}</span>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600">Waiting List:</span>
                        <span className="font-medium">{facility.waitingList} people</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Last Update:</span>
                        <span className="font-medium">{facility.lastUpdate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-text-primary mb-2 text-sm">Key Amenities</h4>
                    <div className="flex flex-wrap gap-1">
                      {facility.amenities.slice(0, 4).map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {facility.amenities.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{facility.amenities.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {facility.contact}
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-1" />
                      Website
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewDetails(facility.id)}
                    >
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1 bg-brand-sky hover:bg-blue-600">
                      Contact Facility
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {hasSearched && displayedFacilities.length === 0 && !loading && (
        <div className="text-center py-12">
          <Building className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No facilities found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}

      {/* Partnership Summary - only show after search */}
      {hasSearched && displayedFacilities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center font-heading">
              <Building className="h-5 w-5 mr-2" />
              Search Results Summary
            </CardTitle>
            <CardDescription>Overview of search results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary mb-1">
                  {displayedFacilities.filter(f => f.partnershipStatus === 'Preferred Partner').length}
                </div>
                <div className="text-sm text-gray-600">Preferred Partners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary mb-1">
                  {displayedFacilities.filter(f => f.partnershipStatus === 'Partner').length}
                </div>
                <div className="text-sm text-gray-600">Standard Partners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary mb-1">
                  {displayedFacilities.reduce((sum, f) => sum + (f.capacity - f.occupied), 0)}
                </div>
                <div className="text-sm text-gray-600">Available Beds</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary mb-1">
                  {displayedFacilities.reduce((sum, f) => sum + f.waitingList, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Waiting List</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FacilitiesDirectory;
