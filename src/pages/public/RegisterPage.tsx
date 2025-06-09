
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useApi } from '@/hooks/useApi';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    organization: '',
    phone: '',
    agreeToTerms: false
  });

  const navigate = useNavigate();
  const { signUp } = useAuth();

  const { execute: handleSignUp, loading } = useApi(signUp, {
    showSuccessToast: true,
    successMessage: 'Account created successfully! Please check your email.'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return;
    }

    const userData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      user_type: formData.userType,
      organization: formData.organization,
      phone: formData.phone,
      subscription_tier: 'essentials' // Default tier
    };

    const result = await handleSignUp(formData.email, formData.password, userData);
    if (result !== null) {
      navigate('/login');
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-text-primary">
                Create Your Account
              </CardTitle>
              <CardDescription>
                Join HealthProAssist and start your 14-day free trial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="userType">Account Type</Label>
                  <Select value={formData.userType} onValueChange={(value) => handleInputChange('userType', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="family">Family/Client</SelectItem>
                      <SelectItem value="healthcare">Healthcare Professional</SelectItem>
                      <SelectItem value="agent">Placement Agent</SelectItem>
                      <SelectItem value="facility">Facility Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(formData.userType === 'healthcare' || formData.userType === 'agent' || formData.userType === 'facility') && (
                  <div>
                    <Label htmlFor="organization">Organization/Company</Label>
                    <Input
                      id="organization"
                      placeholder="Your organization name"
                      value={formData.organization}
                      onChange={(e) => handleInputChange('organization', e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeToTerms', !!checked)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{' '}
                    <Link to="#" className="text-brand-sky hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="#" className="text-brand-sky hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-brand-red hover:bg-red-600"
                  size="lg"
                  disabled={!formData.agreeToTerms || loading || formData.password !== formData.confirmPassword}
                >
                  {loading ? 'Creating Account...' : 'Start Your Free Trial'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-brand-sky hover:underline font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
