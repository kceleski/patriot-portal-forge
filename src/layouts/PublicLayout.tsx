
import { Outlet, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-secondary-off-white">
      {/* Header */}
      <header className="bg-primary-navy text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold">
              CareConnect
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/find-care" className="hover:text-primary-sky transition-colors">
                Find Care
              </Link>
              <Link to="/pricing" className="hover:text-primary-sky transition-colors">
                Pricing
              </Link>
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary-navy">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-primary-red hover:bg-red-600">
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

      {/* Footer */}
      <footer className="bg-primary-navy text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">CareConnect</h3>
              <p className="text-gray-300">Connecting families with quality care solutions.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/find-care" className="hover:text-primary-sky">Find Care</Link></li>
                <li><Link to="/pricing" className="hover:text-primary-sky">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-primary-sky">Help Center</a></li>
                <li><a href="#" className="hover:text-primary-sky">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-primary-sky">About</a></li>
                <li><a href="#" className="hover:text-primary-sky">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 CareConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
