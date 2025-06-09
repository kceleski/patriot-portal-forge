
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Phone, Globe, Users, Search } from 'lucide-react';
import { SerperService, SerperPlaceResult } from '@/services/serperService';
import { toast } from '@/hooks/use-toast';

const FindCarePage = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [careType, setCareType] = useState('');
  const [facilities, setFacilities] = useState<SerperPlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchLocation.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter a location to search for facilities.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const careTypeQuery = careType ? careType.replace('-', ' ') : 'assisted living';
      const query = `${careTypeQuery} facility ${searchLocation}`;
      
      console.log('Searching for:', query);
      const results = await SerperService.searchPlaces(query);
      console.log('Search results:', results);
      
      setFacilities(results);
      setHasSearched(true);
      
      if (results.length === 0) {
        toast({
          title: "No Results",
          description: "No facilities found for your search criteria. Try adjusting your location or care type.",
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

  const formatPhoneNumber = (phone?: string) => {
    if (!phone) return 'Not available';
    return phone;
  };

  const formatWebsite = (website?: string) => {
    if (!website) return 'Not available';
    return website.replace(/^https?:\/\//, '');
  };

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
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
                <Button 
                  onClick={handleSearch}
                  disabled={loading}
                  className="w-full bg-brand-red hover:bg-brand-red/90 text-white"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Search Facilities
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {hasSearched && (
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
                  {facilities.length} Facilities Found
                </h2>
                <Select defaultValue="rating">
                  <SelectTrigger className="w-48 bg-white border-ui-border text-text-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Sort by Rating</SelectItem>
                    <SelectItem value="distance">Sort by Distance</SelectItem>
                    <SelectItem value="name">Sort by Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {facilities.length === 0 && !loading ? (
                <Card className="bg-background-card border-ui-border p-8 text-center">
                  <p className="text-text-secondary">No facilities found. Try adjusting your search criteria.</p>
                </Card>
              ) : (
                facilities.map((facility, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow bg-background-card border-ui-border">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-h4 font-bold text-text-primary mb-2">
                            {facility.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-text-secondary mb-2">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {facility.address}
                            </div>
                          </div>
                          <div className="flex items-center mb-3">
                            {facility.rating && (
                              <div className="flex items-center mr-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${
                                      i < Math.floor(facility.rating!) 
                                        ? 'fill-brand-gold text-brand-gold' 
                                        : 'text-ui-border'
                                    }`} 
                                  />
                                ))}
                                <span className="ml-2 text-sm font-medium text-text-primary">
                                  {facility.rating} {facility.reviews && `(${facility.reviews} reviews)`}
                                </span>
                              </div>
                            )}
                            {facility.category && (
                              <Badge variant="outline" className="text-brand-sky border-brand-sky">
                                {facility.category}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {facility.description && (
                        <p className="text-text-secondary mb-4">{facility.description}</p>
                      )}

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4 text-sm text-text-secondary">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {formatPhoneNumber(facility.phoneNumber)}
                          </div>
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-1" />
                            {formatWebsite(facility.website)}
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
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindCarePage;
