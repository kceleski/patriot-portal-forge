
import { Outlet, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-background-main">
      {/* Enhanced Header */}
      <header className="bg-brand-navy text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy to-brand-sky opacity-90"></div>
        <div className="container mx-auto px-6 py-6 relative z-10">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-h3 font-bold text-white hover:text-brand-gold transition-colors duration-300">
              <div className="w-8 h-8 bg-brand-red rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">+</span>
              </div>
              <span className="font-heading">
                Health<span className="text-brand-sky">Pro</span>Assist
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/find-care" 
                className="text-white hover:text-brand-gold transition-colors duration-300 font-medium text-body relative group"
              >
                Find Care
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                to="/pricing" 
                className="text-white hover:text-brand-gold transition-colors duration-300 font-medium text-body relative group"
              >
                Pricing
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className="border-2 border-white text-white hover:bg-white hover:text-brand-navy transition-all duration-300 font-semibold"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-brand-red hover:bg-red-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-brand-navy text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy to-brand-sky opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-brand-red rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">+</span>
                </div>
                <h3 className="font-heading font-bold text-h4 text-brand-gold">
                  Health<span className="text-brand-sky">Pro</span>Assist
                </h3>
              </div>
              <p className="text-gray-300 text-body leading-relaxed">Connecting healthcare professionals with advanced care solutions through innovative technology.</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-heading font-semibold text-body text-white">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link 
                    to="/find-care" 
                    className="hover:text-brand-gold transition-colors duration-300 hover:underline"
                  >
                    Find Care
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/pricing" 
                    className="hover:text-brand-gold transition-colors duration-300 hover:underline"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-heading font-semibold text-body text-white">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a 
                    href="#" 
                    className="hover:text-brand-gold transition-colors duration-300 hover:underline"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="hover:text-brand-gold transition-colors duration-300 hover:underline"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-heading font-semibold text-body text-white">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a 
                    href="#" 
                    className="hover:text-brand-gold transition-colors duration-300 hover:underline"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="hover:text-brand-gold transition-colors duration-300 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-16 pt-8 text-center">
            <p className="text-gray-300 text-body">&copy; 2024 HealthProAssist. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
