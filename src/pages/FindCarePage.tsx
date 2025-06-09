
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Phone, Globe, Users, Search, Filter } from 'lucide-react';
import { SerperService, SerperPlaceResult } from '@/services/serperService';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import SearchResultsManager from '@/components/search/SearchResultsManager';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const FindCarePage = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [careType, setCareType] = useState('');
  const [facilities, setFacilities] = useState<SerperPlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { user } = useAuth();

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

  const formatPhoneNumber = (phone?: string) => {
    if (!phone) return 'Not available';
    return phone;
  };

  const formatWebsite = (website?: string) => {
    if (!website) return 'Not available';
    return website.replace(/^https?:\/\//, '');
  };

  const FiltersContent = () => (
    <div className="space-y-6">
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
    </div>
  );

  return (
    <div className="min-h-screen py-8 sm:py-12 lg:py-20 bg-brand-off-white">
      <SearchResultsManager
        searchQuery={`${careType || 'assisted living'} in ${searchLocation}`}
        results={facilities}
        userId={user?.id}
        onSaveComplete={(count) => console.log(`Saved ${count} search results`)}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4 sm:mb-6 font-heading">
            Find Quality Care Near You
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto mb-6 sm:mb-8">
            Search our comprehensive database of verified care facilities and providers
          </p>
        </div>

        {/* Search Form */}
        <Card className="max-w-4xl mx-auto mb-8 sm:mb-12 bg-background-card border-ui-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl text-text-primary">Search Criteria</CardTitle>
            <CardDescription className="text-text-secondary">Find the perfect care solution for your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="sm:col-span-2 lg:col-span-1">
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
              <div className="sm:col-span-2 lg:col-span-1">
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
              <div className="sm:col-span-2 lg:col-span-1 flex items-end">
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <Card className="bg-background-card border-ui-border sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg text-text-primary">Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <FiltersContent />
                </CardContent>
              </Card>
            </div>

            {/* Results List */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary">
                  {facilities.length} Facilities Found
                </h2>
                <div className="flex items-center gap-3">
                  {/* Mobile Filters Button */}
                  <div className="lg:hidden">
                    <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filters
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-80">
                        <div className="py-6">
                          <h3 className="text-lg font-semibold mb-4">Filters</h3>
                          <FiltersContent />
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                  
                  <Select defaultValue="rating">
                    <SelectTrigger className="w-40 sm:w-48 bg-white border-ui-border text-text-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Sort by Rating</SelectItem>
                      <SelectItem value="distance">Sort by Distance</SelectItem>
                      <SelectItem value="name">Sort by Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {facilities.length === 0 && !loading ? (
                <Card className="bg-background-card border-ui-border p-6 sm:p-8 text-center">
                  <p className="text-text-secondary">No facilities found. Try adjusting your search criteria.</p>
                </Card>
              ) : (
                facilities.map((facility, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow bg-background-card border-ui-border">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2">
                            {facility.title}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-text-secondary mb-2">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                              <span className="break-words">{facility.address}</span>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                            {facility.rating && (
                              <div className="flex items-center">
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
                        <p className="text-text-secondary mb-4 text-sm sm:text-base">{facility.description}</p>
                      )}

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-text-secondary">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span className="break-all">{formatPhoneNumber(facility.phoneNumber)}</span>
                          </div>
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span className="break-all">{formatWebsite(facility.website)}</span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
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
