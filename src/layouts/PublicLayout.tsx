
import { Outlet, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-secondary-off-white">
      {/* Enhanced Header */}
      <header className="bg-primary-navy text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-navy via-primary-navy to-primary-sky opacity-90"></div>
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-3xl font-bold text-white hover:text-accent-gold transition-colors duration-300">
              CareConnect
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/find-care" 
                className="text-white hover:text-accent-gold transition-colors duration-300 font-medium text-lg relative group"
              >
                Find Care
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                to="/pricing" 
                className="text-white hover:text-accent-gold transition-colors duration-300 font-medium text-lg relative group"
              >
                Pricing
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className="border-2 border-white text-white hover:bg-white hover:text-primary-navy transition-all duration-300 font-semibold"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-primary-red hover:bg-red-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
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
      <footer className="bg-primary-navy text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary-navy to-primary-sky opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-2xl text-accent-gold">CareConnect</h3>
              <p className="text-gray-300 text-lg leading-relaxed">Connecting families with quality care solutions through innovative technology.</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-white">Services</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link 
                    to="/find-care" 
                    className="hover:text-accent-gold transition-colors duration-300 hover:underline"
                  >
                    Find Care
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/pricing" 
                    className="hover:text-accent-gold transition-colors duration-300 hover:underline"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-white">Support</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <a 
                    href="#" 
                    className="hover:text-accent-gold transition-colors duration-300 hover:underline"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="hover:text-accent-gold transition-colors duration-300 hover:underline"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-white">Company</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <a 
                    href="#" 
                    className="hover:text-accent-gold transition-colors duration-300 hover:underline"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="hover:text-accent-gold transition-colors duration-300 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-12 pt-8 text-center">
            <p className="text-gray-300 text-lg">&copy; 2024 CareConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
