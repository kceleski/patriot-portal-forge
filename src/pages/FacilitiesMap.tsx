import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Filter, Search, MapPin } from 'lucide-react';
import { SerperService, SerperMapResult } from '@/services/serperService';
import { toast } from '@/hooks/use-toast';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const FacilitiesMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const storepointLoadedRef = useRef<boolean>(false);
  const [facilities, setFacilities] = useState<SerperMapResult[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<SerperMapResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Filter states
  const [selectedCareTypes, setSelectedCareTypes] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);

  useEffect(() => {
    loadGoogleMaps();
    loadStorepointMap();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [facilities, searchTerm, selectedCareTypes, ratingFilter]);

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

  const loadStorepointMap = () => {
    if (storepointLoadedRef.current) return;
    
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://cdn.storepoint.co/api/v1/js/1645a775a8a422.js';
    document.head.appendChild(script);
    storepointLoadedRef.current = true;
  };

  const handleSearch = async () => {
    if (!location.trim()) {
      toast({
        title: "Location Required",
        description: "Please enter a location to search for facilities.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const careTypeQuery = selectedCareTypes.length > 0 
        ? selectedCareTypes.join(' OR ') 
        : 'assisted living OR memory care OR skilled nursing';
      
      const query = `${careTypeQuery} facility ${location}`;
      console.log('Searching maps for:', query);
      
      const results = await SerperService.searchMaps(query);
      console.log('Map search results:', results);
      
      setFacilities(results);
      
      if (results.length === 0) {
        toast({
          title: "No Results",
          description: "No facilities found for your search criteria. Try adjusting your location.",
        });
      } else {
        toast({
          title: "Search Complete",
          description: `Found ${results.length} facilities`,
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Error",
        description: "There was an error searching for facilities. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = facilities.filter(facility => {
      // Search term filter
      if (searchTerm && !facility.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !facility.address.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Rating filter
      if (ratingFilter > 0 && (!facility.rating || facility.rating < ratingFilter)) {
        return false;
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

    if (filteredFacilities.length === 0) return;

    // Add new markers
    filteredFacilities.forEach(facility => {
      if (facility.latitude && facility.longitude) {
        const marker = new window.google.maps.Marker({
          position: { lat: facility.latitude, lng: facility.longitude },
          map: mapInstanceRef.current,
          title: facility.title,
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
              <h3 class="font-semibold text-lg">${facility.title}</h3>
              <p class="text-sm text-gray-600">${facility.address}</p>
              ${facility.phoneNumber ? `<p class="text-sm">${facility.phoneNumber}</p>` : ''}
              ${facility.rating ? `<p class="text-sm">Rating: ${facility.rating}/5 ${facility.reviews ? `(${facility.reviews} reviews)` : ''}</p>` : ''}
              ${facility.website ? `<a href="${facility.website}" target="_blank" class="text-sm text-blue-600 hover:underline">Visit Website</a>` : ''}
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

  const clearFilters = () => {
    setSelectedCareTypes([]);
    setRatingFilter(0);
    setSearchTerm('');
  };

  const careTypes = [
    'Assisted Living',
    'Memory Care',
    'Skilled Nursing',
    'Independent Living'
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">Facilities Map</h1>
          <p className="text-gray-600 mt-2">
            Explore {filteredFacilities.length} care facilities on the map
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Input
              placeholder="Enter city, state, or ZIP code..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              onClick={handleSearch} 
              disabled={loading}
              className="bg-brand-red hover:bg-brand-red/90"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search Area
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
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
                  placeholder="Filter facilities..."
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

              {/* Rating Filter */}
              <div>
                <h4 className="font-semibold mb-3">Minimum Rating</h4>
                <div className="space-y-2">
                  <Slider
                    value={[ratingFilter]}
                    onValueChange={(value) => setRatingFilter(value[0])}
                    max={5}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>0</span>
                    <span>{ratingFilter} stars</span>
                    <span>5</span>
                  </div>
                </div>
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

          {/* Facility Network Card - moved from AgentDashboard */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Facility Network</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Partner Facilities</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between">
                  <span>Preferred Partners</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between">
                  <span>Available Beds</span>
                  <span className="font-semibold text-green-600">156</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  View Directory
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Maps Container */}
        <div className="flex-1 space-y-6">
          {/* Google Maps */}
          <Card className="h-[400px]">
            <CardHeader>
              <CardTitle>Search Results Map</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div
                ref={mapRef}
                className="w-full h-[350px] rounded-lg"
              />
              {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-red mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading map...</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Storepoint Map */}
          <Card className="h-[400px]">
            <CardHeader>
              <CardTitle>Interactive Facility Map</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div 
                id="storepoint-container" 
                data-map-id="1645a775a8a422"
                className="w-full h-[350px] rounded-lg"
              ></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesMap;
