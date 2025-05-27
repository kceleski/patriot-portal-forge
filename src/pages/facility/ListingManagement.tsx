
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Edit, Eye, Plus, Save, Image, MapPin, DollarSign } from 'lucide-react';

const ListingManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const facilityInfo = {
    name: 'Sunrise Senior Living - Beverly Hills',
    type: 'Assisted Living',
    address: '123 Sunset Blvd, Beverly Hills, CA 90210',
    phone: '(555) 123-4567',
    website: 'www.sunriseseniorliving.com',
    capacity: 150,
    occupied: 132,
    priceRange: '$4,500 - $6,200/mo',
    description: 'Luxury assisted living community offering personalized care plans, resort-style amenities, and 24/7 professional staff support in the heart of Beverly Hills.',
    amenities: [
      '24/7 Nursing Care', 'Memory Care Unit', 'Fine Dining Restaurant', 
      'Fitness Center', 'Library', 'Garden Courtyard', 'Transportation Service',
      'Beauty Salon', 'Activity Programs', 'Pet-Friendly'
    ],
    services: [
      'Medication Management', 'Personal Care Assistance', 'Housekeeping',
      'Laundry Service', 'Meal Preparation', 'Health Monitoring',
      'Social Activities', 'Physical Therapy'
    ]
  };

  const careTypes = [
    { name: 'Independent Living', available: true, beds: 45, price: '$3,500-$4,200' },
    { name: 'Assisted Living', available: true, beds: 85, price: '$4,500-$6,200' },
    { name: 'Memory Care', available: true, beds: 20, price: '$6,800-$8,500' },
    { name: 'Skilled Nursing', available: false, beds: 0, price: 'N/A' }
  ];

  const photos = [
    { id: 1, title: 'Main Lobby', category: 'Interior', src: 'photo-1649972904349-6e44c42644a7' },
    { id: 2, title: 'Dining Room', category: 'Interior', src: 'photo-1488590528505-98d2b5aba04b' },
    { id: 3, title: 'Garden Courtyard', category: 'Exterior', src: 'photo-1518770660439-4636190af475' },
    { id: 4, title: 'Resident Room', category: 'Interior', src: 'photo-1461749280684-dccba630e2f6' }
  ];

  const listings = [
    {
      platform: 'CareConnect Network',
      status: 'Active',
      views: 1245,
      inquiries: 28,
      lastUpdated: '2024-12-10'
    },
    {
      platform: 'Senior Living Directory',
      status: 'Active',
      views: 892,
      inquiries: 15,
      lastUpdated: '2024-12-08'
    },
    {
      platform: 'A Place for Mom',
      status: 'Pending Review',
      views: 0,
      inquiries: 0,
      lastUpdated: '2024-12-12'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">Listing Management</h1>
          <p className="text-gray-600 mt-2">Manage your facility listings across multiple platforms and directories.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            Preview Listing
          </Button>
          <Button className="bg-primary-red hover:bg-red-600">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Facility Overview
              </CardTitle>
              <CardDescription>Basic information and current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-dark-gray mb-2">
                      Facility Name
                    </label>
                    <Input value={facilityInfo.name} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-dark-gray mb-2">
                      Care Type
                    </label>
                    <Input value={facilityInfo.type} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-dark-gray mb-2">
                      Address
                    </label>
                    <Input value={facilityInfo.address} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-dark-gray mb-2">
                      Phone Number
                    </label>
                    <Input value={facilityInfo.phone} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-dark-gray mb-2">
                      Website
                    </label>
                    <Input value={facilityInfo.website} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-dark-gray mb-2">
                      Total Capacity
                    </label>
                    <Input value={facilityInfo.capacity} type="number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-dark-gray mb-2">
                      Current Occupancy
                    </label>
                    <Input value={facilityInfo.occupied} type="number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-dark-gray mb-2">
                      Price Range (Monthly)
                    </label>
                    <Input value={facilityInfo.priceRange} />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-text-dark-gray mb-2">
                  Facility Description
                </label>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={4}
                  value={facilityInfo.description}
                />
              </div>
            </CardContent>
          </Card>

          {/* Care Types Available */}
          <Card>
            <CardHeader>
              <CardTitle>Available Care Types</CardTitle>
              <CardDescription>Configure the types of care your facility provides</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {careTypes.map((care, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-text-dark-gray">{care.name}</h4>
                      <Badge className={care.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {care.available ? 'Available' : 'Not Available'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Beds:</span>
                        <span className="font-medium ml-2">{care.beds}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium ml-2">{care.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="amenities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Amenities & Services</CardTitle>
              <CardDescription>Highlight your facility's amenities and services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-text-dark-gray mb-4">Amenities</h4>
                  <div className="space-y-2">
                    {facilityInfo.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Amenity
                  </Button>
                </div>

                <div>
                  <h4 className="font-semibold text-text-dark-gray mb-4">Services</h4>
                  <div className="space-y-2">
                    {facilityInfo.services.map((service, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Image className="h-5 w-5 mr-2" />
                Photo Gallery
              </CardTitle>
              <CardDescription>Manage your facility photos and virtual tour content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {photos.map((photo) => (
                  <div key={photo.id} className="border rounded-lg overflow-hidden">
                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                      <Image className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm">{photo.title}</h4>
                      <p className="text-xs text-gray-600">{photo.category}</p>
                      <div className="flex space-x-2 mt-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="bg-primary-sky hover:bg-blue-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Photos
                </Button>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Virtual Tour
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Listing Platforms</CardTitle>
              <CardDescription>Manage your listings across different platforms and directories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {listings.map((listing, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold text-text-dark-gray">{listing.platform}</h4>
                      <p className="text-sm text-gray-600">Last updated: {listing.lastUpdated}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary-sky">{listing.views}</div>
                        <div className="text-xs text-gray-600">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-accent-gold">{listing.inquiries}</div>
                        <div className="text-xs text-gray-600">Inquiries</div>
                      </div>
                      <Badge className={
                        listing.status === 'Active' ? 'bg-green-100 text-green-800' :
                        listing.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {listing.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-secondary-off-white rounded-lg">
                <h4 className="font-semibold text-text-dark-gray mb-2">Add New Platform</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Expand your reach by adding your facility to additional listing platforms.
                </p>
                <Button className="bg-primary-red hover:bg-red-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Platform
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ListingManagement;
