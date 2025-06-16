
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { Menu, X, Home, Search, MapPin, Users, DollarSign } from 'lucide-react';

interface MobileNavigationProps {
  isAuthenticated?: boolean;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isAuthenticated = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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
                  HealthProAssist
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
              {publicLinks.map((link) => {
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
            
            {!isAuthenticated && (
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
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
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileNavigation;
