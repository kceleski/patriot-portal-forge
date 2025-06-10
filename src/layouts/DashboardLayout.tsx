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
  ChevronRight,
  Shield,
  CreditCard,
  Video,
  Building,
  UserCheck,
  Briefcase,
  ShieldCheck,
  Crown
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
  adminOnly?: boolean;
}

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);

  // Get user type from actual user profile data
  const userType = profile?.user_type || 'family';
  const isSuperAdmin = profile?.user_type === 'admin';
  // For now, we'll determine org admin status based on organization field being present
  // This will need to be updated when we add the organization_admin field to the database
  const isOrgAdmin = !!profile?.organization && profile?.organization !== '';
  const isProfessional = userType === 'healthcare' || userType === 'agent';
  const isPlacementAgent = userType === 'agent';

  const getNavigationItems = (): NavItem[] => {
    const baseItems = [
      { icon: Calendar, label: 'Calendar', href: '/dashboard/calendar' },
      { icon: MessageSquare, label: 'Messages', href: '/dashboard/messaging' },
    ];

    // Super Admin gets access to everything
    if (isSuperAdmin) {
      return [
        { icon: Crown, label: 'Super Admin', href: '/dashboard/super-admin' },
        { icon: Users, label: 'All Users', href: '/dashboard/super-admin/users' },
        { icon: Building2, label: 'All Facilities', href: '/dashboard/super-admin/facilities' },
        { icon: ShieldCheck, label: 'All Organizations', href: '/dashboard/super-admin/organizations' },
        { icon: FileBarChart, label: 'Global Analytics', href: '/dashboard/super-admin/analytics' },
        { icon: CreditCard, label: 'All Payments', href: '/dashboard/super-admin/payments' },
        ...baseItems
      ];
    }

    // Unified Professional Portal (Healthcare & Agent)
    if (isProfessional) {
      const professionalItems = [
        { icon: Home, label: 'Dashboard', href: `/dashboard/${userType}` },
        { 
          icon: UserPlus, 
          label: 'Quick Actions', 
          href: '#',
          isQuickActions: true,
          subItems: [
            { icon: UserPlus, label: 'New Client', href: `/dashboard/${userType}/new-client` },
            { icon: Stethoscope, label: 'New Intake', href: `/dashboard/${userType}/intake-form` },
            { icon: FileBarChart, label: 'Generate Report', href: `/dashboard/${userType}/reports` },
            { icon: MessageCircle, label: 'Send Communication', href: `/dashboard/${userType}/inbox` }
          ]
        },
        { icon: Users, label: 'All Clients', href: `/dashboard/${userType}/clients` },
        { icon: Stethoscope, label: 'Intake Forms', href: `/dashboard/${userType}/intake-form` },
        { icon: FileText, label: 'Referrals', href: `/dashboard/${userType}/referrals` },
        { icon: FileBarChart, label: 'Reports & Analytics', href: `/dashboard/${userType}/reports` },
        { icon: Map, label: 'Facility Directory', href: `/dashboard/${userType}/facilities` },
        { icon: ContactIcon, label: 'Contacts', href: `/dashboard/${userType}/contacts` },
        { icon: MessageSquare, label: 'Inbox', href: `/dashboard/${userType}/inbox` },
      ];

      // Add payments/contracts for placement agents only
      if (isPlacementAgent) {
        professionalItems.push(
          { icon: CreditCard, label: 'Payments & Commissions', href: '/dashboard/agent/payments' },
          { icon: Briefcase, label: 'Contracts', href: '/dashboard/agent/contracts' }
        );
      }

      // Add org admin section if user is org admin
      if (isOrgAdmin) {
        professionalItems.unshift({
          icon: Shield,
          label: 'Organization Admin',
          href: `/dashboard/${userType}/org-admin`,
          adminOnly: true
        });
      }

      return [...professionalItems, ...baseItems];
    }

    // Facility Portal
    if (userType === 'facility') {
      const facilityItems = [
        { icon: Home, label: 'Dashboard', href: '/dashboard/facility' },
        { icon: Building, label: 'Listing Management', href: '/dashboard/facility/listings' },
        { icon: Users, label: 'Employee Management', href: '/dashboard/facility/employees' },
        { icon: UserCheck, label: 'Residents', href: '/dashboard/facility/residents' },
        { icon: CreditCard, label: 'Payments & Billing', href: '/dashboard/facility/payments' },
        { icon: Briefcase, label: 'Contracts', href: '/dashboard/facility/contracts' },
        { icon: FileText, label: 'Intake Documents', href: '/dashboard/facility/intake-documents' },
        { icon: Video, label: 'Webinars', href: '/dashboard/facility/webinars' },
        { icon: FileBarChart, label: 'Analytics', href: '/dashboard/facility/analytics' },
        { icon: MessageSquare, label: 'Inbox', href: '/dashboard/facility/inbox' },
      ];

      // Add org admin section if user is org admin
      if (isOrgAdmin) {
        facilityItems.unshift({
          icon: Shield,
          label: 'Organization Admin',
          href: '/dashboard/facility/org-admin',
          adminOnly: true
        });
      }

      return [...facilityItems, ...baseItems];
    }

    // Family Portal (unchanged)
    if (userType === 'family') {
      return [
        { icon: Home, label: 'Dashboard', href: '/dashboard/family' },
        { icon: Heart, label: 'Favorites', href: '/dashboard/family/favorites' },
        { icon: Map, label: 'Find Care', href: '/dashboard/find-care' },
        ...baseItems
      ];
    }

    return baseItems;
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

  const getUserRole = () => {
    if (isSuperAdmin) return 'Super Admin';
    if (isOrgAdmin) return `${userType} Admin`.replace(/^\w/, c => c.toUpperCase());
    return userType.charAt(0).toUpperCase() + userType.slice(1);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-brand-navy">HealthPro AVA</h1>
          {isSuperAdmin && (
            <span className="text-xs text-red-600 font-semibold">SUPER ADMIN</span>
          )}
          {isOrgAdmin && !isSuperAdmin && (
            <span className="text-xs text-blue-600 font-semibold">ORG ADMIN</span>
          )}
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
                    : "text-gray-600 hover:bg-gray-100",
                  item.adminOnly && "border-l-4 border-orange-500"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
                {item.adminOnly && <Shield className="ml-auto h-4 w-4 text-orange-500" />}
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
              <p className="text-xs text-gray-500 truncate">
                {getUserRole()}
              </p>
              {profile?.organization && (
                <p className="text-xs text-gray-400 truncate">{profile.organization}</p>
              )}
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
              {isSuperAdmin && (
                <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                  <Crown className="h-4 w-4 mr-2" />
                  Super Admin
                </Button>
              )}
              {isOrgAdmin && !isSuperAdmin && (
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-200">
                  <Shield className="h-4 w-4 mr-2" />
                  Org Admin
                </Button>
              )}
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
