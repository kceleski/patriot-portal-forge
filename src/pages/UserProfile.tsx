import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useApi } from '@/hooks/useApi';
import { ApiService } from '@/services/apiService';
import { User, Settings, Bell, Shield, Edit3, Save, X, Phone, Mail } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { profile, updateUserProfile } = useAuth();
  const { settings, updateSettings } = useAccessibility();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: ''
  });

  const { execute: handleUpdateProfile, loading } = useApi(updateUserProfile, {
      showSuccessToast: true,
      successMessage: "Your profile has been updated!"
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone: profile.phone || '',
      });
    }
  }, [profile]);

  const handleSaveChanges = async () => {
    await handleUpdateProfile(formData);
    setIsEditing(false);
  };

  const capitalize = (s: string) => s && s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Profile & Settings</h1>
        <p className="text-lg text-text-secondary mt-1">Manage your personal information and application preferences.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1.5">
                    <CardTitle className="flex items-center"><User className="w-5 h-5 mr-2" /> Personal Information</CardTitle>
                    <CardDescription>View and edit your personal details.</CardDescription>
                </div>
                <Button onClick={() => setIsEditing(!isEditing)} variant="outline" size="sm">
                    {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                    {isEditing ? 'Cancel' : 'Edit'}
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1"><Label htmlFor="first_name">First Name</Label><Input id="first_name" value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} disabled={!isEditing} /></div>
                    <div className="space-y-1"><Label htmlFor="last_name">Last Name</Label><Input id="last_name" value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} disabled={!isEditing} /></div>
                    <div className="space-y-1"><Label htmlFor="email">Email Address</Label><Input id="email" value={profile?.email || ''} disabled /></div>
                    <div className="space-y-1"><Label htmlFor="phone">Phone Number</Label><Input id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} disabled={!isEditing} /></div>
                    <div className="space-y-1"><Label>Account Type</Label><div className="pt-2"><Badge variant="secondary">{capitalize(profile?.user_type || '')}</Badge></div></div>
                    <div className="space-y-1"><Label>Subscription Tier</Label><div className="pt-2"><Badge variant="outline" className="border-brand-gold text-brand-gold">{capitalize(profile?.subscription_tier || '')}</Badge></div></div>
                </div>
                {isEditing && (
                    <div className="flex justify-end pt-4 border-t mt-6">
                        <Button onClick={handleSaveChanges} disabled={loading}>
                            <Save className="w-4 h-4 mr-2" />
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                )}
            </CardContent>
          </Card>
          {/* Add other cards for Accessibility and Notifications here */}
        </div>

        <div className="space-y-6">
           {/* Conditionally render the agent card only for family/client users */}
           {profile?.user_type === 'family' && (
                <Card>
                    <CardHeader><CardTitle>Your Placement Agent</CardTitle></CardHeader>
                    <CardContent className="space-y-3 text-center">
                        <div className="w-16 h-16 bg-brand-sky rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-white font-bold text-xl">SC</span>
                        </div>
                        <h3 className="font-semibold text-gray-900">Sarah Chen</h3>
                        <p className="text-sm text-gray-600">Senior Living Specialist</p>
                        <Button variant="outline" className="w-full"><Phone className="w-4 h-4 mr-2" /> Call Agent</Button>
                        <Button variant="outline" className="w-full"><Mail className="w-4 h-4 mr-2" /> Send Message</Button>
                    </CardContent>
                </Card>
           )}
           <Card>
            <CardHeader><CardTitle className="flex items-center"><Shield className="w-5 h-5 mr-2" /> Account Security</CardTitle></CardHeader>
            <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">Change Password</Button>
                <Button variant="outline" className="w-full">Enable Two-Factor Auth</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
