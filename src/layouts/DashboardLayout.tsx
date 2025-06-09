
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Home, 
  Users, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Heart,
  Building2,
  FileText,
  Stethoscope,
  Map,
  UserPlus,
  FileBarChart,
  MessageCircle,
  ContactIcon,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
  isQuickActions?: boolean;
  subItems?: NavItem[];
}

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);

  // Get user type from actual user profile data
  const userType = profile?.user_type || 'family';

  const getNavigationItems = (): NavItem[] => {
    const baseItems = [
      { icon: Calendar, label: 'Calendar', href: '/dashboard/calendar' },
      { icon: MessageSquare, label: 'Messages', href: '/dashboard/family/messaging' },
    ];

    switch (userType) {
      case 'agent':
        return [
          { icon: Home, label: 'Dashboard', href: '/dashboard/agent' },
          { 
            icon: UserPlus, 
            label: 'Quick Actions', 
            href: '#',
            isQuickActions: true,
            subItems: [
              { icon: UserPlus, label: 'New Client', href: '/dashboard/agent/new-client' },
              { icon: FileBarChart, label: 'Generate Report', href: '/dashboard/agent/performance' },
              { icon: MessageCircle, label: 'Send Email', href: '/dashboard/agent/inbox' },
              { icon: ContactIcon, label: 'Add Contact', href: '/dashboard/agent/contacts' }
            ]
          },
          { icon: Users, label: 'All Clients', href: '/dashboard/agent/clients' },
          { icon: FileBarChart, label: 'Performance', href: '/dashboard/agent/performance' },
          { icon: Map, label: 'Facility Map', href: '/dashboard/agent/facility-map' },
          { icon: ContactIcon, label: 'Contacts', href: '/dashboard/agent/contacts' },
          { icon: FileText, label: 'Forms', href: '/dashboard/agent/form-builder' },
          { icon: MessageSquare, label: 'Inbox', href: '/dashboard/agent/inbox' },
          ...baseItems
        ];
      case 'family':
        return [
          { icon: Home, label: 'Dashboard', href: '/dashboard/family' },
          { icon: Heart, label: 'Favorites', href: '/dashboard/family/favorites' },
          { icon: Map, label: 'Find Care', href: '/dashboard/find-care' },
          ...baseItems
        ];
      case 'healthcare':
        return [
          { icon: Home, label: 'Dashboard', href: '/dashboard/healthcare' },
          { icon: Stethoscope, label: 'Intake Forms', href: '/dashboard/healthcare/intake-form' },
          { icon: Users, label: 'Referrals', href: '/dashboard/healthcare' },
          { icon: Map, label: 'Find Care', href: '/dashboard/find-care' },
          ...baseItems
        ];
      case 'facility':
        return [
          { icon: Home, label: 'Dashboard', href: '/dashboard/facility' },
          { icon: Building2, label: 'Listings', href: '/dashboard/facility' },
          { icon: Users, label: 'Specialists', href: '/dashboard/facility' },
          { icon: FileText, label: 'Analytics', href: '/dashboard/facility' },
          ...baseItems
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (href: string) => {
    if (href === '#') return false;
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const getUserDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    return profile?.email || 'User';
  };

  const getUserInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    return profile?.email ? profile.email[0].toUpperCase() : 'U';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-brand-navy">HealthPro AVA</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            if (item.isQuickActions) {
              return (
                <Collapsible 
                  key={item.label}
                  open={isQuickActionsOpen}
                  onOpenChange={setIsQuickActionsOpen}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-left font-normal"
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.label}
                      </div>
                      {isQuickActionsOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 ml-6">
                    {item.subItems?.map((subItem) => (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        className={cn(
                          "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                          isActive(subItem.href)
                            ? "bg-brand-sky text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        )}
                      >
                        <subItem.icon className="mr-3 h-4 w-4" />
                        {subItem.label}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            }

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive(item.href)
                    ? "bg-brand-sky text-white"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{getUserDisplayName()}</p>
              <p className="text-xs text-gray-500 truncate capitalize">{userType}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-gray-600 hover:text-gray-900"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {location.pathname.split('/').pop()?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Dashboard'}
            </h2>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Help
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
