
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
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-primary-navy text-white p-6">
        <div className="mb-8">
          <h1 className="text-xl font-bold">Health Portal Assistant</h1>
          <p className="text-sm text-blue-200 mt-1">
            {profile?.user_type?.charAt(0).toUpperCase() + profile?.user_type?.slice(1)} Portal
          </p>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-sky text-white'
                    : 'text-blue-100 hover:bg-blue-800'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-8">
          <div className="border-t border-blue-700 pt-4">
            <div className="mb-4">
              <p className="text-sm text-blue-200">Logged in as:</p>
              <p className="font-medium">{profile?.first_name} {profile?.last_name}</p>
              <p className="text-xs text-blue-300">{profile?.subscription_tier}</p>
            </div>
            <Button
              variant="ghost"
              onClick={signOut}
              className="w-full justify-start text-blue-100 hover:bg-blue-800"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
