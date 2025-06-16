
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useApi } from '@/hooks/useApi';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn, profile } = useAuth();

  const { execute: handleSignIn, loading } = useApi(signIn, {
    showSuccessToast: true,
    successMessage: 'Welcome back!'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await handleSignIn(email, password);
    if (result !== null) {
      // Check for portal query param to redirect appropriately
      const portal = searchParams.get('portal');
      
      setTimeout(() => {
        const redirectMap: Record<string, string> = {
          family: '/dashboard/family',
          healthcare: '/dashboard/healthcare',
          agent: '/dashboard/agent',
          facility: '/dashboard/facility'
        };
        
        const userType = portal || profile?.user_type || 'family';
        navigate(redirectMap[userType] || '/dashboard/family');
      }, 100);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-text-primary font-heading">
                {showForgotPassword ? 'Reset Password' : 'Welcome Back'}
              </CardTitle>
              <CardDescription>
                {showForgotPassword 
                  ? 'Enter your email to receive reset instructions'
                  : 'Sign in to access your HealthProAssist portal'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showForgotPassword ? (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="reset-email">Email Address</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-red hover:bg-red-600"
                    size="lg"
                    onClick={() => console.log('Password reset functionality to be implemented')}
                  >
                    Send Reset Instructions
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowForgotPassword(false)}
                  >
                    Back to Sign In
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        className="h-4 w-4 text-brand-red"
                      />
                      <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                        Remember me
                      </label>
                    </div>
                    <button 
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-brand-sky hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-brand-red hover:bg-red-600"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              )}

              {!showForgotPassword && (
                <>
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{' '}
                      <Link to="/register" className="text-brand-sky hover:underline font-medium">
                        Sign up for free
                      </Link>
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-4">Or continue with</p>
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          variant="outline" 
                          type="button" 
                          disabled={loading}
                          onClick={() => console.log('Google auth to be implemented')}
                        >
                          Google
                        </Button>
                        <Button 
                          variant="outline" 
                          type="button" 
                          disabled={loading}
                          onClick={() => console.log('Microsoft auth to be implemented')}
                        >
                          Microsoft
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
