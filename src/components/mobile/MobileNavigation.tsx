
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

interface MobileNavigationProps {
  isAuthenticated?: boolean;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isAuthenticated = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const publicLinks = [
    { to: '/find-care', label: 'Find Care' },
    { to: '/facilities-map', label: 'Facilities Map' },
    { to: '/pricing', label: 'Pricing' },
  ];

  const authLinks = [
    { to: '/login', label: 'Sign In' },
    { to: '/register', label: 'Get Started' },
  ];

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="focus-enhanced">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg">
                  <img 
                    src="/lovable-uploads/c1dfb5b9-8798-4928-b11d-d7251a320545.png" 
                    alt="HealthProAssist Logo" 
                    className="h-6 w-6 object-contain"
                  />
                </div>
                <span className="text-lg font-bold text-brand-navy font-heading">
                  HealthProAssist
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="flex-1">
              <div className="space-y-4">
                {publicLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      location.pathname === link.to
                        ? 'bg-brand-navy text-white'
                        : 'text-brand-navy hover:bg-brand-sky hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              
              {!isAuthenticated && (
                <div className="mt-8 pt-8 border-t border-gray-200 space-y-3">
                  {authLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
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
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
