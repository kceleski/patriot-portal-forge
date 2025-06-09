
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PublicLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-brand-off-white">
      {/* Enhanced Header with improved styling */}
      <header className="bg-white shadow-lg border-b border-ui-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/lovable-uploads/c1dfb5b9-8798-4928-b11d-d7251a320545.png" 
                  alt="HealthProAssist" 
                  className="h-10 w-auto rounded-lg shadow-md"
                />
              </div>
              <h1 className="text-2xl font-bold text-brand-navy font-heading">HealthProAssist</h1>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/find-care" 
                className={`font-medium transition-colors hover:text-brand-red ${
                  location.pathname === '/find-care' ? 'text-brand-red' : 'text-brand-navy'
                }`}
              >
                Find Care
              </Link>
              <Link 
                to="/facilities-map" 
                className={`font-medium transition-colors hover:text-brand-red ${
                  location.pathname === '/facilities-map' ? 'text-brand-red' : 'text-brand-navy'
                }`}
              >
                Facilities Map
              </Link>
              <Link 
                to="/pricing" 
                className={`font-medium transition-colors hover:text-brand-red ${
                  location.pathname === '/pricing' ? 'text-brand-red' : 'text-brand-navy'
                }`}
              >
                Pricing
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button 
                  variant="outline" 
                  className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-brand-red hover:bg-red-600 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-brand-navy text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="/lovable-uploads/c1dfb5b9-8798-4928-b11d-d7251a320545.png" 
                  alt="HealthProAssist" 
                  className="h-8 w-auto rounded shadow-sm"
                />
                <h3 className="font-bold text-xl">HealthProAssist</h3>
              </div>
              <p className="text-brand-light-blue">
                Connecting families with quality care solutions through innovative technology and dedicated support.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Families</h4>
              <ul className="space-y-2 text-brand-light-blue">
                <li><Link to="/find-care" className="hover:text-white transition-colors">Find Care</Link></li>
                <li><Link to="/facilities-map" className="hover:text-white transition-colors">Browse Facilities</Link></li>
                <li><Link to="/dashboard/family" className="hover:text-white transition-colors">Family Portal</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Professionals</h4>
              <ul className="space-y-2 text-brand-light-blue">
                <li><Link to="/dashboard/healthcare" className="hover:text-white transition-colors">Healthcare Portal</Link></li>
                <li><Link to="/dashboard/agent" className="hover:text-white transition-colors">Agent Portal</Link></li>
                <li><Link to="/dashboard/facility" className="hover:text-white transition-colors">Facility Portal</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-brand-light-blue">
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-brand-sky/30 mt-8 pt-8 text-center text-brand-light-blue">
            <p>&copy; 2024 HealthProAssist. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
