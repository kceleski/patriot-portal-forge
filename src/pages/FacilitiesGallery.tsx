import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Building, MapPin, Star, Grid2X2, List, Filter, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ApiService } from '@/services/apiService';
import { useApi } from '@/hooks/useApi';
import FeatureGate from '@/components/FeatureGate';
import { toast } from '@/hooks/use-toast';

interface Facility {
  id: string;
  name: string;
  facility_type: string;
  city: string;
  state: string;
  rating: number;
  price_range_min: number;
  price_range_max: number;
  is_featured: boolean;
  accepts_va_benefits: boolean;
  facility_images: Array<{ url: string; is_primary: boolean }>;
}

interface CareType {
  id: string;
  care_type_id: string;
  description: string;
}

interface Amenity {
  id: string;
  name: string;
  category: string;
}

const FacilitiesGallery = () => {
  const { hasFeatureAccess } = useAuth();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>([]);
  const [careTypes, setCareTypes] = useState<CareType[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter states
  const [selectedCareTypes, setSelectedCareTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [vaToggle, setVaToggle] = useState(false);

  const { execute: searchFacilities, loading } = useApi(
    ApiService.searchFacilities,
    { showErrorToast: true }
  );

  const hasAdvancedFilters = hasFeatureAccess('advanced_filters');

  useEffect(() => {
    loadFacilities();
    if (hasAdvancedFilters) {
      loadFilterData();
    }
  }, [hasAdvancedFilters]);

  useEffect(() => {
    applyFilters();
  }, [facilities, searchTerm, selectedCareTypes, selectedAmenities, priceRange, vaToggle]);

  const loadFacilities = async () => {
    try {
      const data = await searchFacilities({});
      if (data?.facilities) {
        setFacilities(data.facilities);
      }
    } catch (error) {
      console.error('Error loading facilities:', error);
    }
  };

  const loadFilterData = async () => {
    // Load care types and amenities for filters
    // This would typically come from your API
    setCareTypes([
      { id: '1', care_type_id: 'assisted-living', description: 'Assisted Living' },
      { id: '2', care_type_id: 'memory-care', description: 'Memory Care' },
      { id: '3', care_type_id: 'skilled-nursing', description: 'Skilled Nursing' },
    ]);
    
    setAmenities([
      { id: '1', name: 'Pool', category: 'recreation' },
      { id: '2', name: 'Fitness Center', category: 'wellness' },
      { id: '3', name: '24/7 Nursing', category: 'medical' },
    ]);
  };

  const applyFilters = () => {
    let filtered = facilities.filter(facility => {
      // Search term filter
      if (searchTerm && !facility.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !facility.city.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !facility.state.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      if (hasAdvancedFilters) {
        // Care type filter
        if (selectedCareTypes.length > 0 && 
            !selectedCareTypes.includes(facility.facility_type)) {
          return false;
        }

        // Price range filter
        if (facility.price_range_min < priceRange[0] || 
            facility.price_range_max > priceRange[1]) {
          return false;
        }

        // VA benefits filter
        if (vaToggle && !facility.accepts_va_benefits) {
          return false;
        }
      }

      return true;
    });

    setFilteredFacilities(filtered);
  };

  const getPrimaryImage = (facility: Facility) => {
    const primaryImage = facility.facility_images?.find(img => img.is_primary);
    return primaryImage?.url || '/placeholder.svg';
  };

  const handleCareTypeChange = (careTypeId: string, checked: boolean) => {
    if (checked) {
      setSelectedCareTypes([...selectedCareTypes, careTypeId]);
    } else {
      setSelectedCareTypes(selectedCareTypes.filter(id => id !== careTypeId));
    }
  };

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenityId]);
    } else {
      setSelectedAmenities(selectedAmenities.filter(id => id !== amenityId));
    }
  };

  const handlePriceRangeChange = (value: number[]) => {
    if (value.length === 2) {
      setPriceRange([value[0], value[1]]);
    }
  };

  const clearFilters = () => {
    setSelectedCareTypes([]);
    setSelectedAmenities([]);
    setPriceRange([0, 10000]);
    setVaToggle(false);
    setSearchTerm('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">Facilities Directory</h1>
          <p className="text-gray-600 mt-2">
            Explore {filteredFacilities.length} care facilities
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <FeatureGate 
          feature="advanced_filters"
          fallback={
            <div className="w-80">
              <Card className="p-4 text-center">
                <Filter className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Advanced filters available with premium plans</p>
              </Card>
            </div>
          }
        >
          <div className="w-80 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Care Types */}
                <div>
                  <h4 className="font-semibold mb-3">Care Type</h4>
                  <div className="space-y-2">
                    {careTypes.map((careType) => (
                      <div key={careType.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={careType.id}
                          checked={selectedCareTypes.includes(careType.care_type_id)}
                          onCheckedChange={(checked) => 
                            handleCareTypeChange(careType.care_type_id, checked as boolean)
                          }
                        />
                        <label htmlFor={careType.id} className="text-sm">
                          {careType.description}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-semibold mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <Slider
                      value={priceRange}
                      onValueChange={handlePriceRangeChange}
                      max={10000}
                      step={100}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="font-semibold mb-3">Amenities</h4>
                  <div className="space-y-2">
                    {amenities.map((amenity) => (
                      <div key={amenity.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity.id}
                          checked={selectedAmenities.includes(amenity.id)}
                          onCheckedChange={(checked) => 
                            handleAmenityChange(amenity.id, checked as boolean)
                          }
                        />
                        <label htmlFor={amenity.id} className="text-sm">
                          {amenity.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* VA Benefits */}
                <div className="flex items-center justify-between">
                  <label htmlFor="va-toggle" className="text-sm font-medium">
                    Accepts VA Benefits
                  </label>
                  <Switch
                    id="va-toggle"
                    checked={vaToggle}
                    onCheckedChange={setVaToggle}
                  />
                </div>

                <Button variant="outline" onClick={clearFilters} className="w-full">
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>
        </FeatureGate>

        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search facilities by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-red mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading facilities...</p>
            </div>
          )}

          {/* Facilities Grid/List */}
          {!loading && (
            <div className={viewMode === 'grid' ? 
              'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 
              'space-y-4'
            }>
              {filteredFacilities.map((facility) => (
                <Card 
                  key={facility.id} 
                  className={`bg-secondary-off-white hover:shadow-lg transition-shadow ${
                    facility.is_featured ? 'border-2 border-accent-gold' : ''
                  }`}
                >
                  {facility.is_featured && (
                    <div className="bg-accent-gold text-text-dark-gray text-xs font-bold px-2 py-1 rounded-t-lg text-center">
                      Featured Facility
                    </div>
                  )}
                  <div className={viewMode === 'list' ? 'flex' : ''}>
                    <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}>
                      <img
                        src={getPrimaryImage(facility)}
                        alt={facility.name}
                        className={`w-full h-48 object-cover ${
                          viewMode === 'list' ? 'rounded-l-lg' : 'rounded-t-lg'
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{facility.name}</CardTitle>
                            <CardDescription className="flex items-center text-sm">
                              <MapPin className="h-4 w-4 mr-1" />
                              {facility.city}, {facility.state}
                            </CardDescription>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-sm font-medium">{facility.rating}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Badge variant="outline" className="text-primary-sky border-primary-sky">
                            {facility.facility_type}
                          </Badge>
                          {facility.accepts_va_benefits && (
                            <Badge variant="secondary">VA Benefits Accepted</Badge>
                          )}
                          <div className="text-sm text-gray-600">
                            ${facility.price_range_min} - ${facility.price_range_max}/month
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button className="w-full bg-primary-sky hover:bg-blue-600">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && filteredFacilities.length === 0 && (
            <div className="text-center py-8">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No facilities found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilitiesGallery;
