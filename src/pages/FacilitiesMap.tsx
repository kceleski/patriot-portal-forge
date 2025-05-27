
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Filter, Search, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ApiService } from '@/services/apiService';
import { useApi } from '@/hooks/useApi';
import FeatureGate from '@/components/FeatureGate';

interface Facility {
  id: string;
  name: string;
  facility_type: string;
  city: string;
  state: string;
  address_line1: string;
  latitude: number;
  longitude: number;
  rating: number;
  price_range_min: number;
  price_range_max: number;
  accepts_va_benefits: boolean;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const FacilitiesMap = () => {
  const { hasFeatureAccess } = useAuth();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter states
  const [selectedCareTypes, setSelectedCareTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [vaToggle, setVaToggle] = useState(false);

  const { execute: searchFacilities, loading } = useApi(
    ApiService.searchFacilities,
    { showErrorToast: true }
  );

  const hasAdvancedFilters = hasFeatureAccess('advanced_filters');

  useEffect(() => {
    loadGoogleMaps();
    loadFacilities();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [facilities, searchTerm, selectedCareTypes, priceRange, vaToggle]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      updateMapMarkers();
    }
  }, [filteredFacilities]);

  const loadGoogleMaps = () => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&callback=initMap`;
    script.async = true;
    script.defer = true;

    // Set up callback
    window.initMap = initializeMap;

    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 39.8283, lng: -98.5795 }, // Center of US
      zoom: 4,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    mapInstanceRef.current = map;
  };

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

  const updateMapMarkers = () => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    filteredFacilities.forEach(facility => {
      if (facility.latitude && facility.longitude) {
        const marker = new window.google.maps.Marker({
          position: { lat: facility.latitude, lng: facility.longitude },
          map: mapInstanceRef.current,
          title: facility.name,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#DC2626"/>
                <circle cx="12" cy="9" r="2.5" fill="white"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(24, 24),
          }
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-semibold text-lg">${facility.name}</h3>
              <p class="text-sm text-gray-600">${facility.address_line1}</p>
              <p class="text-sm text-gray-600">${facility.city}, ${facility.state}</p>
              <p class="text-sm mt-2">$${facility.price_range_min} - $${facility.price_range_max}/month</p>
              <button class="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                View Details
              </button>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(mapInstanceRef.current, marker);
        });

        markersRef.current.push(marker);
      }
    });

    // Adjust map bounds to show all markers
    if (markersRef.current.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      markersRef.current.forEach(marker => {
        bounds.extend(marker.getPosition());
      });
      mapInstanceRef.current.fitBounds(bounds);
    }
  };

  const handleCareTypeChange = (careType: string, checked: boolean) => {
    if (checked) {
      setSelectedCareTypes([...selectedCareTypes, careType]);
    } else {
      setSelectedCareTypes(selectedCareTypes.filter(type => type !== careType));
    }
  };

  const handlePriceRangeChange = (value: number[]) => {
    if (value.length === 2) {
      setPriceRange([value[0], value[1]]);
    }
  };

  const clearFilters = () => {
    setSelectedCareTypes([]);
    setPriceRange([0, 10000]);
    setVaToggle(false);
    setSearchTerm('');
  };

  const careTypes = [
    'Assisted Living',
    'Memory Care',
    'Skilled Nursing',
    'Independent Living'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">Facilities Map</h1>
          <p className="text-gray-600 mt-2">
            Explore {filteredFacilities.length} care facilities on the map
          </p>
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
                  Map Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search facilities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Care Types */}
                <div>
                  <h4 className="font-semibold mb-3">Care Type</h4>
                  <div className="space-y-2">
                    {careTypes.map((careType) => (
                      <div key={careType} className="flex items-center space-x-2">
                        <Checkbox
                          id={careType}
                          checked={selectedCareTypes.includes(careType)}
                          onCheckedChange={(checked) => 
                            handleCareTypeChange(careType, checked as boolean)
                          }
                        />
                        <label htmlFor={careType} className="text-sm">
                          {careType}
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

                {/* Results Summary */}
                <div className="text-center p-3 bg-secondary-off-white rounded-lg">
                  <MapPin className="h-5 w-5 mx-auto mb-1 text-primary-red" />
                  <p className="text-sm font-medium">{filteredFacilities.length} facilities shown</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </FeatureGate>

        {/* Map */}
        <div className="flex-1">
          <Card className="h-[600px]">
            <div
              ref={mapRef}
              className="w-full h-full rounded-lg"
              style={{ minHeight: '600px' }}
            />
            {loading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-red mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading map...</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesMap;
