import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Mail } from 'lucide-react';
import MobileNavigation from '@/components/mobile/MobileNavigation';

const PublicLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-background-main">
      <nav className="sticky top-0 z-50 bg-white border-b border-ui-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-2 rounded-lg">
                <img 
                  src="/lovable-uploads/c1dfb5b9-8798-4928-b11d-d7251a320545.png" 
                  alt="HealthProAssist Logo" 
                  className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
                />
              </div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-navy font-heading">
                HealthProAssist
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link 
                to="/find-care" 
                className="text-brand-navy hover:text-brand-sky font-medium transition-colors duration-300 focus-enhanced"
              >
                Find Care
              </Link>
              <Link 
                to="/facilities-map" 
                className="text-brand-navy hover:text-brand-sky font-medium transition-colors duration-300 focus-enhanced"
              >
                Facilities Map
              </Link>
              <Link 
                to="/subscribed-providers" 
                className="text-brand-navy hover:text-brand-sky font-medium transition-colors duration-300 focus-enhanced"
              >
                Directory
              </Link>
              <Link 
                to="/resources" 
                className="text-brand-navy hover:text-brand-sky font-medium transition-colors duration-300 focus-enhanced"
              >
                Resources
              </Link>
              <Link 
                to="/pricing" 
                className="text-brand-navy hover:text-brand-sky font-medium transition-colors duration-300 focus-enhanced"
              >
                Pricing
              </Link>
              
              <div className="flex items-center space-x-3">
                <Link to="/super-login">
                  <Button variant="outline" size="sm" className="btn-outline focus-enhanced hidden lg:inline-flex">
                    Super User Login
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="btn-outline focus-enhanced">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="btn-primary focus-enhanced">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile Navigation */}
            <MobileNavigation />
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      {!isHomePage && (
        <footer className="bg-brand-navy text-white py-8 sm:py-12 mt-12 sm:mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src="/lovable-uploads/c1dfb5b9-8798-4928-b11d-d7251a320545.png" 
                    alt="HealthProAssist Logo" 
                    className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
                  />
                  <span className="text-lg sm:text-xl font-bold font-heading">HealthProAssist</span>
                </div>
                <p className="text-blue-200 leading-relaxed text-sm sm:text-base">
                  Connecting families with quality care solutions through innovative technology and personalized service.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-brand-gold font-heading text-base sm:text-lg">Services</h4>
                <ul className="space-y-2 text-blue-200 text-sm sm:text-base">
                  <li><Link to="/find-care" className="hover:text-white transition-colors">Find Care</Link></li>
                  <li><Link to="/facilities-map" className="hover:text-white transition-colors">Facility Directory</Link></li>
                  <li><Link to="/subscribed-providers" className="hover:text-white transition-colors">Premium Providers</Link></li>
                  <li><Link to="/resources" className="hover:text-white transition-colors">Resources</Link></li>
                  <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-brand-gold font-heading text-base sm:text-lg">Portals</h4>
                <ul className="space-y-2 text-blue-200 text-sm sm:text-base">
                  <li><Link to="/dashboard/family" className="hover:text-white transition-colors">Family Portal</Link></li>
                  <li><Link to="/dashboard/healthcare" className="hover:text-white transition-colors">Healthcare Portal</Link></li>
                  <li><Link to="/dashboard/agent" className="hover:text-white transition-colors">Agent Portal</Link></li>
                  <li><Link to="/dashboard/facility" className="hover:text-white transition-colors">Facility Portal</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-brand-gold font-heading text-base sm:text-lg">Contact</h4>
                <div className="space-y-3 text-blue-200 text-sm sm:text-base">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <span className="break-all">support@healthproassist.com</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-blue-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-blue-200 text-sm sm:text-base">
              <p>&copy; 2024 HealthProAssist. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default PublicLayout;
