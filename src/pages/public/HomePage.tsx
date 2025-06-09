import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, User, Building, Briefcase, ArrowRight, Shield, Zap, Heart, CheckCircle } from 'lucide-react';
import ElevenLabsWidget from '@/components/ElevenLabsWidget';
import TempLoginModal from '@/components/TempLoginModal';
import { useTempAuth } from '@/contexts/TempAuthContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [showWidget, setShowWidget] = useState(false);
  const [isTempLoginOpen, setIsTempLoginOpen] = useState(false);
  const { user } = useTempAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 500) {
        setShowWidget(true);
      } else {
        setShowWidget(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePortalAccess = (userType: string) => {
    if (user) {
      navigate(`/dashboard/${userType}`);
    } else {
      setIsTempLoginOpen(true);
    }
  };

  const handleTempLoginClose = () => {
    setIsTempLoginOpen(false);
    if (user) {
      navigate(`/dashboard/${user.userType}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="gradient-hero text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/90 via-brand-sky/80 to-brand-navy/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto animate-fade-in">
            <h1 className="text-6xl font-bold mb-8 leading-tight font-heading">
              Connecting Families with 
              <span className="bg-gradient-to-r from-brand-gold to-yellow-300 bg-clip-text text-white"> Quality Care Solutions</span>
            </h1>
            <p className="text-2xl mb-12 max-w-4xl mx-auto text-blue-100 leading-relaxed font-light">
              HealthProAssist simplifies the process of finding and managing care services for your loved ones.
              Whether you're a family, healthcare professional, placement agent, or facility, we have the innovative tools you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/find-care" className="group">
                <Button size="lg" className="btn-primary btn-enhanced px-10 py-6 text-xl shadow-xl hover:shadow-2xl focus-enhanced">
                  Find Care Now
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link to="/pricing" className="group">
                <Button size="lg" variant="outline" className="btn-outline px-10 py-6 text-xl border-2 border-white text-white hover:bg-white hover:text-brand-navy focus-enhanced">
                  View Pricing
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced User Portals Section */}
      <section className="py-24 bg-gradient-to-b from-background-main to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-5xl font-bold text-text-primary mb-6 font-heading">
              Choose Your Portal
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Access specialized tools designed for your specific needs with our innovative platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <Card className="card-interactive shadow-lg animate-scale-in">
              <CardHeader className="text-center p-8">
                <div className="bg-brand-red/10 rounded-full p-6 w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-brand-red mx-auto" />
                </div>
                <CardTitle className="text-contrast-high text-2xl font-bold mb-3 font-heading">Families & Clients</CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">Find and manage care services for your loved ones with ease</CardDescription>
              </CardHeader>
              <CardContent className="text-center p-8 pt-0">
                <Button 
                  onClick={() => handlePortalAccess('family')}
                  className="btn-primary btn-enhanced w-full text-lg py-4 shadow-lg hover:shadow-xl focus-enhanced"
                >
                  Access Family Portal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>

            <Card className="card-interactive shadow-lg animate-scale-in">
              <CardHeader className="text-center p-8">
                <div className="bg-brand-sky/10 rounded-full p-6 w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <User className="h-8 w-8 text-brand-sky mx-auto" />
                </div>
                <CardTitle className="text-contrast-high text-2xl font-bold mb-3 font-heading">Healthcare Professionals</CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">Manage clients, referrals, and track placements efficiently</CardDescription>
              </CardHeader>
              <CardContent className="text-center p-8 pt-0">
                <Button 
                  onClick={() => handlePortalAccess('healthcare')}
                  className="btn-secondary btn-enhanced w-full text-lg py-4 shadow-lg hover:shadow-xl focus-enhanced"
                >
                  Access Healthcare Portal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>

            <Card className="card-interactive shadow-lg animate-scale-in">
              <CardHeader className="text-center p-8">
                <div className="bg-brand-gold/10 rounded-full p-6 w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="h-8 w-8 text-brand-gold mx-auto" />
                </div>
                <CardTitle className="text-contrast-high text-2xl font-bold mb-3 font-heading">Placement Agents</CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">CRM tools, performance tracking, and comprehensive client management</CardDescription>
              </CardHeader>
              <CardContent className="text-center p-8 pt-0">
                <Button 
                  onClick={() => handlePortalAccess('agent')}
                  className="w-full bg-brand-gold hover:bg-yellow-500 text-brand-navy btn-enhanced text-lg py-4 shadow-lg hover:shadow-xl focus-enhanced"
                >
                  Access Agent Portal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>

            <Card className="card-interactive shadow-lg animate-scale-in">
              <CardHeader className="text-center p-8">
                <div className="bg-brand-navy/10 rounded-full p-6 w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Building className="h-8 w-8 text-brand-navy mx-auto" />
                </div>
                <CardTitle className="text-contrast-high text-2xl font-bold mb-3 font-heading">Facilities</CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">Manage listings, analytics, and placement specialist relationships</CardDescription>
              </CardHeader>
              <CardContent className="text-center p-8 pt-0">
                <Button 
                  onClick={() => handlePortalAccess('facility')}
                  className="w-full bg-brand-navy hover:bg-blue-900 text-white btn-enhanced text-lg py-4 shadow-lg hover:shadow-xl focus-enhanced"
                >
                  Access Facility Portal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-5xl font-bold text-text-primary mb-6 font-heading">
              Why Choose HealthProAssist?
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive tools for every step of the care journey, powered by innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-16">
            <div className="text-center group animate-scale-in">
              <div className="bg-gradient-to-br from-brand-red/10 to-brand-red/5 rounded-2xl p-8 w-24 h-24 mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Shield className="h-12 w-12 text-brand-red" />
              </div>
              <h3 className="text-3xl font-bold text-contrast-high mb-4 font-heading">
                Streamlined Communication
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Secure messaging and real-time updates keep everyone connected with advanced encryption and instant notifications
              </p>
            </div>

            <div className="text-center group animate-scale-in">
              <div className="bg-gradient-to-br from-brand-sky/10 to-brand-sky/5 rounded-2xl p-8 w-24 h-24 mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Building className="h-12 w-12 text-brand-sky" />
              </div>
              <h3 className="text-3xl font-bold text-contrast-high mb-4 font-heading">
                Comprehensive Directory
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Access to verified facilities and care providers with detailed profiles, reviews, and real-time availability
              </p>
            </div>

            <div className="text-center group animate-scale-in">
              <div className="bg-gradient-to-br from-brand-gold/10 to-brand-gold/5 rounded-2xl p-8 w-24 h-24 mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Zap className="h-12 w-12 text-brand-gold" />
              </div>
              <h3 className="text-3xl font-bold text-contrast-high mb-4 font-heading">
                Professional Tools
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Advanced CRM, analytics, and management capabilities designed for healthcare professionals
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                <span className="text-2xl font-bold text-brand-navy">500+</span>
              </div>
              <p className="text-sm text-gray-600">Verified Facilities</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                <span className="text-2xl font-bold text-brand-navy">1000+</span>
              </div>
              <p className="text-sm text-gray-600">Successful Placements</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                <span className="text-2xl font-bold text-brand-navy">24/7</span>
              </div>
              <p className="text-sm text-gray-600">Support Available</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                <span className="text-2xl font-bold text-brand-navy">99.9%</span>
              </div>
              <p className="text-sm text-gray-600">Uptime Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* ElevenLabs Widget - Show on scroll */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          showWidget ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ display: showWidget ? 'block' : 'none' }}
      >
        <ElevenLabsWidget variant="fullscreen" />
      </div>

      <TempLoginModal 
        isOpen={isTempLoginOpen} 
        onClose={handleTempLoginClose}
      />
    </div>
  );
};

export default HomePage;
