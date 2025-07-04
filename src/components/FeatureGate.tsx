
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureGateProps {
  feature?: string;
  requiredUserType?: string;
  requiredTier?: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const FeatureGate: React.FC<FeatureGateProps> = ({ 
  feature, 
  requiredUserType, 
  requiredTier, 
  children, 
  fallback 
}) => {
  const { hasFeatureAccess, profile } = useAuth();

  // Check feature access if feature is provided
  if (feature && !hasFeatureAccess(feature)) {
    return fallback ? <>{fallback}</> : <DefaultFallback />;
  }

  // Check user type if requiredUserType is provided
  if (requiredUserType && profile?.user_type !== requiredUserType) {
    return fallback ? <>{fallback}</> : <DefaultFallback />;
  }

  // Check subscription tier if requiredTier is provided
  if (requiredTier && profile?.subscription_tier) {
    const userTier = profile.subscription_tier.toLowerCase();
    const allowedTiers = requiredTier.map(tier => tier.toLowerCase());
    
    if (!allowedTiers.includes(userTier)) {
      return fallback ? <>{fallback}</> : <DefaultFallback />;
    }
  }

  return <>{children}</>;
};

const DefaultFallback = () => {
  const { profile } = useAuth();
  
  return (
    <Card className="border-dashed border-2 border-gray-300">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Lock className="h-6 w-6 text-gray-400" />
        </div>
        <CardTitle className="text-lg">Premium Feature</CardTitle>
        <CardDescription>
          This feature requires a {profile?.user_type === 'healthcare' ? 'Elevate or Pinnacle' : 
                                   profile?.user_type === 'agent' ? 'Elevate' : 
                                   'higher'} subscription tier.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button asChild className="bg-primary-red hover:bg-red-600">
          <Link to="/pricing">
            Upgrade Your Plan
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureGate;
