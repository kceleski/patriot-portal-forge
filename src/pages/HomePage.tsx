
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
      <section className="gradient-hero text-white py-xxxl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-blue/90 via-sky-blue/80 to-navy-blue/90"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="container mx-auto px-lg text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="font-montserrat text-6xl font-bold mb-lg leading-tight animate-fade-in">
              Connecting Healthcare Professionals with 
              <span className="text-gradient bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent"> Advanced Care Solutions</span>
            </h1>
            <p className="text-body-large mb-xxl max-w-4xl mx-auto text-blue-100 leading-relaxed font-light">
              HealthProAssist revolutionizes care coordination with AI-powered tools, comprehensive facility networks, and streamlined communication.
              Whether you're a healthcare professional, placement agent, or facility, we provide innovative solutions for better care outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-lg justify-center items-center">
              <Link to="/find-care" className="group">
                <Button size="lg" className="healthpro-btn-primary px-xl py-lg text-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  Find Care Now
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link to="/pricing" className="group">
                <Button size="lg" variant="outline" className="healthpro-btn-tertiary px-xl py-lg text-xl border-2 border-white text-white hover:bg-white hover:text-navy-blue transition-all duration-300 transform hover:scale-105">
                  View Pricing
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced User Portals Section */}
      <section className="py-xxxl bg-gradient-to-b from-off-white to-white">
        <div className="container mx-auto px-lg">
          <div className="text-center mb-xxl">
            <h2 className="font-montserrat text-5xl font-bold text-dark-gray mb-lg">
              Choose Your Portal
            </h2>
            <p className="text-body-large text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Access specialized tools designed for your specific needs with our innovative platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg max-w-7xl mx-auto">
            <Card className="healthpro-card card-interactive border-2 border-transparent hover:border-sky-blue group">
              <CardHeader className="text-center p-lg">
                <div className="bg-patriot-red/10 rounded-full p-lg w-20 h-20 mx-auto mb-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-patriot-red mx-auto" />
                </div>
                <CardTitle className="font-montserrat text-dark-gray text-h4 font-bold mb-sm">Families & Clients</CardTitle>
                <CardDescription className="text-body text-gray-600 leading-relaxed">Find and manage care services for your loved ones with ease</CardDescription>
              </CardHeader>
              <CardContent className="text-center p-lg pt-0">
                <Link to="/dashboard/family">
                  <Button className="healthpro-btn-primary w-full text-body py-md shadow-lg hover:shadow-xl transition-all duration-300">
                    Access Family Portal
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="healthpro-card card-interactive border-2 border-transparent hover:border-sky-blue group">
              <CardHeader className="text-center p-lg">
                <div className="bg-sky-blue/10 rounded-full p-lg w-20 h-20 mx-auto mb-lg group-hover:scale-110 transition-transform duration-300">
                  <User className="h-8 w-8 text-sky-blue mx-auto" />
                </div>
                <CardTitle className="font-montserrat text-dark-gray text-h4 font-bold mb-sm">Healthcare Professionals</CardTitle>
                <CardDescription className="text-body text-gray-600 leading-relaxed">Manage clients, referrals, and track placements efficiently</CardDescription>
              </CardHeader>
              <CardContent className="text-center p-lg pt-0">
                <Link to="/dashboard/healthcare">
                  <Button className="healthpro-btn-secondary w-full text-body py-md shadow-lg hover:shadow-xl transition-all duration-300">
                    Access Healthcare Portal
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="healthpro-card card-interactive border-2 border-transparent hover:border-sky-blue group">
              <CardHeader className="text-center p-lg">
                <div className="bg-gold/10 rounded-full p-lg w-20 h-20 mx-auto mb-lg group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="h-8 w-8 text-gold mx-auto" />
                </div>
                <CardTitle className="font-montserrat text-dark-gray text-h4 font-bold mb-sm">Placement Agents</CardTitle>
                <CardDescription className="text-body text-gray-600 leading-relaxed">CRM tools, performance tracking, and comprehensive client management</CardDescription>
              </CardHeader>
              <CardContent className="text-center p-lg pt-0">
                <Link to="/dashboard/agent">
                  <Button className="bg-gold hover:bg-yellow-500 text-dark-gray w-full text-body py-md font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Access Agent Portal
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="healthpro-card card-interactive border-2 border-transparent hover:border-sky-blue group">
              <CardHeader className="text-center p-lg">
                <div className="bg-navy-blue/10 rounded-full p-lg w-20 h-20 mx-auto mb-lg group-hover:scale-110 transition-transform duration-300">
                  <Building className="h-8 w-8 text-navy-blue mx-auto" />
                </div>
                <CardTitle className="font-montserrat text-dark-gray text-h4 font-bold mb-sm">Facilities</CardTitle>
                <CardDescription className="text-body text-gray-600 leading-relaxed">Manage listings, analytics, and placement specialist relationships</CardDescription>
              </CardHeader>
              <CardContent className="text-center p-lg pt-0">
                <Link to="/dashboard/facility">
                  <Button className="bg-navy-blue hover:bg-blue-900 text-white w-full text-body py-md font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
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
      <section className="bg-white py-xxxl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"></div>
        <div className="container mx-auto px-lg relative z-10">
          <div className="text-center mb-xxl">
            <h2 className="font-montserrat text-5xl font-bold text-dark-gray mb-lg">
              Why Choose HealthProAssist?
            </h2>
            <p className="text-body-large text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive tools for every step of the care journey, powered by innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-xxl max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-patriot-red/10 to-patriot-red/5 rounded-2xl p-lg w-24 h-24 mx-auto mb-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-card">
                <Shield className="h-12 w-12 text-patriot-red" />
              </div>
              <h3 className="font-montserrat text-h3 font-bold text-dark-gray mb-md">
                Streamlined Communication
              </h3>
              <p className="text-body text-gray-600 leading-relaxed">
                Secure messaging and real-time updates keep everyone connected with advanced encryption and instant notifications
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-sky-blue/10 to-sky-blue/5 rounded-2xl p-lg w-24 h-24 mx-auto mb-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-card">
                <Building className="h-12 w-12 text-sky-blue" />
              </div>
              <h3 className="font-montserrat text-h3 font-bold text-dark-gray mb-md">
                Comprehensive Directory
              </h3>
              <p className="text-body text-gray-600 leading-relaxed">
                Access to verified facilities and care providers with detailed profiles, reviews, and real-time availability
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl p-lg w-24 h-24 mx-auto mb-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-card">
                <Zap className="h-12 w-12 text-gold" />
              </div>
              <h3 className="font-montserrat text-h3 font-bold text-dark-gray mb-md">
                Professional Tools
              </h3>
              <p className="text-body text-gray-600 leading-relaxed">
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
