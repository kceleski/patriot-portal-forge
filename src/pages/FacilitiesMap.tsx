import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Filter, MessageSquare, MapPin, Navigation } from 'lucide-react';
import { SerperService, SerperMapResult } from '@/services/serperService';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import SearchResultsManager from '@/components/search/SearchResultsManager';
import ElevenLabsWidget from '@/components/ElevenLabsWidget';

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
  const infoWindowRef = useRef<any>(null);
  const [facilities, setFacilities] = useState<SerperMapResult[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<SerperMapResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCareTypes, setSelectedCareTypes] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [showAssistant, setShowAssistant] = useState(false);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadGoogleMaps();
    getUserLocation();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [facilities, searchTerm, selectedCareTypes, ratingFilter]);

  useEffect(() => {
    if (mapInstanceRef.current && filteredFacilities.length > 0) {
      updateMapMarkers();
    }
  }, [filteredFacilities]);

  const loadGoogleMaps = () => {
    if (window.google && window.google.maps) {
      setGoogleMapsLoaded(true);
      initializeMap();
      return;
    }

    // Remove any existing script tags
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDql71j0ytZxXhSvKseW8RNiNjPupZQuWo&loading=async`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setGoogleMapsLoaded(true);
      initializeMap();
    };

    script.onerror = () => {
      console.error('Failed to load Google Maps');
      toast({
        title: "Maps Error",
        description: "Failed to load Google Maps. Please refresh the page.",
        variant: "destructive",
      });
    };

    document.head.appendChild(script);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(pos);
          
          // Center map on user location if map is already initialized
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setCenter(pos);
            mapInstanceRef.current.setZoom(10);
            
            // Show user location info
            if (infoWindowRef.current) {
              infoWindowRef.current.setPosition(pos);
              infoWindowRef.current.setContent("Your current location");
              infoWindowRef.current.open(mapInstanceRef.current);
            }
          }
          
          toast({
            title: "Location Found",
            description: "Map centered on your current location",
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast({
            title: "Location Error",
            description: "Unable to get your location. Using default location.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive",
      });
    }
  };

  const initializeMap = () => {
    if (!mapRef.current || !window.google || !window.google.maps) return;

    const initialCenter = userLocation || { lat: 39.8283, lng: -98.5795 };
    const initialZoom = userLocation ? 10 : 4;

    const map = new window.google.maps.Map(mapRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    const infoWindow = new window.google.maps.InfoWindow();
    
    // Add location button
    const locationButton = document.createElement('button');
    locationButton.textContent = '📍 My Location';
    locationButton.className = 'bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-50';
    locationButton.style.margin = '10px';
    
    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    
    locationButton.addEventListener('click', getUserLocation);

    mapInstanceRef.current = map;
    infoWindowRef.current = infoWindow;

    // If user location is available, center on it
    if (userLocation) {
      map.setCenter(userLocation);
      map.setZoom(10);
    }
  };

  const handleVoiceSearch = async (query: string, location: string) => {
    setLoading(true);
    try {
      const careTypeQuery = selectedCareTypes.length > 0 
        ? selectedCareTypes.join(' OR ') 
        : 'assisted living OR memory care OR skilled nursing';
      
      // Use user location if available and no specific location provided
      let searchLocation = location;
      if (!location && userLocation) {
        // Convert coordinates to a searchable location string
        searchLocation = `${userLocation.lat},${userLocation.lng}`;
      }
      
      const searchQuery = `${careTypeQuery} facility ${searchLocation}`;
      console.log('Voice search for:', searchQuery);
      
      const results = await SerperService.searchMaps(searchQuery, user?.id);
      console.log('Voice search results:', results);
      
      setFacilities(results);
      
      if (results.length === 0) {
        toast({
          title: "No Results",
          description: "No facilities found for your search criteria. Try a different location.",
        });
      } else {
        toast({
          title: "Search Complete",
          description: `Found ${results.length} facilities via voice search`,
        });
      }
    } catch (error) {
      console.error('Voice search error:', error);
      toast({
        title: "Search Error",
        description: "There was an error processing your voice search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = facilities.filter(facility => {
      if (searchTerm && !facility.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !facility.address.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

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
    <div className="space-y-6 p-4 sm:p-6 bg-brand-off-white min-h-screen">
      <SearchResultsManager
        searchQuery={`${selectedCareTypes.join(', ')} facilities (voice search)`}
        results={facilities}
        userId={user?.id}
        onSaveComplete={(count) => console.log(`Saved ${count} search results`)}
      />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-navy">Facilities Map</h1>
          <p className="text-gray-600 mt-2">
            Use voice search to explore {filteredFacilities.length} care facilities on the map
            {userLocation && " (centered on your location)"}
          </p>
        </div>
      </div>

      {/* Voice Search Assistant */}
      <Card className="bg-white border-gray-200">
        <CardContent className="p-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <MessageSquare className="h-6 w-6 text-brand-red" />
              <h3 className="text-lg font-semibold text-brand-navy">Voice Search Assistant</h3>
            </div>
            <p className="text-gray-600">
              Use our AI assistant to search for facilities. Try saying: "Show me memory care facilities near me" or "Find assisted living in my area"
              {userLocation && " (Your location has been detected automatically)"}
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                onClick={() => setShowAssistant(true)}
                className="bg-brand-red hover:bg-brand-red/90 text-white"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Start Voice Search
              </Button>
              {!userLocation && (
                <Button 
                  onClick={getUserLocation}
                  variant="outline"
                  className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Get My Location
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-80 space-y-4">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center text-lg text-brand-navy">
                <Filter className="h-5 w-5 mr-2" />
                Map Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Input
                  placeholder="Filter current results..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white border-gray-300"
                />
              </div>

              {/* Care Types */}
              <div>
                <h4 className="font-semibold mb-3 text-brand-navy">Care Type</h4>
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
                      <label htmlFor={careType} className="text-sm text-gray-700">
                        {careType}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h4 className="font-semibold mb-3 text-brand-navy">Minimum Rating</h4>
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

              <Button 
                variant="outline" 
                onClick={clearFilters} 
                className="w-full border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
              >
                Clear Filters
              </Button>

              {/* Results Summary */}
              <div className="text-center p-3 bg-brand-off-white rounded-lg border">
                <MapPin className="h-5 w-5 mx-auto mb-1 text-brand-red" />
                <p className="text-sm font-medium text-brand-navy">{filteredFacilities.length} facilities shown</p>
                {userLocation && (
                  <p className="text-xs text-gray-600 mt-1">Location detected</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Maps Container */}
        <div className="flex-1 space-y-6">
          {/* Google Maps */}
          <Card className="h-[500px] bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-brand-navy">Search Results Map</CardTitle>
            </CardHeader>
            <CardContent className="p-0 relative">
              <div
                ref={mapRef}
                className="w-full h-[420px] rounded-lg"
              />
              {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red mx-auto"></div>
                    <p className="mt-4 text-gray-600">Processing voice search...</p>
                  </div>
                </div>
              )}
              {!googleMapsLoaded && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading Google Maps...</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Voice Assistant */}
      {showAssistant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-brand-navy">Voice Search Assistant</h3>
              <Button variant="ghost" onClick={() => setShowAssistant(false)}>×</Button>
            </div>
            <ElevenLabsWidget 
              variant="fullscreen"
              onSearch={handleVoiceSearch}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FacilitiesMap;
