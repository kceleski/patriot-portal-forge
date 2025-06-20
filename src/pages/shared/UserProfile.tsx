
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { ApiService } from '@/services/apiService';
import { Loader2 } from 'lucide-react';

interface UserProfileData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  user_type: string;
  subscription_tier: string;
  organization?: string;
}

const UserProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formValues, setFormValues] = useState<Partial<UserProfileData>>({});

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await ApiService.getUserProfile();
        const typedData: UserProfileData = {
          id: data.id,
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          phone: data.phone || '',
          user_type: data.user_type || 'family',
          subscription_tier: data.subscription_tier || 'essentials',
          organization: data.organization || ''
        };
        setProfileData(typedData);
        setFormValues(typedData);
      } catch (error: any) {
        console.error('Profile fetch error:', error);
        toast({
          title: 'Error',
          description: error.message || 'Failed to load profile',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedData = await ApiService.updateUserProfile(formValues);
      const typedData: UserProfileData = {
        id: updatedData.id,
        first_name: updatedData.first_name || '',
        last_name: updatedData.last_name || '',
        email: updatedData.email || '',
        phone: updatedData.phone || '',
        user_type: updatedData.user_type || 'family',
        subscription_tier: updatedData.subscription_tier || 'essentials',
        organization: updatedData.organization || ''
      };
      setProfileData(typedData);
      toast({
        title: 'Success',
        description: 'Profile updated successfully'
      });
      setEditing(false);
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto py-10">
        <Card className="w-full max-w-2xl mx-auto">
          <CardContent className="p-6">
            <p className="text-center text-gray-600">Please log in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">User Profile</CardTitle>
          <CardDescription>View and manage your profile information here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading profile...
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="first_name"
                    value={formValues.first_name || ''}
                    onChange={handleInputChange}
                    disabled={!editing}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="last_name"
                    value={formValues.last_name || ''}
                    onChange={handleInputChange}
                    disabled={!editing}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formValues.email || ''}
                  onChange={handleInputChange}
                  disabled={!editing}
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formValues.phone || ''}
                  onChange={handleInputChange}
                  disabled={!editing}
                />
              </div>

              <div>
                <Label htmlFor="userType">User Type</Label>
                <Select
                  value={formValues.user_type || ''}
                  onValueChange={(value) => handleSelectChange('user_type', value)}
                  disabled={!editing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="family">Family</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="facility">Facility</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subscriptionTier">Subscription Tier</Label>
                <Select
                  value={formValues.subscription_tier || ''}
                  onValueChange={(value) => handleSelectChange('subscription_tier', value)}
                  disabled={!editing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subscription tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="essentials">Essentials</SelectItem>
                    <SelectItem value="elevate">Elevate</SelectItem>
                    <SelectItem value="pinnacle">Pinnacle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formValues.user_type === 'facility' && (
                <div>
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    name="organization"
                    value={formValues.organization || ''}
                    onChange={handleInputChange}
                    disabled={!editing}
                  />
                </div>
              )}

              <div className="flex justify-end">
                {editing ? (
                  <div className="space-x-2">
                    <Button onClick={handleSave} disabled={loading}>
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save'}
                    </Button>
                    <Button variant="outline" onClick={() => {
                      setEditing(false);
                      setFormValues(profileData || {});
                    }} disabled={loading}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setEditing(true)}>Edit Profile</Button>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
