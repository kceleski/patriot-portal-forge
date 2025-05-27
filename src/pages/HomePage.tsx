
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, User, Building, Briefcase, ArrowRight, Shield, Zap, Heart } from 'lucide-react';
import ElevenLabsWidget from '@/components/ElevenLabsWidget';

const HomePage = () => {
  const [showWidget, setShowWidget] = useState(false);

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

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="gradient-hero text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/90 via-primary-sky/80 to-primary-navy/90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-6xl font-bold mb-8 leading-tight animate-fade-in">
              Connecting Families with 
              <span className="text-gradient bg-gradient-to-r from-accent-gold to-yellow-300 bg-clip-text text-transparent"> Quality Care Solutions</span>
            </h1>
            <p className="text-2xl mb-12 max-w-4xl mx-auto text-blue-100 leading-relaxed font-light">
              CareConnect simplifies the process of finding and managing care services for your loved ones.
              Whether you're a family, healthcare professional, placement agent, or facility, we have the innovative tools you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/find-care" className="group">
                <Button size="lg" className="bg-primary-red hover:bg-red-600 text-white px-10 py-6 text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  Find Care Now
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link to="/pricing" className="group">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary-navy px-10 py-6 text-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  View Pricing
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced User Portals Section */}
      <section className="py-24 bg-gradient-to-b from-secondary-off-white to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-text-dark-gray mb-6">
              Choose Your Portal
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Access specialized tools designed for your specific needs with our innovative platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <Card className="card-interactive card-elevated border-2 border-transparent hover:border-primary-sky group">
              <CardHeader className="text-center p-8">
                <div className="bg-primary-red/10 rounded-full p-6 w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-primary-red mx-auto" />
                </div>
                <CardTitle className="text-text-dark-gray text-2xl font-bold mb-3">Families & Clients</CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">Find and manage care services for your loved ones with ease</CardDescription>
              </CardHeader>
              <CardContent className="text-center p-8 pt-0">
                <Link to="/dashboard/family">
                  <Button className="w-full bg-primary-red hover:bg-red-600 text-lg py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Access Family Portal
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-interactive card-elevated border-2 border-transparent hover:border-primary-sky group">
              <CardHeader className="text-center p-8">
                <div className="bg-primary-sky/10 rounded-full p-6 w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <User className="h-8 w-8 text-primary-sky mx-auto" />
                </div>
                <CardTitle className="text-text-dark-gray text-2xl font-bold mb-3">Healthcare Professionals</CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">Manage clients, referrals, and track placements efficiently</CardDescription>
              </CardHeader>
              <CardContent className="text-center p-8 pt-0">
                <Link to="/dashboard/healthcare">
                  <Button className="w-full bg-primary-sky hover:bg-blue-600 text-lg py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Access Healthcare Portal
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-interactive card-elevated border-2 border-transparent hover:border-primary-sky group">
              <CardHeader className="text-center p-8">
                <div className="bg-accent-gold/10 rounded-full p-6 w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="h-8 w-8 text-accent-gold mx-auto" />
                </div>
                <CardTitle className="text-text-dark-gray text-2xl font-bold mb-3">Placement Agents</CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">CRM tools, performance tracking, and comprehensive client management</CardDescription>
              </CardHeader>
              <CardContent className="text-center p-8 pt-0">
                <Link to="/dashboard/agent">
                  <Button className="w-full bg-accent-gold hover:bg-yellow-500 text-text-dark-gray text-lg py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Access Agent Portal
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-interactive card-elevated border-2 border-transparent hover:border-primary-sky group">
              <CardHeader className="text-center p-8">
                <div className="bg-primary-navy/10 rounded-full p-6 w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Building className="h-8 w-8 text-primary-navy mx-auto" />
                </div>
                <CardTitle className="text-text-dark-gray text-2xl font-bold mb-3">Facilities</CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">Manage listings, analytics, and placement specialist relationships</CardDescription>
              </CardHeader>
              <CardContent className="text-center p-8 pt-0">
                <Link to="/dashboard/facility">
                  <Button className="w-full bg-primary-navy hover:bg-blue-900 text-lg py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Access Facility Portal
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-text-dark-gray mb-6">
              Why Choose CareConnect?
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive tools for every step of the care journey, powered by innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-primary-red/10 to-primary-red/5 rounded-2xl p-8 w-24 h-24 mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Shield className="h-12 w-12 text-primary-red" />
              </div>
              <h3 className="text-3xl font-bold text-text-dark-gray mb-4">
                Streamlined Communication
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Secure messaging and real-time updates keep everyone connected with advanced encryption and instant notifications
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-primary-sky/10 to-primary-sky/5 rounded-2xl p-8 w-24 h-24 mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Building className="h-12 w-12 text-primary-sky" />
              </div>
              <h3 className="text-3xl font-bold text-text-dark-gray mb-4">
                Comprehensive Directory
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Access to verified facilities and care providers with detailed profiles, reviews, and real-time availability
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-accent-gold/10 to-accent-gold/5 rounded-2xl p-8 w-24 h-24 mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Zap className="h-12 w-12 text-accent-gold" />
              </div>
              <h3 className="text-3xl font-bold text-text-dark-gray mb-4">
                Professional Tools
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Advanced CRM, analytics, and management capabilities designed for healthcare professionals
              </p>
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
    </div>
  );
};

export default HomePage;
