
import React, { useState } from 'react';
import {
  LayoutDashboard,
  Search,
  MessageSquare,
  Heart,
  FileText,
  Users,
  Building,
  Receipt,
  BarChart3,
  Database,
  Calendar,
  User,
  MapPin,
  Mail,
  Settings
} from 'lucide-react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSuperUser } from '@/contexts/SuperUserContext';

const DashboardLayout = () => {
  const { user, switchPortal } = useSuperUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handlePortalSwitch = (portal: 'family' | 'healthcare' | 'agent' | 'facility') => {
    switchPortal(portal);
    navigate(`/dashboard/${portal}`);
  };

  const getNavigationItems = () => {
    if (!user?.currentPortal) return [];

    const baseItems = [
      { 
        icon: LayoutDashboard, 
        label: 'Dashboard', 
        href: `/dashboard/${user.currentPortal}` 
      }
    ];

    const roleSpecificItems = {
      family: [
        { icon: Search, label: 'Find Care', href: '/find-care' },
        { icon: MessageSquare, label: 'Messages', href: '/dashboard/family/messaging' },
        { icon: Heart, label: 'Saved Favorites', href: '/dashboard/family/favorites' },
      ],
      healthcare: [
        { icon: FileText, label: 'Client Intake', href: '/dashboard/healthcare/intake-form' },
        { icon: Users, label: 'Client Tracking', href: '/dashboard/healthcare/clients' },
        { icon: Building, label: 'Facilities Directory', href: '/dashboard/healthcare/facilities' },
        { icon: Receipt, label: 'Invoicing', href: '/dashboard/healthcare/invoicing' },
      ],
      agent: [
        { icon: MapPin, label: 'Facility Map', href: '/dashboard/agent/facility-map' },
        { icon: Users, label: 'Contact Book', href: '/dashboard/agent/contacts' },
        { icon: FileText, label: 'Form Builder', href: '/dashboard/agent/form-builder' },
        { icon: Mail, label: 'Inbox', href: '/dashboard/agent/inbox' },
        { icon: BarChart3, label: 'Performance', href: '/dashboard/agent/performance' },
        { icon: Database, label: 'CRM', href: '/dashboard/agent/crm' },
      ],
      facility: [
        { icon: Building, label: 'Listing Management', href: '/dashboard/facility/listings' },
        { icon: BarChart3, label: 'Analytics', href: '/dashboard/facility/analytics' },
        { icon: Users, label: 'Placement Specialists', href: '/dashboard/facility/specialists' },
        { icon: Calendar, label: 'Events & Webinars', href: '/dashboard/facility/webinars' },
      ]
    };

    const sharedItems = [
      { icon: Calendar, label: 'Calendar', href: '/dashboard/calendar' },
      { icon: User, label: 'Profile & Settings', href: '/dashboard/profile' },
    ];

    return [
      ...baseItems,
      ...(roleSpecificItems[user.currentPortal] || []),
      ...sharedItems
    ];
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-background-main">
      {/* Mobile Navigation */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="md:hidden absolute top-4 left-4 z-50">
            Menu
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-xs pt-6">
          <SheetHeader>
            <SheetTitle>Dashboard Menu</SheetTitle>
          </SheetHeader>
          <Separator className="my-4" />
          
          {/* Portal Switcher - Mobile */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">Current Portal</label>
            <Select value={user?.currentPortal} onValueChange={handlePortalSwitch}>
              <SelectTrigger>
                <SelectValue placeholder="Select Portal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="family">Family Portal</SelectItem>
                <SelectItem value="healthcare">Healthcare Portal</SelectItem>
                <SelectItem value="agent">Agent Portal</SelectItem>
                <SelectItem value="facility">Facility Portal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col space-y-2">
            {navigationItems.map((item) => (
              <Link 
                key={item.href} 
                to={item.href} 
                className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-accent hover:text-accent-foreground" 
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen fixed top-0 left-0 z-40 shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-center mb-4">
            <span className="text-lg font-bold text-brand-navy">HealthProAssist</span>
          </div>
          
          {/* Portal Switcher - Desktop */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Current Portal</label>
            <Select value={user?.currentPortal} onValueChange={handlePortalSwitch}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Portal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="family">Family Portal</SelectItem>
                <SelectItem value="healthcare">Healthcare Portal</SelectItem>
                <SelectItem value="agent">Agent Portal</SelectItem>
                <SelectItem value="facility">Facility Portal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Separator className="my-2" />
        
        <div className="flex flex-col space-y-1 p-2 flex-1">
          {navigationItems.map((item) => (
            <Link 
              key={item.href} 
              to={item.href} 
              className={`flex items-center space-x-3 py-3 px-4 rounded-md hover:bg-gray-100 transition-colors ${
                location.pathname === item.href ? 'bg-brand-sky/10 text-brand-sky border-r-2 border-brand-sky font-medium' : 'text-gray-700'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        
        {/* User Info at Bottom */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <p className="font-medium">Super User</p>
            <p className="text-xs">Full Access Mode</p>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="md:ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
