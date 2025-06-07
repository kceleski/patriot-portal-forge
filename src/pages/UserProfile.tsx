
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
import { User, Settings, Bell, Shield, Edit3, Save, X, Phone, Mail } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { profile, updateProfile } = useAuth();
  const { settings, updateSettings } = useAccessibility();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    organization: ''
  });

  const { execute: handleUpdateProfile, loading } = useApi(updateProfile, {
      showSuccessToast: true,
      successMessage: "Your profile has been updated!"
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        organization: profile.organization || '',
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
        <h1 className="text-h1 font-heading text-text-primary">Profile & Settings</h1>
        <p className="text-body-large text-text-secondary mt-1">Manage your personal information and application preferences.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-background-card border-ui-border">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1.5">
                    <CardTitle className="flex items-center text-text-primary">
                      <User className="w-5 h-5 mr-2" /> 
                      Personal Information
                    </CardTitle>
                    <CardDescription className="text-text-secondary">
                      View and edit your personal details.
                    </CardDescription>
                </div>
                <Button 
                  onClick={() => setIsEditing(!isEditing)} 
                  variant="outline" 
                  size="sm"
                  className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
                >
                    {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                    {isEditing ? 'Cancel' : 'Edit'}
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <Label htmlFor="first_name" className="text-text-primary">First Name</Label>
                      <Input 
                        id="first_name" 
                        value={formData.first_name} 
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} 
                        disabled={!isEditing}
                        className="bg-white border-ui-border text-text-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="last_name" className="text-text-primary">Last Name</Label>
                      <Input 
                        id="last_name" 
                        value={formData.last_name} 
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} 
                        disabled={!isEditing}
                        className="bg-white border-ui-border text-text-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email" className="text-text-primary">Email Address</Label>
                      <Input 
                        id="email" 
                        value={profile?.email || ''} 
                        disabled 
                        className="bg-gray-50 border-ui-border text-text-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="organization" className="text-text-primary">Organization</Label>
                      <Input 
                        id="organization" 
                        value={formData.organization} 
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })} 
                        disabled={!isEditing}
                        className="bg-white border-ui-border text-text-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-text-primary">Account Type</Label>
                      <div className="pt-2">
                        <Badge variant="secondary" className="bg-brand-sky text-white">
                          {capitalize(profile?.user_type || '')}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-text-primary">Subscription Tier</Label>
                      <div className="pt-2">
                        <Badge variant="outline" className="border-brand-gold text-brand-gold">
                          {capitalize(profile?.subscription_tier || '')}
                        </Badge>
                      </div>
                    </div>
                </div>
                {isEditing && (
                    <div className="flex justify-end pt-4 border-t border-ui-border mt-6">
                        <Button 
                          onClick={handleSaveChanges} 
                          disabled={loading}
                          className="bg-brand-red hover:bg-brand-red/90 text-white"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                )}
            </CardContent>
          </Card>

          <Card className="bg-background-card border-ui-border">
            <CardHeader>
              <CardTitle className="flex items-center text-text-primary">
                <Settings className="w-5 h-5 mr-2" />
                Accessibility Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-text-primary">Voice Assistance</Label>
                  <p className="text-text-secondary text-sm">Enable voice features and assistance</p>
                </div>
                <Switch
                  checked={settings.voiceEnabled}
                  onCheckedChange={(checked) => updateSettings({ voiceEnabled: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-text-primary">High Contrast</Label>
                  <p className="text-text-secondary text-sm">Increase contrast for better visibility</p>
                </div>
                <Switch
                  checked={settings.highContrast}
                  onCheckedChange={(checked) => updateSettings({ highContrast: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-text-primary">Reduce Motion</Label>
                  <p className="text-text-secondary text-sm">Minimize animations and transitions</p>
                </div>
                <Switch
                  checked={settings.reduceMotion}
                  onCheckedChange={(checked) => updateSettings({ reduceMotion: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {profile?.user_type === 'family' && (
            <Card className="bg-background-card border-ui-border">
              <CardHeader>
                <CardTitle className="text-text-primary">Your Placement Agent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-center">
                <div className="w-16 h-16 bg-brand-sky rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">SC</span>
                </div>
                <h3 className="font-semibold text-text-primary">Sarah Chen</h3>
                <p className="text-sm text-text-secondary">Senior Living Specialist</p>
                <Button variant="outline" className="w-full border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white">
                  <Phone className="w-4 h-4 mr-2" /> Call Agent
                </Button>
                <Button variant="outline" className="w-full border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white">
                  <Mail className="w-4 h-4 mr-2" /> Send Message
                </Button>
              </CardContent>
            </Card>
          )}
          
          <Card className="bg-background-card border-ui-border">
            <CardHeader>
              <CardTitle className="flex items-center text-text-primary">
                <Shield className="w-5 h-5 mr-2" /> 
                Account Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white">
                Change Password
              </Button>
              <Button variant="outline" className="w-full border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white">
                Enable Two-Factor Auth
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
