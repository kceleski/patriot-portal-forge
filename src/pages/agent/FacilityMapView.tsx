
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Filter, Search, Phone, Mail, Globe, Star, Bed, DollarSign } from 'lucide-react';

const FacilityMapView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [filters, setFilters] = useState({
    facilityType: '',
    priceRange: '',
    availabilityOnly: false
  });

  // Mock facility data with agent-specific information
  const facilities = [
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-brand-navy mb-2">Facility Map View</h1>
          <p className="text-gray-600 text-lg">Advanced facility search and analysis for placement agents</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search & Filter Facilities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Search facilities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Select value={filters.facilityType} onValueChange={(value) => setFilters({...filters, facilityType: value})}>
                <SelectTrigger>
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
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">$2,000 - $4,000</SelectItem>
                  <SelectItem value="mid">$4,000 - $6,000</SelectItem>
                  <SelectItem value="high">$6,000+</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-brand-sky hover:bg-blue-600">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Placeholder */}
          <Card className="h-96">
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
          <Card className="h-96 overflow-hidden">
            <CardHeader>
              <CardTitle>Facilities ({facilities.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-y-auto h-80">
                {facilities.map((facility) => (
                  <div
                    key={facility.id}
                    className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
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
                          <Badge variant="outline">{facility.commissionRate} commission</Badge>
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
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-2xl">{selectedFacility.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Contact Information</h4>
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
                  <h4 className="font-semibold text-lg">Agent Information</h4>
                  <div className="space-y-2">
                    <p><strong>Commission Rate:</strong> {selectedFacility.commissionRate}</p>
                    <p><strong>Last Placement:</strong> {selectedFacility.lastPlacement}</p>
                    <p><strong>Contact Person:</strong> {selectedFacility.contactPerson}</p>
                    <p><strong>Title:</strong> {selectedFacility.contactTitle}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Facility Details</h4>
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

              <div className="mt-6 flex space-x-3">
                <Button className="bg-brand-red hover:bg-red-600">
                  Add to Client Match
                </Button>
                <Button variant="outline">
                  Schedule Tour
                </Button>
                <Button variant="outline">
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
