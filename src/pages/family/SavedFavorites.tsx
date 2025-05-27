
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, MapPin, Star, Phone, Globe, Trash2, MessageSquare } from 'lucide-react';

const SavedFavorites = () => {
  const [sortBy, setSortBy] = useState('recent');

  const savedFacilities = [
    {
      id: 1,
      name: 'Sunrise Senior Living',
      type: 'Assisted Living',
      location: 'Beverly Hills, CA',
      rating: 4.8,
      reviews: 124,
      priceRange: '$4,500 - $6,200/mo',
      savedDate: '2024-12-10',
      notes: 'Great amenities and staff. Mom loved the tour.',
      contact: '(555) 123-4567',
      website: 'www.sunriseseniorliving.com',
      amenities: ['Memory Care', '24/7 Nursing', 'Dining', 'Activities'],
      images: ['photo-1649972904349-6e44c42644a7']
    },
    {
      id: 2,
      name: 'Golden Years Care Center',
      type: 'Memory Care',
      location: 'Santa Monica, CA',
      rating: 4.6,
      reviews: 89,
      priceRange: '$5,200 - $7,800/mo',
      savedDate: '2024-12-08',
      notes: 'Specialized memory care unit with excellent staff training.',
      contact: '(555) 987-6543',
      website: 'www.goldenyearscare.com',
      amenities: ['Secure Unit', 'Therapy Programs', 'Family Support', 'Medical Care'],
      images: ['photo-1488590528505-98d2b5aba04b']
    },
    {
      id: 3,
      name: 'Peaceful Valley Assisted Living',
      type: 'Assisted Living',
      location: 'Pasadena, CA',
      rating: 4.7,
      reviews: 156,
      priceRange: '$3,800 - $5,500/mo',
      savedDate: '2024-12-05',
      notes: 'Beautiful gardens and home-like atmosphere.',
      contact: '(555) 456-7890',
      website: 'www.peacefulvalley.com',
      amenities: ['Independent Living', 'Assisted Living', 'Respite Care', 'Wellness Programs'],
      images: ['photo-1518770660439-4636190af475']
    }
  ];

  const removeFavorite = (id: number) => {
    console.log('Removing facility from favorites:', id);
  };

  const contactFacility = (facility: any) => {
    console.log('Contacting facility:', facility.name);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">Saved Favorites</h1>
          <p className="text-gray-600 mt-2">Your shortlisted care facilities and providers.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently Saved</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-primary-red" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{savedFacilities.length}</p>
                <p className="text-gray-600">Saved Facilities</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-accent-gold" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">4.7</p>
                <p className="text-gray-600">Average Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-primary-sky" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">3</p>
                <p className="text-gray-600">Locations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Saved Facilities */}
      <div className="space-y-6">
        {savedFacilities.map((facility) => (
          <Card key={facility.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-text-dark-gray">{facility.name}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFavorite(facility.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {facility.location}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                      {facility.rating} ({facility.reviews} reviews)
                    </div>
                    <Badge variant="outline" className="text-primary-sky border-primary-sky">
                      {facility.type}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <h4 className="font-semibold text-text-dark-gray mb-2">Your Notes</h4>
                        <p className="text-gray-700 bg-secondary-off-white p-3 rounded-lg">
                          {facility.notes}
                        </p>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-text-dark-gray mb-2">Price Range</h4>
                        <p className="text-lg font-semibold text-primary-red">{facility.priceRange}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-text-dark-gray mb-2">Contact Information</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            {facility.contact}
                          </div>
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-2" />
                            {facility.website}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-text-dark-gray mb-2">Amenities</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {facility.amenities.map((amenity) => (
                          <Badge key={amenity} variant="secondary">
                            {amenity}
                          </Badge>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <Button 
                          className="w-full bg-primary-red hover:bg-red-600"
                          onClick={() => contactFacility(facility)}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact Facility
                        </Button>
                        <Button variant="outline" className="w-full">
                          Schedule Tour
                        </Button>
                        <Button variant="outline" className="w-full">
                          View Full Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right text-sm text-gray-500">
                Saved on {new Date(facility.savedDate).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {savedFacilities.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-dark-gray mb-2">No Saved Favorites Yet</h3>
            <p className="text-gray-600 mb-6">
              Start exploring care facilities and save your favorites for easy comparison.
            </p>
            <Button className="bg-primary-red hover:bg-red-600">
              Browse Facilities
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SavedFavorites;
