
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, Stethoscope, Heart, ArrowRight, CheckCircle, Star } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const handlePortalClick = (portalType: string) => {
    // For now, direct users to the login page
    // In a real app, this would check authentication status
    navigate(`/login?portal=${portalType}`);
  };

  const portals = [
    {
      type: 'family',
      title: 'Family Portal',
      description: 'Find the perfect care solution for your loved ones with our comprehensive search and matching tools.',
      icon: Heart,
      features: ['Advanced search filters', 'Personalized recommendations', 'Care coordinator support', 'Virtual consultations'],
      color: 'bg-red-50 border-red-200 hover:bg-red-100'
    },
    {
      type: 'healthcare',
      title: 'Healthcare Portal',
      description: 'Connect with families and streamline your referral process with powerful tools and insights.',
      icon: Stethoscope,
      features: ['Patient referral management', 'Care coordination tools', 'Professional networking', 'Outcome tracking'],
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      type: 'agent',
      title: 'Agent Portal',
      description: 'Grow your business with comprehensive CRM tools, client management, and performance analytics.',
      icon: Users,
      features: ['Client relationship management', 'Lead tracking & conversion', 'Performance analytics', 'Commission management'],
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      type: 'facility',
      title: 'Facility Portal',
      description: 'Showcase your services and connect with potential residents through our platform.',
      icon: Building2,
      features: ['Listing management', 'Inquiry tracking', 'Virtual tours', 'Marketing analytics'],
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-brand-off-white to-white">
      {/* Hero Section */}
      <section className="hero-enhanced relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-brand-navy mb-6 font-heading leading-tight">
              Connecting Care, 
              <span className="text-brand-red"> Empowering Lives</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              The comprehensive platform that brings together families, healthcare professionals, agents, and care facilities to create meaningful connections and better outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/find-care">
                <Button size="lg" className="btn-primary text-lg px-8 py-4 focus-enhanced">
                  Start Your Care Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="btn-outline text-lg px-8 py-4 focus-enhanced">
                  View Pricing Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-sky rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-red rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Portals Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4 font-heading">
              Choose Your Portal
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access specialized tools and features designed for your specific role in the care ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {portals.map((portal) => (
              <Card 
                key={portal.type} 
                className={`${portal.color} border-2 transition-all duration-300 hover:shadow-lg cursor-pointer transform hover:-translate-y-1`}
                onClick={() => handlePortalClick(portal.type)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <portal.icon className="h-8 w-8 text-brand-navy" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-brand-navy font-heading">
                        {portal.title}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-gray-700 text-lg leading-relaxed">
                    {portal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {portal.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full btn-primary focus-enhanced"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePortalClick(portal.type);
                    }}
                  >
                    Access {portal.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4 font-heading">
              Why Choose HealthProAssist?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform delivers exceptional value through innovation, reliability, and personalized service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-brand-navy p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4 font-heading">Expert Matching</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI-powered matching system connects you with the most suitable care options based on your specific needs and preferences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-sky p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4 font-heading">Verified Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                All facilities and professionals on our platform are thoroughly vetted to ensure the highest standards of care and service.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-red p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4 font-heading">Compassionate Care</h3>
              <p className="text-gray-600 leading-relaxed">
                We understand that care decisions are deeply personal. Our team provides empathetic support throughout your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Join thousands of families, healthcare professionals, and care providers who trust HealthProAssist
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-brand-red hover:bg-red-600 text-white text-lg px-8 py-4 focus-enhanced">
                Create Your Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/find-care">
              <Button variant="outline" size="lg" className="border-white text-navy hover:bg-white hover:text-brand-navy text-lg px-8 py-4 focus-enhanced">
                Explore Care Options
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
