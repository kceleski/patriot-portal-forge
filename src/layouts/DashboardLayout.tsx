
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, MessageSquare, User, Users, Calendar, Settings, BarChart, FileText, Building, Briefcase } from 'lucide-react';

interface DashboardLayoutProps {
  userType: 'family' | 'healthcare' | 'agent' | 'facility';
}

const DashboardLayout = ({ userType }: DashboardLayoutProps) => {
  const location = useLocation();

  const getNavigationItems = () => {
    const baseItems = [
      { path: `/${userType}`, label: 'Dashboard', icon: Home }
    ];

    switch (userType) {
      case 'family':
        return [
          ...baseItems,
          { path: `/${userType}/messaging`, label: 'Messages', icon: MessageSquare },
          { path: `/${userType}/favorites`, label: 'Saved Favorites', icon: User }
        ];
      case 'healthcare':
        return [
          ...baseItems,
          { path: `/${userType}/clients`, label: 'Client Tracking', icon: Users },
          { path: `/${userType}/referrals`, label: 'Referral Management', icon: User },
          { path: `/${userType}/invoicing`, label: 'Invoicing Tools', icon: FileText },
          { path: `/${userType}/facilities`, label: 'Facilities Directory', icon: Building }
        ];
      case 'agent':
        return [
          ...baseItems,
          { path: `/${userType}/crm`, label: 'CRM', icon: Users },
          { path: `/${userType}/performance`, label: 'Performance Dashboard', icon: BarChart }
        ];
      case 'facility':
        return [
          ...baseItems,
          { path: `/${userType}/listings`, label: 'Listing Management', icon: Building },
          { path: `/${userType}/analytics`, label: 'Analytics Dashboard', icon: BarChart },
          { path: `/${userType}/specialists`, label: 'Placement Specialists', icon: Users },
          { path: `/${userType}/webinars`, label: 'Webinar Management', icon: Calendar }
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  const getUserTypeLabel = () => {
    switch (userType) {
      case 'family':
        return 'Family Portal';
      case 'healthcare':
        return 'Healthcare Professional Portal';
      case 'agent':
        return 'Placement Agent Portal';
      case 'facility':
        return 'Facility Portal';
      default:
        return 'Portal';
    }
  };

  return (
    <div className="min-h-screen bg-secondary-off-white flex w-full">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-navy text-white">
        <div className="p-6">
          <Link to="/" className="text-2xl font-bold block mb-8">
            CareConnect
          </Link>
          <h2 className="text-sm text-gray-300 mb-6">{getUserTypeLabel()}</h2>
          
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-sky text-white'
                      : 'text-gray-300 hover:bg-primary-sky/20 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="border-t border-gray-600 pt-6">
            <Link to="/login">
              <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-primary-navy">
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
