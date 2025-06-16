
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
import { ApiService } from '@/services/apiService';

interface Facility {
  id: string;
  name: string;
  address_line1: string;
  city: string;
  state: string;
  facility_type: string;
  rating: number;
  reviews_count: number;
  capacity: number;
  current_availability: number;
  price_range_min: number;
  price_range_max: number;
  phone: string;
  email: string;
  website: string;
  description: string;
  is_featured: boolean;
  subscription_tier: string;
}

interface SubscribedProvider {
  uuid: string;
  'Facility Name': string;
  'Description': string;
  'Street Address': string;
  'City': string;
  'State': string;
  'ZIP Code': number;
  'Phone': string;
  'Email': string;
  'Website': string;
  'Image URL 1'?: string;
  'Core Services (comma-separated)': string;
  'Lifestyle Amenities (comma-separated)': string;
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
      const data = await ApiService.getSubscribedProviders();
      setSubscribedProviders(data || []);
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
      const searchResults = await ApiService.searchFacilitiesDatabase(searchTerm, {
        care_type: careTypeFilter !== 'all' ? careTypeFilter : undefined,
        location: locationFilter !== 'all' ? locationFilter : undefined
      });

      setFacilities(searchResults || []);
    } catch (error) {
      console.error('Error performing search:', error);
      setFacilities([]);
    } finally {
      setLoading(false);
    }
  };

  const filterFacilities = () => {
    let filtered = facilities;

    if (searchTerm) {
      filtered = filtered.filter(facility => 
        facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facility.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facility.facility_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (careTypeFilter !== 'all') {
      filtered = filtered.filter(facility => facility.facility_type === careTypeFilter);
    }

    if (locationFilter !== 'all') {
      filtered = filtered.filter(facility => facility.city.includes(locationFilter));
    }

    setFilteredFacilities(filtered);
  };

  const getPartnershipStatus = (facility: Facility) => {
    if (facility.is_featured) return 'Preferred Partner';
    if (facility.subscription_tier === 'pinnacle' || facility.subscription_tier === 'elevate') return 'Partner';
    return 'Non-Partner';
  };

  const getPartnershipColor = (status: string) => {
    switch (status) {
      case 'Preferred Partner': return 'bg-green-100 text-green-800';
      case 'Partner': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
                <SelectItem value="Assisted Living">Assisted Living</SelectItem>
                <SelectItem value="Memory Care">Memory Care</SelectItem>
                <SelectItem value="Skilled Nursing">Skilled Nursing</SelectItem>
                <SelectItem value="Independent Living">Independent Living</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Phoenix">Phoenix</SelectItem>
                <SelectItem value="Scottsdale">Scottsdale</SelectItem>
                <SelectItem value="Tempe">Tempe</SelectItem>
                <SelectItem value="Glendale">Glendale</SelectItem>
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
                {provider['Image URL 1'] && (
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={provider['Image URL 1']}
                      alt={provider['Facility Name']}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{provider['Facility Name']}</CardTitle>
                    <Badge variant="default" className="bg-brand-gold text-white">Featured</Badge>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {provider.City}, {provider.State}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm line-clamp-3">{provider.Description}</p>

                  {provider['Core Services (comma-separated)'] && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Core Services</h4>
                      <div className="flex flex-wrap gap-1">
                        {parseServices(provider['Core Services (comma-separated)']).slice(0, 3).map((service, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">{service}</Badge>
                        ))}
                        {parseServices(provider['Core Services (comma-separated)']).length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{parseServices(provider['Core Services (comma-separated)']).length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 text-sm">
                    {provider.Phone && (
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {provider.Phone}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {provider.Website && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={provider.Website} target="_blank" rel="noopener noreferrer">
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
          {displayedFacilities.length > 0 ? (
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
                            {facility.city}, {facility.state}
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                            {facility.rating} ({facility.reviews_count} reviews)
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge variant="outline" className="text-brand-sky border-brand-sky">
                            {facility.facility_type}
                          </Badge>
                          <Badge className={getPartnershipColor(getPartnershipStatus(facility))}>
                            {getPartnershipStatus(facility)}
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
                          <span className="text-gray-600">Available:</span>
                          <span className="font-medium text-green-600">{facility.current_availability}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-600">Price Range:</span>
                          <span className="font-medium text-brand-red">
                            ${facility.price_range_min?.toLocaleString()} - ${facility.price_range_max?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {facility.phone}
                      </div>
                      {facility.website && (
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-1" />
                          Website
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
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
          ) : (
            <div className="text-center py-12">
              <Building className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No facilities found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
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
                  {displayedFacilities.filter(f => getPartnershipStatus(f) === 'Preferred Partner').length}
                </div>
                <div className="text-sm text-gray-600">Preferred Partners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary mb-1">
                  {displayedFacilities.filter(f => getPartnershipStatus(f) === 'Partner').length}
                </div>
                <div className="text-sm text-gray-600">Standard Partners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary mb-1">
                  {displayedFacilities.reduce((sum, f) => sum + (f.current_availability || 0), 0)}
                </div>
                <div className="text-sm text-gray-600">Available Beds</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary mb-1">
                  {displayedFacilities.length}
                </div>
                <div className="text-sm text-gray-600">Total Facilities</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FacilitiesDirectory;
