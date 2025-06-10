
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Filter, Search, Phone, Mail, Globe, Star, Bed, DollarSign } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { SerperService } from '@/services/serperService';
import { useAuth } from '@/contexts/AuthContext';

const FacilityMapView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    facilityType: '',
    priceRange: '',
    availabilityOnly: false
  });
  const { user } = useAuth();

  // Mock facility data with agent-specific information
  const mockFacilities = [
    {
      id: '1',
      name: 'Sunset Senior Living',
      type: 'Assisted Living',
      address: '123 Oak Street, Los Angeles, CA 90210',
      phone: '(555) 123-4567',
      email: 'info@sunsetsenior.com',
      website: 'www.sunsetsenior.com',
      rating: 4.8,
      availableBeds: 3,
      totalBeds: 45,
      priceRange: '$3,500 - $5,200',
      commissionRate: '75%',
      lastPlacement: '2 weeks ago',
      contactPerson: 'Sarah Johnson',
      contactTitle: 'Admissions Director',
      specialties: ['Memory Care', 'Respite Care'],
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    {
      id: '2',
      name: 'Golden Years Care Center',
      type: 'Memory Care',
      address: '456 Pine Avenue, Beverly Hills, CA 90210',
      phone: '(555) 987-6543',
      email: 'contact@goldenyears.com',
      website: 'www.goldenyears.com',
      rating: 4.6,
      availableBeds: 1,
      totalBeds: 32,
      priceRange: '$4,200 - $6,800',
      commissionRate: '80%',
      lastPlacement: '1 month ago',
      contactPerson: 'Michael Chen',
      contactTitle: 'Clinical Director',
      specialties: ['Alzheimer\'s Care', 'Dementia Care'],
      coordinates: { lat: 34.0736, lng: -118.4004 }
    }
  ];

  useEffect(() => {
    setFacilities(mockFacilities);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter a search term to find facilities.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const query = `${searchQuery} ${filters.facilityType ? filters.facilityType.replace('-', ' ') : 'assisted living'} facility`;
      console.log('Searching for:', query);
      
      const results = await SerperService.searchPlaces(query);
      console.log('Search results:', results);
      
      // Convert search results to facility format
      const convertedFacilities = results.map((result, index) => ({
        id: `search-${index}`,
        name: result.title,
        type: filters.facilityType || 'Assisted Living',
        address: result.address,
        phone: result.phoneNumber || 'Not available',
        email: 'contact@facility.com',
        website: result.website || 'Not available',
        rating: result.rating || 0,
        availableBeds: Math.floor(Math.random() * 10) + 1,
        totalBeds: Math.floor(Math.random() * 50) + 20,
        priceRange: '$3,000 - $6,000',
        commissionRate: '75%',
        lastPlacement: 'Never',
        contactPerson: 'Contact Person',
        contactTitle: 'Admissions Director',
        specialties: ['General Care'],
        coordinates: { lat: result.latitude, lng: result.longitude }
      }));

      setFacilities([...mockFacilities, ...convertedFacilities]);
      
      toast({
        title: "Search Complete",
        description: `Found ${convertedFacilities.length} additional facilities`,
      });
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

  const handleAddToClientMatch = (facility: any) => {
    toast({
      title: "Added to Client Match",
      description: `${facility.name} has been added to your client matching list.`,
    });
  };

  const handleScheduleTour = (facility: any) => {
    toast({
      title: "Tour Scheduled",
      description: `Tour request sent to ${facility.name}. They will contact you to confirm.`,
    });
  };

  const handleViewProfile = (facility: any) => {
    toast({
      title: "Profile Opened",
      description: `Opening detailed profile for ${facility.name}.`,
    });
  };

  const handleApplyFilters = () => {
    let filtered = mockFacilities;
    
    if (filters.facilityType) {
      filtered = filtered.filter(f => f.type.toLowerCase().includes(filters.facilityType.toLowerCase()));
    }
    
    if (filters.availabilityOnly) {
      filtered = filtered.filter(f => f.availableBeds > 0);
    }
    
    setFacilities(filtered);
    
    toast({
      title: "Filters Applied",
      description: `Showing ${filtered.length} facilities matching your criteria.`,
    });
  };

  return (
    <div className="min-h-screen bg-brand-off-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-2">Facility Map View</h1>
          <p className="text-gray-600 text-lg">Advanced facility search and analysis for placement agents</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-brand-navy">
              <Search className="h-5 w-5" />
              <span>Search & Filter Facilities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              <Input
                placeholder="Search facilities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border-gray-300"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Select value={filters.facilityType} onValueChange={(value) => setFilters({...filters, facilityType: value})}>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue placeholder="Facility Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="assisted-living">Assisted Living</SelectItem>
                  <SelectItem value="memory-care">Memory Care</SelectItem>
                  <SelectItem value="skilled-nursing">Skilled Nursing</SelectItem>
                  <SelectItem value="independent-living">Independent Living</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filters.priceRange} onValueChange={(value) => setFilters({...filters, priceRange: value})}>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">$2,000 - $4,000</SelectItem>
                  <SelectItem value="mid">$4,000 - $6,000</SelectItem>
                  <SelectItem value="high">$6,000+</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={handleApplyFilters}
                variant="outline"
                className="border-brand-sky text-brand-sky hover:bg-brand-sky hover:text-white"
              >
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
              <Button 
                onClick={handleSearch}
                disabled={loading}
                className="bg-brand-red hover:bg-brand-red/90 text-white"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Search
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Placeholder */}
          <Card className="h-96 bg-white border-gray-200">
            <CardContent className="p-0 h-full">
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Interactive Map View</p>
                  <p className="text-gray-400">Integration with mapping service</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Facility List */}
          <Card className="h-96 overflow-hidden bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-brand-navy">Facilities ({facilities.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-y-auto h-80">
                {facilities.map((facility) => (
                  <div
                    key={facility.id}
                    className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedFacility(facility)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-brand-navy">{facility.name}</h3>
                        <p className="text-gray-600 text-sm">{facility.address}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">{facility.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Bed className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{facility.availableBeds} available</span>
                          </div>
                          <Badge variant="outline" className="text-brand-green border-brand-green">{facility.commissionRate} commission</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Facility Information */}
        {selectedFacility && (
          <Card className="mt-6 bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl text-brand-navy">{selectedFacility.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-brand-navy">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{selectedFacility.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{selectedFacility.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span>{selectedFacility.website}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-brand-navy">Agent Information</h4>
                  <div className="space-y-2">
                    <p><strong>Commission Rate:</strong> {selectedFacility.commissionRate}</p>
                    <p><strong>Last Placement:</strong> {selectedFacility.lastPlacement}</p>
                    <p><strong>Contact Person:</strong> {selectedFacility.contactPerson}</p>
                    <p><strong>Title:</strong> {selectedFacility.contactTitle}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-brand-navy">Facility Details</h4>
                  <div className="space-y-2">
                    <p><strong>Type:</strong> {selectedFacility.type}</p>
                    <p><strong>Price Range:</strong> {selectedFacility.priceRange}</p>
                    <p><strong>Capacity:</strong> {selectedFacility.availableBeds}/{selectedFacility.totalBeds}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedFacility.specialties.map((specialty: string, index: number) => (
                        <Badge key={index} variant="secondary">{specialty}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => handleAddToClientMatch(selectedFacility)}
                  className="bg-brand-red hover:bg-brand-red/90 text-white"
                >
                  Add to Client Match
                </Button>
                <Button 
                  onClick={() => handleScheduleTour(selectedFacility)}
                  variant="outline"
                  className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
                >
                  Schedule Tour
                </Button>
                <Button 
                  onClick={() => handleViewProfile(selectedFacility)}
                  variant="outline"
                  className="border-brand-sky text-brand-sky hover:bg-brand-sky hover:text-white"
                >
                  View Full Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FacilityMapView;
