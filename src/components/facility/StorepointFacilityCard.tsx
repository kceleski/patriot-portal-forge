
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Globe, Star, Building } from 'lucide-react';

interface StorepointFacility {
  name: string;
  address: string;
  street: string;
  city: string;
  state: string;
  zip: number;
  phone: string;
  email: string;
  website: string;
  type: string;
  capacity: string;
  reviews: string;
  image_url: string;
  lat: string;
  lng: string;
}

interface StorepointFacilityCardProps {
  facility: StorepointFacility;
}

const StorepointFacilityCard: React.FC<StorepointFacilityCardProps> = ({ facility }) => {
  const handlePhoneClick = () => {
    if (facility.phone) {
      window.open(`tel:${facility.phone}`, '_self');
    }
  };

  const handleWebsiteClick = () => {
    if (facility.website) {
      window.open(facility.website, '_blank', 'noopener noreferrer');
    }
  };

  const handleEmailClick = () => {
    if (facility.email) {
      window.open(`mailto:${facility.email}`, '_self');
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden bg-white border-gray-200">
      {facility.image_url && (
        <div className="h-48 bg-gray-200 overflow-hidden">
          <img
            src={facility.image_url}
            alt={facility.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg text-brand-navy">{facility.name}</CardTitle>
          {facility.reviews && (
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-sm font-medium text-gray-700">{facility.reviews}</span>
            </div>
          )}
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          {facility.city}, {facility.state}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          {facility.type && (
            <Badge variant="outline" className="text-brand-sky border-brand-sky">
              {facility.type}
            </Badge>
          )}
          {facility.capacity && (
            <div className="text-sm text-gray-600">
              <Building className="h-4 w-4 inline mr-1" />
              Capacity: {facility.capacity}
            </div>
          )}
        </div>

        <div className="text-sm text-gray-700">
          <p className="font-medium">Address:</p>
          <p>{facility.street || facility.address}</p>
          <p>{facility.city}, {facility.state} {facility.zip}</p>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {facility.phone && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePhoneClick}
              className="justify-start"
            >
              <Phone className="h-4 w-4 mr-2" />
              {facility.phone}
            </Button>
          )}
          
          {facility.website && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleWebsiteClick}
              className="justify-start"
            >
              <Globe className="h-4 w-4 mr-2" />
              Visit Website
            </Button>
          )}
          
          {facility.email && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleEmailClick}
              className="justify-start"
            >
              <Phone className="h-4 w-4 mr-2" />
              Email
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StorepointFacilityCard;
