
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

const DashboardLayout = () => {
  const { signOut, profile } = useAuth();
  const location = useLocation();

  const getNavigationItems = () => {
    const userType = profile?.user_type;
    
    switch (userType) {
      case 'family':
        return [
          { name: 'Dashboard', href: '/dashboard/family', icon: Home },
          { name: 'Messaging', href: '/dashboard/family/messaging', icon: MessageSquare },
          { name: 'Saved Favorites', href: '/dashboard/family/favorites', icon: Heart },
        ];
      case 'healthcare':
        return [
          { name: 'Dashboard', href: '/dashboard/healthcare', icon: Home },
          { name: 'Client Tracking', href: '/dashboard/healthcare/clients', icon: Users },
          { name: 'Referral Management', href: '/dashboard/healthcare/referrals', icon: RefreshCw },
          { name: 'Invoicing Tools', href: '/dashboard/healthcare/invoicing', icon: DollarSign },
          { name: 'Facilities Directory', href: '/dashboard/healthcare/facilities', icon: Building },
          { name: 'Facilities Gallery', href: '/dashboard/facilities', icon: Grid2X2 },
          { name: 'Facilities Map', href: '/dashboard/facilities/map', icon: Map },
        ];
      case 'agent':
        return [
          { name: 'Dashboard', href: '/dashboard/agent', icon: Home },
          { name: 'CRM', href: '/dashboard/agent/crm', icon: Users },
          { name: 'Performance Dashboard', href: '/dashboard/agent/performance', icon: BarChart3 },
          { name: 'Facilities Gallery', href: '/dashboard/facilities', icon: Grid2X2 },
          { name: 'Facilities Map', href: '/dashboard/facilities/map', icon: Map },
        ];
      case 'facility':
        return [
          { name: 'Dashboard', href: '/dashboard/facility', icon: Home },
          { name: 'Listing Management', href: '/dashboard/facility/listings', icon: Building },
          { name: 'Analytics', href: '/dashboard/facility/analytics', icon: BarChart3 },
          { name: 'Placement Specialists', href: '/dashboard/facility/specialists', icon: UserPlus },
          { name: 'Webinar Management', href: '/dashboard/facility/webinars', icon: Calendar },
        ];
      default:
        return [
          { name: 'Facilities Gallery', href: '/dashboard/facilities', icon: Grid2X2 },
          { name: 'Facilities Map', href: '/dashboard/facilities/map', icon: Map },
        ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-background-main flex">
      {/* Enhanced Sidebar */}
      <div className="w-72 bg-brand-navy text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy to-brand-sky opacity-90"></div>
        
        <div className="relative z-10 p-8">
          <div className="mb-12">
            <div className="mb-4">
              <img 
                src="/lovable-uploads/c1dfb5b9-8798-4928-b11d-d7251a320545.png" 
                alt="HealthProAssist Logo" 
                className="h-8 w-auto mb-2"
              />
            </div>
            <div className="bg-brand-sky/20 rounded-lg p-4 border border-brand-sky/30">
              <p className="text-sm text-blue-200 mb-1 font-body">Portal Access</p>
              <p className="font-semibold text-lg text-white font-heading">
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
                  className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 group font-body ${
                    isActive
                      ? 'bg-brand-sky text-white shadow-lg scale-105'
                      : 'text-blue-100 hover:bg-brand-sky/30 hover:text-white hover:scale-105'
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
              <div className="bg-brand-sky/10 rounded-xl p-4 mb-6 border border-brand-sky/20">
                <p className="text-sm text-blue-200 mb-1 font-body">Logged in as:</p>
                <p className="font-semibold text-white text-lg font-heading">{profile?.first_name} {profile?.last_name}</p>
                <div className="mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-gold text-brand-navy font-body">
                    {profile?.subscription_tier}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={signOut}
                className="w-full justify-start text-blue-100 hover:bg-red-600/20 hover:text-red-200 transition-all duration-300 p-4 rounded-xl font-body"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="flex-1 p-8 bg-gradient-to-br from-background-main to-white">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
