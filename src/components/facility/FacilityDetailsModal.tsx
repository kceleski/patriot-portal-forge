
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Phone, 
  Globe, 
  Star, 
  Heart, 
  Share2, 
  Calendar,
  Users,
  DollarSign,
  Award,
  Clock,
  Wifi,
  Car,
  Utensils,
  Activity,
  Shield,
  Camera,
  MessageCircle
} from 'lucide-react';

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
  facility_images?: Array<{ url: string; is_primary: boolean }>;
  address?: string;
  phone?: string;
  website?: string;
  description?: string;
  capacity?: number;
  current_availability?: number;
}

interface FacilityDetailsModalProps {
  facility: Facility | null;
  isOpen: boolean;
  onClose: () => void;
}

const FacilityDetailsModal: React.FC<FacilityDetailsModalProps> = ({ 
  facility, 
  isOpen, 
  onClose 
}) => {
  if (!facility) return null;

  const getPrimaryImage = (facility: Facility) => {
    const primaryImage = facility.facility_images?.find(img => img.is_primary);
    return primaryImage?.url || '/placeholder.svg';
  };

  const amenities = [
    { icon: Wifi, name: 'WiFi', available: true },
    { icon: Car, name: 'Parking', available: true },
    { icon: Utensils, name: 'Dining', available: true },
    { icon: Activity, name: 'Fitness Center', available: false },
    { icon: Shield, name: '24/7 Security', available: true },
  ];

  const reviews = [
    {
      id: 1,
      author: 'Sarah M.',
      rating: 5,
      date: '2024-01-15',
      content: 'Excellent care and wonderful staff. My mother has been very happy here.',
    },
    {
      id: 2,
      author: 'John D.',
      rating: 4,
      date: '2024-01-10',
      content: 'Great facilities and activities. The location is perfect for family visits.',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-brand-navy mb-2">
                {facility.name}
              </DialogTitle>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{facility.city}, {facility.state}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hero Image & Quick Info */}
          <div className="relative">
            <img
              src={getPrimaryImage(facility)}
              alt={facility.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              {facility.is_featured && (
                <Badge className="bg-brand-gold text-brand-navy">Featured</Badge>
              )}
              <Badge variant="outline" className="bg-white">
                {facility.facility_type}
              </Badge>
            </div>
            <div className="absolute bottom-4 right-4">
              <Button size="sm" className="bg-white text-brand-navy hover:bg-gray-100">
                <Camera className="h-4 w-4 mr-2" />
                View Gallery
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                <div className="text-lg font-semibold">{facility.rating}</div>
                <div className="text-sm text-gray-600">Rating</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <div className="text-lg font-semibold">
                  ${facility.price_range_min} - ${facility.price_range_max}
                </div>
                <div className="text-sm text-gray-600">Monthly</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <div className="text-lg font-semibold">{facility.current_availability || 'N/A'}</div>
                <div className="text-sm text-gray-600">Available</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                <div className="text-lg font-semibold">24/7</div>
                <div className="text-sm text-gray-600">Care</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">About This Facility</h3>
                <p className="text-gray-700">
                  {facility.description || 'This is a premier care facility offering comprehensive services for seniors. Our dedicated staff provides personalized care in a comfortable, home-like environment.'}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-brand-gold" />
                    <span className="text-sm">Licensed & Certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-sm">24/7 Security</span>
                  </div>
                  {facility.accepts_va_benefits && (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">VA Benefits</Badge>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="amenities" className="space-y-4">
              <h3 className="text-lg font-semibold">Amenities & Services</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      amenity.available ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <amenity.icon className={`h-5 w-5 ${
                      amenity.available ? 'text-green-600' : 'text-gray-400'
                    }`} />
                    <span className={`text-sm ${
                      amenity.available ? 'text-green-800' : 'text-gray-500'
                    }`}>
                      {amenity.name}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              <h3 className="text-lg font-semibold">Pricing Information</h3>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Monthly Base Rate</span>
                      <span className="font-semibold">${facility.price_range_min} - ${facility.price_range_max}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Care Level Adjustments</span>
                      <span className="text-sm text-gray-600">Varies by need</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Medicare/Medicaid</span>
                      <span className="text-sm text-green-600">Accepted</span>
                    </div>
                    {facility.accepts_va_benefits && (
                      <div className="flex justify-between items-center">
                        <span>VA Benefits</span>
                        <span className="text-sm text-green-600">Accepted</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <h3 className="text-lg font-semibold">Resident & Family Reviews</h3>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-medium">{review.author}</div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4 space-y-4">
                    {facility.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-brand-sky" />
                        <div>
                          <div className="font-medium">Phone</div>
                          <div className="text-gray-600">{facility.phone}</div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-brand-sky" />
                      <div>
                        <div className="font-medium">Address</div>
                        <div className="text-gray-600">
                          {facility.address || `${facility.city}, ${facility.state}`}
                        </div>
                      </div>
                    </div>
                    
                    {facility.website && (
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-brand-sky" />
                        <div>
                          <div className="font-medium">Website</div>
                          <a 
                            href={facility.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-brand-sky hover:underline"
                          >
                            Visit Website
                          </a>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="bg-brand-red hover:bg-brand-red/90 text-white">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Tour
                  </Button>
                  <Button variant="outline" className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FacilityDetailsModal;
