
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Phone, Globe, Users } from 'lucide-react';

const FindCarePage = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [careType, setCareType] = useState('');

  const mockFacilities = [
    {
      id: 1,
      name: 'Sunrise Senior Living',
      type: 'Assisted Living',
      location: 'Beverly Hills, CA',
      rating: 4.8,
      reviews: 124,
      capacity: 150,
      description: 'Luxury assisted living with personalized care plans and resort-style amenities.',
      contact: '(555) 123-4567',
      website: 'www.sunriseseniorliving.com',
      amenities: ['Memory Care', '24/7 Nursing', 'Dining', 'Activities']
    },
    {
      id: 2,
      name: 'Golden Years Care Center',
      type: 'Memory Care',
      location: 'Santa Monica, CA',
      rating: 4.6,
      reviews: 89,
      capacity: 80,
      description: 'Specialized memory care facility with secure environment and trained staff.',
      contact: '(555) 987-6543',
      website: 'www.goldenyearscare.com',
      amenities: ['Secure Unit', 'Therapy Programs', 'Family Support', 'Medical Care']
    },
    {
      id: 3,
      name: 'Peaceful Valley Assisted Living',
      type: 'Assisted Living',
      location: 'Pasadena, CA',
      rating: 4.7,
      reviews: 156,
      capacity: 200,
      description: 'Comprehensive assisted living services in a peaceful, home-like setting.',
      contact: '(555) 456-7890',
      website: 'www.peacefulvalley.com',
      amenities: ['Independent Living', 'Assisted Living', 'Respite Care', 'Wellness Programs']
    }
  ];

  return (
    <div className="min-h-screen py-20 bg-brand-off-white">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-h1 font-heading font-bold text-text-primary mb-6">
            Find Quality Care Near You
          </h1>
          <p className="text-body-large text-text-secondary max-w-3xl mx-auto mb-8">
            Search our comprehensive database of verified care facilities and providers
          </p>
        </div>

        {/* Search Form */}
        <Card className="max-w-4xl mx-auto mb-12 bg-background-card border-ui-border">
          <CardHeader>
            <CardTitle className="text-h3 text-text-primary">Search Criteria</CardTitle>
            <CardDescription className="text-text-secondary">Find the perfect care solution for your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Location
                </label>
                <Input
                  placeholder="City, State or ZIP"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="bg-white border-ui-border text-text-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Type of Care
                </label>
                <Select value={careType} onValueChange={setCareType}>
                  <SelectTrigger className="bg-white border-ui-border text-text-primary">
                    <SelectValue placeholder="Select care type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="assisted-living">Assisted Living</SelectItem>
                    <SelectItem value="memory-care">Memory Care</SelectItem>
                    <SelectItem value="independent-living">Independent Living</SelectItem>
                    <SelectItem value="skilled-nursing">Skilled Nursing</SelectItem>
                    <SelectItem value="home-care">Home Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-brand-red hover:bg-brand-red/90 text-white">
                  Search Facilities
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-background-card border-ui-border">
              <CardHeader>
                <CardTitle className="text-lg text-text-primary">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-text-primary mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[5, 4, 3].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <div className="flex items-center">
                          {Array.from({ length: rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                          ))}
                          <span className="ml-2 text-sm text-text-primary">& up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-text-primary mb-3">Amenities</h4>
                  <div className="space-y-2">
                    {['24/7 Nursing', 'Memory Care', 'Dining Services', 'Transportation', 'Activities'].map((amenity) => (
                      <label key={amenity} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-text-primary">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-h3 font-bold text-text-primary">
                {mockFacilities.length} Facilities Found
              </h2>
              <Select defaultValue="rating">
                <SelectTrigger className="w-48 bg-white border-ui-border text-text-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Sort by Rating</SelectItem>
                  <SelectItem value="distance">Sort by Distance</SelectItem>
                  <SelectItem value="price">Sort by Price</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mockFacilities.map((facility) => (
              <Card key={facility.id} className="hover:shadow-lg transition-shadow bg-background-card border-ui-border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-h4 font-bold text-text-primary mb-2">
                        {facility.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-text-secondary mb-2">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {facility.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          Capacity: {facility.capacity}
                        </div>
                      </div>
                      <div className="flex items-center mb-3">
                        <div className="flex items-center mr-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${
                                i < Math.floor(facility.rating) 
                                  ? 'fill-brand-gold text-brand-gold' 
                                  : 'text-ui-border'
                              }`} 
                            />
                          ))}
                          <span className="ml-2 text-sm font-medium text-text-primary">
                            {facility.rating} ({facility.reviews} reviews)
                          </span>
                        </div>
                        <Badge variant="outline" className="text-brand-sky border-brand-sky">
                          {facility.type}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-text-secondary mb-4">{facility.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {facility.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="bg-brand-light-blue text-brand-navy">
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {facility.contact}
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-1" />
                        {facility.website}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white">
                        View Details
                      </Button>
                      <Button className="bg-brand-red hover:bg-brand-red/90 text-white">
                        Contact Facility
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindCarePage;
