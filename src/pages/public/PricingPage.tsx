
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

const PricingPage = () => {
  const pricingData = {
    'Families/Clients': {
      tiers: [
        {
          name: 'Essentials',
          price: '$29',
          period: '/month',
          features: [
            'Basic facility search',
            'Secure messaging',
            'Care plan tracking',
            'Mobile app access',
            'Email support'
          ]
        },
        {
          name: 'Elevate',
          price: '$49',
          period: '/month',
          popular: true,
          features: [
            'Everything in Essentials',
            'Advanced search filters',
            'Priority support',
            'Placement agent access',
            'Document storage',
            'Progress reports'
          ]
        },
        {
          name: 'Pinnacle',
          price: '$79',
          period: '/month',
          features: [
            'Everything in Elevate',
            'Dedicated care coordinator',
            '24/7 phone support',
            'Custom care plans',
            'Family portal access',
            'Premium analytics'
          ]
        }
      ]
    },
    'Healthcare Professionals': {
      tiers: [
        {
          name: 'Essentials',
          price: '$299',
          period: '/month',
          features: [
            'Client management',
            'Basic referral tracking',
            'Facility directory access',
            'Standard reporting',
            'Email support'
          ]
        },
        {
          name: 'Elevate',
          price: '$499',
          period: '/month',
          popular: true,
          features: [
            'Everything in Essentials',
            'Advanced client tracking',
            'Automated referral management',
            'Invoicing tools',
            'Priority support',
            'Custom dashboards'
          ]
        },
        {
          name: 'Pinnacle',
          price: '$799',
          period: '/month',
          features: [
            'Everything in Elevate',
            'Unlimited client capacity',
            'Advanced analytics',
            'API access',
            'Dedicated account manager',
            'White-label options'
          ]
        }
      ]
    },
    'Placement Agents': {
      tiers: [
        {
          name: 'Essentials',
          price: '$99',
          period: '/month',
          features: [
            'Basic CRM functionality',
            'Contact management',
            'Email templates',
            'Task tracking',
            'Standard reporting'
          ]
        },
        {
          name: 'Elevate',
          price: '$179',
          period: '/month',
          popular: true,
          features: [
            'Everything in Essentials',
            'Advanced CRM features',
            'Automated workflows',
            'Performance dashboard',
            'Commission tracking',
            'Integration tools'
          ]
        },
        {
          name: 'Pinnacle',
          price: '$250',
          period: '/month',
          features: [
            'Everything in Elevate',
            'Unlimited contacts',
            'Advanced analytics',
            'Custom integrations',
            'Team collaboration tools',
            'Priority support'
          ]
        }
      ]
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-text-dark-gray mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible pricing for every type of user. All plans include a 30-day free trial.
          </p>
        </div>

        {Object.entries(pricingData).map(([userType, data]) => (
          <div key={userType} className="mb-20">
            <h2 className="text-3xl font-bold text-text-dark-gray text-center mb-12">
              {userType}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {data.tiers.map((tier, index) => (
                <Card 
                  key={tier.name} 
                  className={`relative ${
                    tier.popular 
                      ? 'border-2 border-primary-red shadow-xl scale-105' 
                      : 'border border-gray-200'
                  }`}
                >
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary-red text-white">
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl font-bold text-text-dark-gray">
                      {tier.name}
                    </CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-primary-red">
                        {tier.price}
                      </span>
                      <span className="text-gray-600 ml-1">
                        {tier.period}
                      </span>
                    </div>
                    <CardDescription className="mt-4">
                      <Badge variant="outline" className="text-accent-gold border-accent-gold">
                        30-Day Free Trial
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-4 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="h-5 w-5 text-primary-sky mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${
                        tier.popular 
                          ? 'bg-primary-red hover:bg-red-600' 
                          : 'bg-primary-navy hover:bg-blue-900'
                      }`}
                      size="lg"
                    >
                      Start Free Trial
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-text-dark-gray mb-8">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h4 className="font-semibold text-text-dark-gray mb-2">
                Can I switch plans anytime?
              </h4>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-text-dark-gray mb-2">
                What's included in the free trial?
              </h4>
              <p className="text-gray-600">
                Full access to all features of your chosen plan for 30 days. No credit card required.
              </p>
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-text-dark-gray mb-2">
                Do you offer discounts for annual billing?
              </h4>
              <p className="text-gray-600">
                Yes, save 20% when you choose annual billing for any plan tier.
              </p>
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-text-dark-gray mb-2">
                Is customer support included?
              </h4>
              <p className="text-gray-600">
                All plans include customer support. Higher tiers receive priority and phone support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
