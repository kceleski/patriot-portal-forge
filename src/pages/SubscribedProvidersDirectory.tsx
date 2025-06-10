
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, Phone, Mail, Globe, Video, Star, Users, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface SubscribedProvider {
  uuid: string;
  facilityName: string;
  description: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: number;
  phone: string;
  email: string;
  website: string;
  imageUrl1?: string;
  imageUrl2?: string;
  imageUrl3?: string;
  coreServices: string;
  lifestyleAmenities: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  callToActionText?: string;
}

const SubscribedProvidersDirectory = () => {
  const [providers, setProviders] = useState<SubscribedProvider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<SubscribedProvider[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<SubscribedProvider | null>(null);
  const [showVideoTour, setShowVideoTour] = useState(false);

  useEffect(() => {
    fetchSubscribedProviders();
  }, []);

  useEffect(() => {
    filterProviders();
  }, [providers, searchTerm, selectedLocation]);

  const fetchSubscribedProviders = async () => {
    try {
      const { data, error } = await supabase
        .from('subsribed')
        .select('*');

      if (error) throw error;

      const formattedData = data.map(item => ({
        uuid: item.uuid,
        facilityName: item['Facility Name'] || '',
        description: item['Description'] || '',
        streetAddress: item['Street Address'] || '',
        city: item['City'] || '',
        state: item['State'] || '',
        zipCode: item['ZIP Code'] || 0,
        phone: item['Phone'] || '',
        email: item['Email'] || '',
        website: item['Website'] || '',
        imageUrl1: item['Image URL 1'],
        imageUrl2: item['Image URL 2'],
        imageUrl3: item['Image URL 3'],
        coreServices: item['Core Services (comma-separated)'] || '',
        lifestyleAmenities: item['Lifestyle Amenities (comma-separated)'] || '',
        ctaButtonText: item['CTA Button 1 Text'],
        ctaButtonLink: item['CTA Button 1 Link'],
        callToActionText: item['Call to Action Text']
      }));

      setProviders(formattedData);
    } catch (error) {
      console.error('Error fetching subscribed providers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProviders = () => {
    let filtered = providers.filter(provider => {
      const matchesSearch = provider.facilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           provider.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           provider.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = selectedLocation === 'all' || provider.state === selectedLocation;
      
      return matchesSearch && matchesLocation;
    });

    setFilteredProviders(filtered);
  };

  const getUniqueStates = () => {
    const states = [...new Set(providers.map(p => p.state).filter(Boolean))];
    return states.sort();
  };

  const parseServices = (services: string) => {
    return services ? services.split(',').map(s => s.trim()).filter(Boolean) : [];
  };

  const VideoTourModal = ({ provider }: { provider: SubscribedProvider }) => (
    <Dialog open={showVideoTour} onOpenChange={setShowVideoTour}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Virtual Tour - {provider.facilityName}</DialogTitle>
        </DialogHeader>
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Video className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">Virtual tour will be integrated here</p>
            <p className="text-sm text-gray-500 mt-2">
              This would connect to 360° tour providers like Matterport
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-off-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading providers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-off-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-brand-navy mb-4">Subscribed Providers Directory</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our premium network of verified healthcare providers and facilities
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search providers, cities, or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="sm:w-48">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All States</option>
                {getUniqueStates().map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            Showing {filteredProviders.length} of {providers.length} subscribed providers
          </div>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <Card key={provider.uuid} className="hover:shadow-lg transition-shadow overflow-hidden">
              {provider.imageUrl1 && (
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={provider.imageUrl1}
                    alt={provider.facilityName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{provider.facilityName}</CardTitle>
                  <Badge variant="default" className="bg-brand-gold text-white">Premium</Badge>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {provider.city}, {provider.state}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm line-clamp-3">{provider.description}</p>

                {/* Services */}
                {provider.coreServices && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Core Services</h4>
                    <div className="flex flex-wrap gap-1">
                      {parseServices(provider.coreServices).slice(0, 3).map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{service}</Badge>
                      ))}
                      {parseServices(provider.coreServices).length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{parseServices(provider.coreServices).length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                  {provider.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {provider.phone}
                    </div>
                  )}
                  {provider.email && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {provider.email}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      setSelectedProvider(provider);
                      setShowVideoTour(true);
                    }}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Virtual Tour
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {provider.website && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={provider.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-1" />
                          Website
                        </a>
                      </Button>
                    )}
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{provider.facilityName}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[provider.imageUrl1, provider.imageUrl2, provider.imageUrl3]
                              .filter(Boolean)
                              .map((url, idx) => (
                                <img
                                  key={idx}
                                  src={url}
                                  alt={`${provider.facilityName} - Image ${idx + 1}`}
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                              ))}
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Description</h4>
                            <p className="text-gray-600">{provider.description}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Address</h4>
                            <p className="text-gray-600">
                              {provider.streetAddress}<br />
                              {provider.city}, {provider.state} {provider.zipCode}
                            </p>
                          </div>

                          {provider.lifestyleAmenities && (
                            <div>
                              <h4 className="font-semibold mb-2">Lifestyle Amenities</h4>
                              <div className="flex flex-wrap gap-1">
                                {parseServices(provider.lifestyleAmenities).map((amenity, idx) => (
                                  <Badge key={idx} variant="outline">{amenity}</Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {provider.callToActionText && (
                            <div className="bg-brand-off-white p-4 rounded-lg">
                              <p className="text-center font-medium">{provider.callToActionText}</p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No providers found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Video Tour Modal */}
      {selectedProvider && (
        <VideoTourModal provider={selectedProvider} />
      )}
    </div>
  );
};

export default SubscribedProvidersDirectory;
