
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Save, X, MapPin, Star, Users, Bed } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Listing {
  id: string;
  name: string;
  description: string;
  address: string;
  careType: string;
  capacity: number;
  occupancy: number;
  amenities: string[];
  pricing: {
    base: number;
    memory_care: number;
    assisted_living: number;
  };
  rating: number;
  status: 'active' | 'inactive' | 'pending';
  images: string[];
}

const ListingManagement = () => {
  const { toast } = useToast();
  const [listings, setListings] = useState<Listing[]>([
    {
      id: '1',
      name: 'Sunrise Senior Living',
      description: 'A warm, welcoming community providing comprehensive care services.',
      address: '123 Memory Lane, Phoenix, AZ 85001',
      careType: 'Memory Care',
      capacity: 80,
      occupancy: 72,
      amenities: ['24/7 Nursing', 'Physical Therapy', 'Garden Patio', 'Pet Friendly'],
      pricing: { base: 3500, memory_care: 4200, assisted_living: 3800 },
      rating: 4.8,
      status: 'active',
      images: []
    }
  ]);

  const [editingListing, setEditingListing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Listing>>({
    name: '',
    description: '',
    address: '',
    careType: '',
    capacity: 0,
    occupancy: 0,
    amenities: [],
    pricing: { base: 0, memory_care: 0, assisted_living: 0 },
    rating: 0,
    status: 'active',
    images: []
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAmenity, setNewAmenity] = useState('');

  const handleInputChange = (field: keyof Listing, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePricingChange = (field: keyof Listing['pricing'], value: number) => {
    setFormData(prev => ({
      ...prev,
      pricing: { ...prev.pricing, [field]: value }
    }));
  };

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setFormData(prev => ({
        ...prev,
        amenities: [...(prev.amenities || []), newAmenity.trim()]
      }));
      setNewAmenity('');
    }
  };

  const removeAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities?.filter(a => a !== amenity) || []
    }));
  };

  const startEdit = (listing: Listing) => {
    setEditingListing(listing.id);
    setFormData(listing);
  };

  const cancelEdit = () => {
    setEditingListing(null);
    setFormData({
      name: '',
      description: '',
      address: '',
      careType: '',
      capacity: 0,
      occupancy: 0,
      amenities: [],
      pricing: { base: 0, memory_care: 0, assisted_living: 0 },
      rating: 0,
      status: 'active',
      images: []
    });
    setShowAddForm(false);
  };

  const saveListing = () => {
    if (editingListing) {
      setListings(prev => prev.map(listing => 
        listing.id === editingListing 
          ? { ...listing, ...formData } as Listing
          : listing
      ));
      toast({
        title: 'Success',
        description: 'Listing updated successfully'
      });
    } else {
      const newListing: Listing = {
        ...formData,
        id: Date.now().toString(),
        amenities: formData.amenities || [],
        pricing: formData.pricing || { base: 0, memory_care: 0, assisted_living: 0 }
      } as Listing;
      
      setListings(prev => [...prev, newListing]);
      toast({
        title: 'Success',
        description: 'New listing created successfully'
      });
    }
    cancelEdit();
  };

  const deleteListing = (id: string) => {
    setListings(prev => prev.filter(listing => listing.id !== id));
    toast({
      title: 'Success',
      description: 'Listing deleted successfully'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy">Listing Management</h1>
          <p className="text-gray-600 mt-2">Manage your facility listings and availability</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Listing
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingListing) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingListing ? 'Edit Listing' : 'Add New Listing'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Listing Name</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter listing name"
                />
              </div>
              <div>
                <Label htmlFor="careType">Care Type</Label>
                <Select value={formData.careType || ''} onValueChange={(value) => handleInputChange('careType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select care type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Memory Care">Memory Care</SelectItem>
                    <SelectItem value="Assisted Living">Assisted Living</SelectItem>
                    <SelectItem value="Independent Living">Independent Living</SelectItem>
                    <SelectItem value="Skilled Nursing">Skilled Nursing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter listing description"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter full address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="capacity">Total Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity || 0}
                  onChange={(e) => handleInputChange('capacity', parseInt(e.target.value) || 0)}
                  placeholder="Enter total capacity"
                />
              </div>
              <div>
                <Label htmlFor="occupancy">Current Occupancy</Label>
                <Input
                  id="occupancy"
                  type="number"
                  value={formData.occupancy || 0}
                  onChange={(e) => handleInputChange('occupancy', parseInt(e.target.value) || 0)}
                  placeholder="Enter current occupancy"
                />
              </div>
            </div>

            {/* Pricing Section */}
            <div className="space-y-2">
              <Label>Monthly Pricing</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="basePrice">Base Price</Label>
                  <Input
                    id="basePrice"
                    type="number"
                    value={formData.pricing?.base || 0}
                    onChange={(e) => handlePricingChange('base', parseInt(e.target.value) || 0)}
                    placeholder="Base price"
                  />
                </div>
                <div>
                  <Label htmlFor="memoryPrice">Memory Care</Label>
                  <Input
                    id="memoryPrice"
                    type="number"
                    value={formData.pricing?.memory_care || 0}
                    onChange={(e) => handlePricingChange('memory_care', parseInt(e.target.value) || 0)}
                    placeholder="Memory care price"
                  />
                </div>
                <div>
                  <Label htmlFor="assistedPrice">Assisted Living</Label>
                  <Input
                    id="assistedPrice"
                    type="number"
                    value={formData.pricing?.assisted_living || 0}
                    onChange={(e) => handlePricingChange('assisted_living', parseInt(e.target.value) || 0)}
                    placeholder="Assisted living price"
                  />
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="space-y-2">
              <Label>Amenities</Label>
              <div className="flex gap-2">
                <Input
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  placeholder="Add amenity"
                  onKeyPress={(e) => e.key === 'Enter' && addAmenity()}
                />
                <Button type="button" onClick={addAmenity} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.amenities?.map((amenity, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeAmenity(amenity)}>
                    {amenity}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={saveListing} className="btn-primary">
                <Save className="h-4 w-4 mr-2" />
                Save Listing
              </Button>
              <Button onClick={cancelEdit} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Listings Grid */}
      <div className="grid gap-6">
        {listings.map((listing) => (
          <Card key={listing.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-brand-navy">{listing.name}</h3>
                    <Badge className={getStatusColor(listing.status)}>
                      {listing.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-2">{listing.description}</p>
                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{listing.address}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => startEdit(listing)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => deleteListing(listing.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    <span className="font-medium">{listing.occupancy}</span>
                    <span className="text-gray-500">/{listing.capacity}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">{listing.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{listing.careType}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">${listing.pricing.base.toLocaleString()}</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {listing.amenities.slice(0, 4).map((amenity, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
                {listing.amenities.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{listing.amenities.length - 4} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {listings.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-500">
              <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No listings yet</h3>
              <p className="text-sm mb-4">Create your first facility listing to get started</p>
              <Button onClick={() => setShowAddForm(true)} className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Listing
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ListingManagement;
