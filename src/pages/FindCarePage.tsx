import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Star, MapPin, Phone, Calendar, Heart, List, Map, Home, Shield, Utensils, Wifi, Car, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// --- INTERFACES (Centralized for this page) ---

interface Facility {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  rating: number | null;
  reviewCount: number | null;
  image: string;
  priceRange: {
    min: number | null;
    max: number | null;
  };
  services: string[];
  amenities: string[];
  accommodations: string[];
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface FilterState {
  services: string[];
  amenities: string[];
  accommodations: string[];
  priceRange: {
    min: number;
    max: number;
  };
}


// --- MOCK DATA (Replace with API call in a useEffect) ---
const MOCK_FACILITIES: Facility[] = [
    {
        "id": "1",
        "name": "Inspirations of Tempe",
        "address": "1875 East Guadalupe Road",
        "city": "Tempe",
        "state": "AZ",
        "zip": "85283",
        "phone": "(480) 777-8466",
        "rating": 4.5,
        "reviewCount": 59,
        "image": "photo-1559757148-5c350d0d3c56",
        "priceRange": { "min": 3200, "max": 5800 },
        "services": ["Assisted Living", "Memory Care"],
        "amenities": ["Pet-Friendly", "Restaurant/Dining", "On-site Therapy", "WiFi", "Transportation"],
        "accommodations": ["Studio Apartment", "One Bedroom", "Two Bedroom"],
        "description": "Pet-friendly assisted living community offering personalized care, robust enrichment programs, and a variety of apartment styles in a home-like setting.",
        "coordinates": { "lat": 33.3644, "lng": -111.9047 }
    },
    {
        "id": "2",
        "name": "Sunrise of Scottsdale",
        "address": "10101 N Scottsdale Rd",
        "city": "Scottsdale",
        "state": "AZ",
        "zip": "85253",
        "phone": "(480) 991-2020",
        "rating": 4.8,
        "reviewCount": 112,
        "image": "photo-1608686207856-001b95cf60ca",
        "priceRange": { "min": 4500, "max": 7200 },
        "services": ["Assisted Living", "Memory Care", "Respite Care"],
        "amenities": ["Fitness Center", "Garden/Outdoor Space", "Beauty Salon", "Library"],
        "accommodations": ["Studio Apartment", "One Bedroom", "Shared Suite"],
        "description": "A vibrant senior living community located in the heart of Scottsdale, providing tailored care plans, engaging activities, and delicious dining experiences.",
        "coordinates": { "lat": 33.5794, "lng": -111.9261 }
    }
];


// --- CHILD COMPONENTS ---

const FacilityCard: React.FC<{ facility: Facility }> = ({ facility }) => {
  const navigate = useNavigate();
  const handleViewDetails = () => navigate(`/facility/${facility.id}`);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col md:flex-row">
            <div className="md:w-80 h-64 md:h-auto relative flex-shrink-0">
                <img src={facility.image ? `https://images.unsplash.com/${facility.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80` : 'https://via.placeholder.com/800'} alt={facility.name} className="w-full h-full object-cover" />
                <Button variant="ghost" size="sm" className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-700"><Heart className="h-4 w-4" /></Button>
            </div>
            <CardContent className="flex-1 p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">{facility.name}</h3>
                            <div className="flex items-center text-gray-600 text-sm mb-2"><MapPin className="h-4 w-4 mr-1" /><span>{facility.address}, {facility.city}, {facility.state}</span></div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                {facility.rating && <div className="flex items-center"><Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" /><span className="font-medium">{facility.rating}</span>{facility.reviewCount && <span className="ml-1">({facility.reviewCount} reviews)</span>}</div>}
                                <div className="flex items-center"><Phone className="h-4 w-4 mr-1" /><span>{facility.phone}</span></div>
                            </div>
                        </div>
                        <div className="text-right">{facility.priceRange.min ? <><div className="text-2xl font-bold text-blue-600">${facility.priceRange.min.toLocaleString()}</div><div className="text-sm text-gray-600">per month</div></> : <><div className="text-lg font-semibold text-blue-600">Contact for</div><div className="text-sm text-gray-600">pricing</div></>}</div>
                    </div>
                    <p className="text-gray-700 mb-4 line-clamp-2">{facility.description}</p>
                    <div className="flex flex-wrap gap-2"><h4 className="text-sm font-medium text-gray-900 w-full">Services</h4>{facility.services.slice(0, 3).map((service) => (<Badge key={service} variant="secondary" className="text-xs">{service}</Badge>))}{facility.services.length > 3 && (<Badge variant="outline" className="text-xs">+{facility.services.length - 3} more</Badge>)}</div>
                </div>
                <div className="flex space-x-3 mt-6">
                    <Button onClick={handleViewDetails} className="flex-1">View Details</Button>
                    <Button variant="outline" className="flex items-center space-x-2"><Phone className="h-4 w-4" /><span>Call</span></Button>
                    <Button variant="outline" className="flex items-center space-x-2"><Calendar className="h-4 w-4" /><span>Tour</span></Button>
                </div>
            </CardContent>
        </div>
    </Card>
  );
};

const FilterSidebar: React.FC<{ onFilterChange: (filters: FilterState) => void }> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({ services: [], amenities: [], accommodations: [], priceRange: { min: 0, max: 8000 }});
  const services = ['Memory Care', 'Assisted Living', 'Independent Living', 'Skilled Nursing', 'Respite Care', 'Adult Day Care', 'Hospice Care'];
  const amenities = ['Fitness Center', 'Swimming Pool', 'Garden/Outdoor Space', 'Transportation', 'Beauty Salon', 'Library', 'Chapel/Spiritual Care', 'Pet-Friendly', 'WiFi', 'Restaurant/Dining', 'Physical Therapy', 'Medication Management'];
  const accommodations = ['Private Room', 'Semi-Private Room', 'Studio Apartment', 'One Bedroom', 'Two Bedroom', 'Private Bathroom', 'Shared Bathroom', 'Kitchenette', 'Balcony/Patio'];

  const handleCheckboxChange = (category: keyof Pick<FilterState, 'services' | 'amenities' | 'accommodations'>, value: string, checked: boolean) => {
    const newValues = checked ? [...filters[category], value] : filters[category].filter(v => v !== value);
    const newFilters = { ...filters, [category]: newValues };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (values: number[]) => {
    const newFilters = { ...filters, priceRange: { min: values[0], max: values[1] } };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = { services: [], amenities: [], accommodations: [], priceRange: { min: 0, max: 8000 }};
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <Card className="sticky top-6">
        <CardHeader className="pb-4"><div className="flex items-center justify-between"><CardTitle className="text-lg">Filters</CardTitle><Button variant="ghost" size="sm" onClick={clearAllFilters}>Clear All</Button></div></CardHeader>
        <CardContent className="space-y-6">
            <div><h3 className="font-medium mb-4">Monthly Cost</h3><div className="px-2"><Slider value={[filters.priceRange.min, filters.priceRange.max]} onValueChange={handlePriceRangeChange} max={8000} min={0} step={100} className="w-full" /><div className="flex justify-between text-sm text-gray-600 mt-2"><span>${filters.priceRange.min.toLocaleString()}</span><span>${filters.priceRange.max.toLocaleString()}</span></div></div></div>
            <Separator />
            <div><h3 className="font-medium mb-4">Care Services</h3><div className="space-y-3 max-h-60 overflow-y-auto">{services.map((service) => (<div key={service} className="flex items-center space-x-2"><Checkbox id={service} checked={filters.services.includes(service)} onCheckedChange={(checked) => handleCheckboxChange('services', service, checked as boolean)} /><label htmlFor={service} className="text-sm text-gray-700 cursor-pointer">{service}</label></div>))}</div></div>
            <Separator />
            <div><h3 className="font-medium mb-4">Accommodations</h3><div className="space-y-3 max-h-60 overflow-y-auto">{accommodations.map((item) => (<div key={item} className="flex items-center space-x-2"><Checkbox id={item} checked={filters.accommodations.includes(item)} onCheckedChange={(checked) => handleCheckboxChange('accommodations', item, checked as boolean)} /><label htmlFor={item} className="text-sm text-gray-700 cursor-pointer">{item}</label></div>))}</div></div>
            <Separator />
            <div><h3 className="font-medium mb-4">Amenities</h3><div className="space-y-3 max-h-60 overflow-y-auto">{amenities.map((item) => (<div key={item} className="flex items-center space-x-2"><Checkbox id={item} checked={filters.amenities.includes(item)} onCheckedChange={(checked) => handleCheckboxChange('amenities', item, checked as boolean)} /><label htmlFor={item} className="text-sm text-gray-700 cursor-pointer">{item}</label></div>))}</div></div>
        </CardContent>
    </Card>
  );
};

const MapView: React.FC<{ facilities: Facility[], userLocation: {lat: number, lng: number} | null }> = ({ facilities, userLocation }) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const MAPBOX_TOKEN = 'YOUR_MAPBOX_TOKEN_HERE'; // IMPORTANT: Add your token here

    useEffect(() => {
        if (!mapContainer.current || !userLocation || MAPBOX_TOKEN === 'YOUR_MAPBOX_TOKEN_HERE') return;

        mapboxgl.accessToken = MAPBOX_TOKEN;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [userLocation.lng, userLocation.lat],
            zoom: 10,
        });
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        
        // Add user marker
        new mapboxgl.Marker({ color: '#3B82F6' }).setLngLat([userLocation.lng, userLocation.lat]).addTo(map.current);

        // Add facility markers
        facilities.forEach((facility) => {
            const popupHTML = `<div><strong>${facility.name}</strong><p>${facility.address}</p></div>`;
            new mapboxgl.Marker({ color: '#DC2626' })
                .setLngLat([facility.coordinates.lng, facility.coordinates.lat])
                .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupHTML))
                .addTo(map.current!);
        });

        return () => map.current?.remove();
    }, [facilities, userLocation]);

    if (MAPBOX_TOKEN === 'YOUR_MAPBOX_TOKEN_HERE') {
        return <Card className="h-full flex items-center justify-center p-8 text-center"><p>Please add your Mapbox public token to enable the interactive map view.</p></Card>;
    }

    return <div ref={mapContainer} className="w-full h-full rounded-lg" style={{ minHeight: '800px' }} />;
};


// --- MAIN PAGE COMPONENT ---

const FindCarePage = () => {
    const [allFacilities, setAllFacilities] = useState<Facility[]>([]);
    const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>([]);
    const [filters, setFilters] = useState<FilterState>({ services: [], amenities: [], accommodations: [], priceRange: { min: 0, max: 10000 }});
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

    useEffect(() => {
        // TODO: Replace MOCK_FACILITIES with an API call to your backend
        setAllFacilities(MOCK_FACILITIES);
        
        navigator.geolocation.getCurrentPosition(
            (position) => setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude }),
            () => setUserLocation({ lat: 33.4484, lng: -112.0740 }) // Fallback location
        );
    }, []);

    useEffect(() => {
        const results = allFacilities.filter(facility => {
            const { services, amenities, accommodations, priceRange } = filters;
            const serviceMatch = services.length === 0 || services.every(s => facility.services.includes(s));
            const amenityMatch = amenities.length === 0 || amenities.every(a => facility.amenities.includes(a));
            const accommodationMatch = accommodations.length === 0 || accommodations.every(a => facility.accommodations.includes(a));
            const priceMatch = (!facility.priceRange.min || facility.priceRange.min >= priceRange.min) && (!facility.priceRange.max || facility.priceRange.max <= priceRange.max);
            
            return serviceMatch && amenityMatch && accommodationMatch && priceMatch;
        });
        setFilteredFacilities(results);
    }, [filters, allFacilities]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Care Solution</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">Use our advanced filters to discover facilities that meet your unique needs.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <FilterSidebar onFilterChange={setFilters} />
                </div>
                <div className="lg:col-span-3">
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-gray-700">Showing <span className="font-bold">{filteredFacilities.length}</span> of <span className="font-bold">{allFacilities.length}</span> facilities</p>
                        <div className="flex items-center space-x-2 p-1 bg-gray-100 rounded-lg">
                            <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('list')}><List className="h-4 w-4 mr-2" />List</Button>
                            <Button variant={viewMode === 'map' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('map')}><Map className="h-4 w-4 mr-2" />Map</Button>
                        </div>
                    </div>
                    
                    {viewMode === 'list' ? (
                        <div className="space-y-6">
                            {filteredFacilities.map(facility => (
                                <FacilityCard key={facility.id} facility={facility} />
                            ))}
                        </div>
                    ) : (
                        <MapView facilities={filteredFacilities} userLocation={userLocation} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default FindCarePage;
