
import { Outlet, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-off-white">
      {/* Enhanced Header */}
      <header className="bg-navy-blue text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-blue via-navy-blue to-sky-blue opacity-90"></div>
        <div className="container mx-auto px-lg py-lg relative z-10">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-h3 font-bold text-white hover:text-gold transition-colors duration-300">
              <div className="w-8 h-8 bg-patriot-red rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">+</span>
              </div>
              <span className="font-montserrat">
                Health<span className="text-sky-blue">Pro</span>Assist
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-lg">
              <Link 
                to="/find-care" 
                className="text-white hover:text-gold transition-colors duration-300 font-medium text-body relative group"
              >
                Find Care
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                to="/pricing" 
                className="text-white hover:text-gold transition-colors duration-300 font-medium text-body relative group"
              >
                Pricing
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <div className="flex items-center space-x-md">
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className="healthpro-btn-tertiary border-2 border-white text-white hover:bg-white hover:text-navy-blue transition-all duration-300 font-semibold"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="healthpro-btn-primary transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
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
      <footer className="bg-navy-blue text-white py-xxl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-navy-blue to-sky-blue opacity-20"></div>
        <div className="container mx-auto px-lg relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
            <div className="space-y-md">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-patriot-red rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">+</span>
                </div>
                <h3 className="font-montserrat font-bold text-h4 text-gold">
                  Health<span className="text-sky-blue">Pro</span>Assist
                </h3>
              </div>
              <p className="text-gray-300 text-body leading-relaxed">Connecting healthcare professionals with advanced care solutions through innovative technology.</p>
            </div>
            <div className="space-y-md">
              <h4 className="font-montserrat font-semibold text-body text-white">Services</h4>
              <ul className="space-y-sm text-gray-300">
                <li>
                  <Link 
                    to="/find-care" 
                    className="hover:text-gold transition-colors duration-300 hover:underline"
                  >
                    Find Care
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/pricing" 
                    className="hover:text-gold transition-colors duration-300 hover:underline"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-md">
              <h4 className="font-montserrat font-semibold text-body text-white">Support</h4>
              <ul className="space-y-sm text-gray-300">
                <li>
                  <a 
                    href="#" 
                    className="hover:text-gold transition-colors duration-300 hover:underline"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="hover:text-gold transition-colors duration-300 hover:underline"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-md">
              <h4 className="font-montserrat font-semibold text-body text-white">Company</h4>
              <ul className="space-y-sm text-gray-300">
                <li>
                  <a 
                    href="#" 
                    className="hover:text-gold transition-colors duration-300 hover:underline"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="hover:text-gold transition-colors duration-300 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-xxl pt-lg text-center">
            <p className="text-gray-300 text-body">&copy; 2024 HealthProAssist. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
