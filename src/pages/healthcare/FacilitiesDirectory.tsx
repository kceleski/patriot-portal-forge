
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, MapPin, Star, Phone, Globe, Users, Heart, Search, Filter } from 'lucide-react';

const FacilitiesDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [careTypeFilter, setCareTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const facilities = [
    {
      id: 1,
      name: 'Sunrise Senior Living',
      type: 'Assisted Living',
      location: 'Beverly Hills, CA',
      address: '123 Sunset Blvd, Beverly Hills, CA 90210',
      rating: 4.8,
      reviews: 124,
      capacity: 150,
      occupied: 132,
      priceRange: '$4,500 - $6,200/mo',
      contact: '(555) 123-4567',
      website: 'www.sunriseseniorliving.com',
      description: 'Luxury assisted living with personalized care plans and resort-style amenities.',
      amenities: ['Memory Care', '24/7 Nursing', 'Dining', 'Activities', 'Transportation'],
      partnershipStatus: 'Preferred Partner',
      lastUpdate: '2024-12-10',
      admissions: 'Open',
      waitingList: 12
    },
    {
      id: 2,
      name: 'Golden Years Memory Care',
      type: 'Memory Care',
      location: 'Santa Monica, CA',
      address: '456 Memory Lane, Santa Monica, CA 90401',
      rating: 4.6,
      reviews: 89,
      capacity: 80,
      occupied: 78,
      priceRange: '$5,200 - $7,800/mo',
      contact: '(555) 987-6543',
      website: 'www.goldenyearscare.com',
      description: 'Specialized memory care facility with secure environment and trained staff.',
      amenities: ['Secure Unit', 'Therapy Programs', 'Family Support', 'Medical Care'],
      partnershipStatus: 'Partner',
      lastUpdate: '2024-12-08',
      admissions: 'Limited',
      waitingList: 25
    },
    {
      id: 3,
      name: 'Peaceful Valley Assisted Living',
      type: 'Assisted Living',
      location: 'Pasadena, CA',
      address: '789 Valley Road, Pasadena, CA 91101',
      rating: 4.7,
      reviews: 156,
      capacity: 200,
      occupied: 185,
      priceRange: '$3,800 - $5,500/mo',
      contact: '(555) 456-7890',
      website: 'www.peacefulvalley.com',
      description: 'Comprehensive assisted living services in a peaceful, home-like setting.',
      amenities: ['Independent Living', 'Assisted Living', 'Respite Care', 'Wellness Programs'],
      partnershipStatus: 'Standard',
      lastUpdate: '2024-12-05',
      admissions: 'Open',
      waitingList: 8
    },
    {
      id: 4,
      name: 'Oakwood Skilled Nursing',
      type: 'Skilled Nursing',
      location: 'Long Beach, CA',
      address: '321 Oak Street, Long Beach, CA 90802',
      rating: 4.4,
      reviews: 78,
      capacity: 120,
      occupied: 115,
      priceRange: '$6,500 - $9,200/mo',
      contact: '(555) 321-9876',
      website: 'www.oakwoodskilled.com',
      description: 'Professional skilled nursing care with rehabilitation services.',
      amenities: ['Skilled Nursing', 'Rehabilitation', 'Physical Therapy', 'Medical Care'],
      partnershipStatus: 'Preferred Partner',
      lastUpdate: '2024-12-07',
      admissions: 'Open',
      waitingList: 5
    }
  ];

  const getPartnershipColor = (status: string) => {
    switch (status) {
      case 'Preferred Partner':
        return 'bg-accent-gold text-text-dark-gray';
      case 'Partner':
        return 'bg-primary-sky text-white';
      case 'Standard':
        return 'bg-gray-200 text-gray-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getAdmissionColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-800';
      case 'Limited':
        return 'bg-yellow-100 text-yellow-800';
      case 'Closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         facility.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCareType = careTypeFilter === 'all' || facility.type.toLowerCase().replace(' ', '-') === careTypeFilter;
    const matchesLocation = locationFilter === 'all' || facility.location.includes(locationFilter);
    return matchesSearch && matchesCareType && matchesLocation;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">Enhanced Facilities Directory</h1>
          <p className="text-gray-600 mt-2">Comprehensive database of care facilities with detailed information and partnership status.</p>
        </div>
        <Button className="bg-primary-red hover:bg-red-600">
          Request Partnership
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
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
            <Button variant="outline">
              Export Directory
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFacilities.map((facility) => (
          <Card key={facility.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-text-dark-gray mb-2">{facility.name}</h3>
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
                    <Badge variant="outline" className="text-primary-sky border-primary-sky">
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
                    <span className="font-medium text-primary-red">{facility.priceRange}</span>
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
                <h4 className="font-semibold text-text-dark-gray mb-2 text-sm">Key Amenities</h4>
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
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1 bg-primary-sky hover:bg-blue-600">
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

      {/* Partnership Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="h-5 w-5 mr-2" />
            Partnership Summary
          </CardTitle>
          <CardDescription>Overview of facility partnerships and network status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-text-dark-gray mb-1">
                {facilities.filter(f => f.partnershipStatus === 'Preferred Partner').length}
              </div>
              <div className="text-sm text-gray-600">Preferred Partners</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-text-dark-gray mb-1">
                {facilities.filter(f => f.partnershipStatus === 'Partner').length}
              </div>
              <div className="text-sm text-gray-600">Standard Partners</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-text-dark-gray mb-1">
                {facilities.reduce((sum, f) => sum + (f.capacity - f.occupied), 0)}
              </div>
              <div className="text-sm text-gray-600">Available Beds</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-text-dark-gray mb-1">
                {facilities.reduce((sum, f) => sum + f.waitingList, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Waiting List</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacilitiesDirectory;
