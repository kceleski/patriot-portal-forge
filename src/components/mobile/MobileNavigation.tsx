
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { Menu, X, Home, Search, MapPin, Users, DollarSign, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface MobileNavigationProps {
  isAuthenticated?: boolean;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isAuthenticated = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
      setIsOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Check if we're in dashboard
  const isDashboard = location.pathname.startsWith('/dashboard');
  const userType = profile?.user_type || 'family';

  // Dashboard navigation items
  const dashboardLinks = [
    { to: `/dashboard/${userType}`, label: 'Dashboard', icon: Home },
    { to: '/dashboard/calendar', label: 'Calendar', icon: Search },
    { to: '/dashboard/messaging', label: 'Messages', icon: Users },
  ];

  // Add user-specific dashboard items
  if (userType === 'family') {
    dashboardLinks.push(
      { to: '/dashboard/family/favorites', label: 'Favorites', icon: MapPin },
      { to: '/find-care', label: 'Find Care', icon: Search }
    );
  } else if (userType === 'agent' || userType === 'healthcare') {
    dashboardLinks.push(
      { to: `/dashboard/${userType}/clients`, label: 'Clients', icon: Users },
      { to: `/dashboard/${userType}/facilities`, label: 'Facilities', icon: MapPin },
      { to: `/dashboard/${userType}/reports`, label: 'Reports', icon: DollarSign }
    );
  } else if (userType === 'facility') {
    dashboardLinks.push(
      { to: '/dashboard/facility/listings', label: 'Listings', icon: MapPin },
      { to: '/dashboard/facility/employees', label: 'Employees', icon: Users },
      { to: '/dashboard/facility/payments', label: 'Payments', icon: DollarSign }
    );
  }

  // Public navigation items
  const publicLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/find-care', label: 'Find Care', icon: Search },
    { to: '/facilities-map', label: 'Facilities Map', icon: MapPin },
    { to: '/subscribed-providers', label: 'Directory', icon: Users },
    { to: '/pricing', label: 'Pricing', icon: DollarSign },
  ];

  const authLinks = [
    { to: '/login', label: 'Sign In' },
    { to: '/register', label: 'Get Started' },
  ];

  const links = isDashboard ? dashboardLinks : publicLinks;

  return (
    <div className="md:hidden">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm" className="focus-enhanced">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[80vh]">
          <DrawerHeader className="text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg">
                  <img 
                    src="/lovable-uploads/c1dfb5b9-8798-4928-b11d-d7251a320545.png" 
                    alt="HealthProAssist Logo" 
                    className="h-6 w-6 object-contain"
                  />
                </div>
                <DrawerTitle className="text-lg font-bold text-brand-navy font-heading">
                  {isDashboard ? 'HealthPro AVA' : 'HealthProAssist'}
                </DrawerTitle>
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          
          <div className="px-4 pb-6">
            <nav className="space-y-2">
              {links.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      location.pathname === link.to
                        ? 'bg-brand-navy text-white'
                        : 'text-brand-navy hover:bg-brand-sky hover:text-white'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
            
            {/* Authentication Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="px-4 py-2">
                    <p className="text-sm text-gray-600">
                      {profile?.first_name} {profile?.last_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {profile?.user_type?.charAt(0).toUpperCase()}{profile?.user_type?.slice(1)}
                    </p>
                  </div>
                  <Button 
                    variant="outline"
                    className="w-full flex items-center justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {authLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className="block"
                    >
                      <Button 
                        variant={link.to === '/register' ? 'default' : 'outline'}
                        className={`w-full ${link.to === '/register' ? 'btn-primary' : 'btn-outline'}`}
                      >
                        {link.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileNavigation;
