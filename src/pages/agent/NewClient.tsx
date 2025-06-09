
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { UserPlus, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NewClient = () => {
  const navigate = useNavigate();
  const [clientData, setClientData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    careNeeds: [] as string[],
    budget: '',
    preferredLocation: '',
    notes: '',
    referralSource: ''
  });

  const careNeedsOptions = [
    'Assisted Living',
    'Memory Care',
    'Skilled Nursing',
    'Independent Living',
    'Respite Care',
    'Hospice Care'
  ];

  const handleCareNeedChange = (careNeed: string, checked: boolean) => {
    if (checked) {
      setClientData(prev => ({
        ...prev,
        careNeeds: [...prev.careNeeds, careNeed]
      }));
    } else {
      setClientData(prev => ({
        ...prev,
        careNeeds: prev.careNeeds.filter(need => need !== careNeed)
      }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setClientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving client:', clientData);
    // Here you would typically save to your database
    navigate('/dashboard/agent/clients');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/dashboard/agent')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-brand-navy">Add New Client</h1>
              <p className="text-gray-600 text-lg">Create a comprehensive client profile</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={clientData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={clientData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={clientData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={clientData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={clientData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={clientData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="emergencyContact">Contact Name</Label>
                  <Input
                    id="emergencyContact"
                    value={clientData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="emergencyPhone">Contact Phone</Label>
                  <Input
                    id="emergencyPhone"
                    value={clientData.emergencyPhone}
                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="referralSource">Referral Source</Label>
                  <Select value={clientData.referralSource} onValueChange={(value) => handleInputChange('referralSource', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select referral source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="physician">Physician</SelectItem>
                      <SelectItem value="hospital">Hospital</SelectItem>
                      <SelectItem value="family">Family/Friend</SelectItem>
                      <SelectItem value="online">Online Search</SelectItem>
                      <SelectItem value="advertisement">Advertisement</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Care Needs */}
            <Card>
              <CardHeader>
                <CardTitle>Care Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Care Needs</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {careNeedsOptions.map((careNeed) => (
                      <div key={careNeed} className="flex items-center space-x-2">
                        <Checkbox
                          id={careNeed}
                          checked={clientData.careNeeds.includes(careNeed)}
                          onCheckedChange={(checked) => handleCareNeedChange(careNeed, checked as boolean)}
                        />
                        <Label htmlFor={careNeed} className="text-sm">{careNeed}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select value={clientData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2000-3500">$2,000 - $3,500</SelectItem>
                      <SelectItem value="3500-5000">$3,500 - $5,000</SelectItem>
                      <SelectItem value="5000-7500">$5,000 - $7,500</SelectItem>
                      <SelectItem value="7500+">$7,500+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="preferredLocation">Preferred Location</Label>
                  <Input
                    id="preferredLocation"
                    value={clientData.preferredLocation}
                    onChange={(e) => handleInputChange('preferredLocation', e.target.value)}
                    placeholder="e.g., Los Angeles, CA"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={clientData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={8}
                  placeholder="Additional information about the client's needs, preferences, medical conditions, etc."
                />
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate('/dashboard/agent')}>
              Cancel
            </Button>
            <Button type="submit" className="bg-brand-sky hover:bg-blue-600">
              <Save className="h-4 w-4 mr-2" />
              Save Client
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewClient;
