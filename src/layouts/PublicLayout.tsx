import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building2, Phone, Mail } from 'lucide-react';
import TempLoginModal from '@/components/TempLoginModal';
import { useTempAuth } from '@/contexts/TempAuthContext';
import { useNavigate } from 'react-router-dom';

const PublicLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const { user, logout } = useTempAuth();
  const [isTempLoginOpen, setIsTempLoginOpen] = useState(false);

  const handlePortalClick = (userType: string) => {
    setIsTempLoginOpen(true);
  };

  const handleTempLoginClose = () => {
    setIsTempLoginOpen(false);
    if (user) {
      navigate(`/dashboard/${user.userType}`);
    }
  };

  return (
    <div className="min-h-screen bg-background-main">
      <nav className="navbar-enhanced sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="logo-enhanced bg-brand-navy p-2 rounded-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-brand-navy font-heading">
                HealthProAssist
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
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
                to="/pricing" 
                className="text-brand-navy hover:text-brand-sky font-medium transition-colors duration-300 focus-enhanced"
              >
                Pricing
              </Link>
              
              <div className="flex items-center space-x-3">
                {user ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-brand-navy">Welcome, {user.name}</span>
                    <Button onClick={logout} variant="outline" className="btn-outline focus-enhanced">
                      Sign Out
                    </Button>
                    <Link to={`/dashboard/${user.userType}`}>
                      <Button className="btn-primary focus-enhanced">
                        Go to Dashboard
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <Button 
                      onClick={() => setIsTempLoginOpen(true)}
                      variant="outline" 
                      className="btn-outline focus-enhanced"
                    >
                      Sign In
                    </Button>
                    <Link to="/register">
                      <Button className="btn-primary focus-enhanced">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="outline" size="sm" className="focus-enhanced">
                <span className="sr-only">Open menu</span>
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className="block w-5 h-0.5 bg-brand-navy mb-1"></span>
                  <span className="block w-5 h-0.5 bg-brand-navy mb-1"></span>
                  <span className="block w-5 h-0.5 bg-brand-navy"></span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      {!isHomePage && (
        <footer className="bg-brand-navy text-white py-12 mt-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Building2 className="h-8 w-8 text-brand-gold" />
                  <span className="text-xl font-bold font-heading">HealthProAssist</span>
                </div>
                <p className="text-blue-200 leading-relaxed">
                  Connecting families with quality care solutions through innovative technology and personalized service.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-brand-gold font-heading">Services</h4>
                <ul className="space-y-2 text-blue-200">
                  <li><Link to="/find-care" className="hover:text-white transition-colors">Find Care</Link></li>
                  <li><Link to="/facilities-map" className="hover:text-white transition-colors">Facility Directory</Link></li>
                  <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-brand-gold font-heading">Portals</h4>
                <ul className="space-y-2 text-blue-200">
                  <li><Link to="/dashboard/family" className="hover:text-white transition-colors">Family Portal</Link></li>
                  <li><Link to="/dashboard/healthcare" className="hover:text-white transition-colors">Healthcare Portal</Link></li>
                  <li><Link to="/dashboard/agent" className="hover:text-white transition-colors">Agent Portal</Link></li>
                  <li><Link to="/dashboard/facility" className="hover:text-white transition-colors">Facility Portal</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-brand-gold font-heading">Contact</h4>
                <div className="space-y-3 text-blue-200">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>support@healthproassist.com</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
              <p>&copy; 2024 HealthProAssist. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default PublicLayout;
