import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Users, 
  MessageSquare, 
  Heart, 
  Activity, 
  RefreshCw, 
  DollarSign, 
  Building, 
  BarChart3, 
  UserPlus, 
  Calendar,
  Map,
  Grid2X2,
  LogOut
} from 'lucide-react';

interface DashboardLayoutProps {
  userType: 'family' | 'healthcare' | 'agent' | 'facility' | 'shared';
}

const DashboardLayout = ({ userType }: DashboardLayoutProps) => {
  const { signOut, profile } = useAuth();
  const location = useLocation();

  const getNavigationItems = () => {
    switch (userType) {
      case 'family':
        return [
          { name: 'Dashboard', href: '/family', icon: Home },
          { name: 'Messaging', href: '/family/messaging', icon: MessageSquare },
          { name: 'Saved Favorites', href: '/family/favorites', icon: Heart },
        ];
      case 'healthcare':
        return [
          { name: 'Dashboard', href: '/healthcare', icon: Home },
          { name: 'Client Tracking', href: '/healthcare/clients', icon: Users },
          { name: 'Referral Management', href: '/healthcare/referrals', icon: RefreshCw },
          { name: 'Invoicing Tools', href: '/healthcare/invoicing', icon: DollarSign },
          { name: 'Facilities Directory', href: '/healthcare/facilities', icon: Building },
          { name: 'Facilities Gallery', href: '/facilities', icon: Grid2X2 },
          { name: 'Facilities Map', href: '/facilities/map', icon: Map },
        ];
      case 'agent':
        return [
          { name: 'Dashboard', href: '/agent', icon: Home },
          { name: 'CRM', href: '/agent/crm', icon: Users },
          { name: 'Performance Dashboard', href: '/agent/performance', icon: BarChart3 },
          { name: 'Facilities Gallery', href: '/facilities', icon: Grid2X2 },
          { name: 'Facilities Map', href: '/facilities/map', icon: Map },
        ];
      case 'facility':
        return [
          { name: 'Dashboard', href: '/facility', icon: Home },
          { name: 'Listing Management', href: '/facility/listings', icon: Building },
          { name: 'Analytics', href: '/facility/analytics', icon: BarChart3 },
          { name: 'Placement Specialists', href: '/facility/specialists', icon: UserPlus },
          { name: 'Webinar Management', href: '/facility/webinars', icon: Calendar },
        ];
      case 'shared':
        return [
          { name: 'Facilities Gallery', href: '/facilities', icon: Grid2X2 },
          { name: 'Facilities Map', href: '/facilities/map', icon: Map },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-secondary-off-white flex">
      {/* Enhanced Sidebar */}
      <div className="w-72 bg-primary-navy text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-navy via-primary-navy to-primary-sky opacity-90"></div>
        
        <div className="relative z-10 p-8">
          <div className="mb-12">
            <h1 className="text-2xl font-bold text-accent-gold mb-2">HealthPro Assistant</h1>
            <div className="bg-primary-sky/20 rounded-lg p-4 border border-primary-sky/30">
              <p className="text-sm text-blue-200 mb-1">Portal Access</p>
              <p className="font-semibold text-lg text-white">
                {profile?.user_type?.charAt(0).toUpperCase() + profile?.user_type?.slice(1)} Portal
              </p>
            </div>
          </div>

          <nav className="space-y-3">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-primary-sky text-white shadow-lg scale-105'
                      : 'text-blue-100 hover:bg-primary-sky/30 hover:text-white hover:scale-105'
                  }`}
                >
                  <item.icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'text-white' : 'group-hover:scale-110'}`} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-12">
            <div className="border-t border-blue-700/50 pt-8">
              <div className="bg-primary-sky/10 rounded-xl p-4 mb-6 border border-primary-sky/20">
                <p className="text-sm text-blue-200 mb-1">Logged in as:</p>
                <p className="font-semibold text-white text-lg">{profile?.first_name} {profile?.last_name}</p>
                <div className="mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-gold text-primary-navy">
                    {profile?.subscription_tier}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={signOut}
                className="w-full justify-start text-blue-100 hover:bg-red-600/20 hover:text-red-200 transition-all duration-300 p-4 rounded-xl"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="flex-1 p-8 bg-gradient-to-br from-secondary-off-white to-white">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;