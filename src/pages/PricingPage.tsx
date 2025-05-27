
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingPage = () => {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'For families getting started',
      features: [
        'Basic facility search',
        'Contact information access',
        'Basic messaging',
        'Community support'
      ]
    },
    {
      name: 'Essentials',
      price: '$29/month',
      description: 'For placement agents',
      features: [
        'Advanced CRM tools',
        'Email templates',
        'Client management',
        'Performance tracking',
        'Commission tracking'
      ]
    },
    {
      name: 'Elevate',
      price: '$79/month',
      description: 'For healthcare professionals',
      features: [
        'Video conferencing',
        'Advanced calendar',
        'Referral management',
        'Invoicing tools',
        'Client tracking',
        'Priority support'
      ]
    },
    {
      name: 'Pinnacle',
      price: '$149/month',
      description: 'For facilities and enterprises',
      features: [
        'Listing management',
        'Advanced analytics',
        'Webinar hosting',
        'Placement specialist tools',
        'Custom integrations',
        'Dedicated support'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-text-dark-gray mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={plan.name} className={`relative ${index === 2 ? 'border-primary-sky border-2' : ''}`}>
              {index === 2 && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-sky text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="text-3xl font-bold text-primary-navy mt-4">
                  {plan.price}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register">
                  <Button className={`w-full ${index === 2 ? 'bg-primary-sky hover:bg-blue-600' : 'bg-primary-navy hover:bg-blue-900'}`}>
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
