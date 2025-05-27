
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useApi } from '@/hooks/useApi';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const { execute: handleSignIn, loading } = useApi(signIn, {
    showSuccessToast: true,
    successMessage: 'Welcome back!'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await handleSignIn(email, password);
    if (result !== null) {
      // Redirect based on user type
      const redirectMap: Record<string, string> = {
        family: '/family',
        healthcare: '/healthcare',
        agent: '/agent',
        facility: '/facility'
      };
      
      navigate(redirectMap[userType] || '/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-text-dark-gray">
                Welcome Back
              </CardTitle>
              <CardDescription>
                Sign in to access your CareConnect portal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="userType">Portal Type</Label>
                  <Select value={userType} onValueChange={setUserType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your portal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="family">Family/Client Portal</SelectItem>
                      <SelectItem value="healthcare">Healthcare Professional Portal</SelectItem>
                      <SelectItem value="agent">Placement Agent Portal</SelectItem>
                      <SelectItem value="facility">Facility Portal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                      className="h-4 w-4 text-primary-red"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                      Remember me
                    </label>
                  </div>
                  <Link to="#" className="text-sm text-primary-sky hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary-red hover:bg-red-600"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary-sky hover:underline font-medium">
                    Sign up for free
                  </Link>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">Or continue with</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" type="button" disabled={loading}>
                      Google
                    </Button>
                    <Button variant="outline" type="button" disabled={loading}>
                      Microsoft
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
