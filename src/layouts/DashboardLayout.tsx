import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Users, 
  MessageSquare, 
  Heart, 
  Settings,
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

// The userType prop is no longer needed
interface DashboardLayoutProps {}

const DashboardLayout = (props: DashboardLayoutProps) => {
  const { signOut, profile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const getNavigationItems = () => {
    // We now use the user's actual role from their profile
    const userRole = profile?.user_type;

    switch (userRole) {
      case 'family':
        return [
          { name: 'Dashboard', href: '/dashboard/family', icon: Home },
          { name: 'Messaging', href: '/dashboard/family/messaging', icon: MessageSquare },
          { name: 'Saved Favorites', href: '/dashboard/family/favorites', icon: Heart },
          { name: 'Profile & Settings', href: '/dashboard/family/profile', icon: Settings },
        ];
      case 'healthcare':
        return [
          { name: 'Dashboard', href: '/dashboard/healthcare', icon: Home },
          { name: 'Client Tracking', href: '/dashboard/healthcare/clients', icon: Users },
          { name: 'Referral Management', href: '/dashboard/healthcare/referrals', icon: RefreshCw },
          { name: 'Intake Form', href: '/dashboard/healthcare/intake-form', icon: UserPlus },
          { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
        ];
      case 'agent':
        return [
          { name: 'Dashboard', href: '/dashboard/agent', icon: Home },
          { name: 'CRM', href: '/dashboard/agent/crm', icon: Users },
          { name: 'Performance', href: '/dashboard/agent/performance', icon: BarChart3 },
          { name: 'Facilities Map', href: '/dashboard/facilities/map', icon: Map },
        ];
      case 'facility':
        return [
          { name: 'Dashboard', href: '/dashboard/facility', icon: Home },
          { name: 'Listing Management', href: '/dashboard/facility/listings', icon: Building },
          { name: 'Analytics', href: '/dashboard/facility/analytics', icon: BarChart3 },
          { name: 'Webinars', href: '/dashboard/facility/webinars', icon: Calendar },
        ];
      default:
        // Fallback for loading state or unexpected roles
        return [];
    }
  };

  const navigationItems = getNavigationItems();
  const portalName = profile?.user_type ? `${profile.user_type.charAt(0).toUpperCase()}${profile.user_type.slice(1)} Portal` : 'Dashboard';

  return (
    <div className="min-h-screen bg-brand-off-white flex">
      <div className="w-72 bg-brand-navy text-white shadow-2xl flex flex-col p-6">
          <div className="mb-10">
            <h1 className="text-2xl font-bold text-brand-gold mb-2">HealthProAssist</h1>
            <div className="bg-brand-sky/20 rounded-lg p-3 border border-brand-sky/30">
              <p className="text-xs text-brand-light-blue mb-1">Portal Access</p>
              <p className="font-semibold text-white">{portalName}</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-brand-sky text-white shadow-md'
                      : 'text-brand-light-blue hover:bg-brand-sky/20 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto">
            <div className="border-t border-brand-sky/30 pt-4">
               <div className="bg-brand-sky/10 rounded-lg p-3 mb-4 text-center">
                  <p className="text-sm font-semibold text-white">{profile?.first_name} {profile?.last_name}</p>
                  <Badge variant="secondary" className="mt-2 bg-brand-gold text-brand-navy">
                    {profile?.subscription_tier} Tier
                  </Badge>
              </div>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="w-full justify-center text-brand-light-blue hover:bg-brand-red/80 hover:text-white transition-all duration-200 py-2.5"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
      </div>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
