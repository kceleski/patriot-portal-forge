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
  Mail
} from 'lucide-react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/contexts/AuthContext';
import TempLoginModal from '@/components/TempLoginModal';

const DashboardLayout = () => {
  const { profile } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getNavigationItems = () => {
    if (!profile?.user_type) return [];

    const baseItems = [
      { 
        icon: LayoutDashboard, 
        label: 'Dashboard', 
        href: `/dashboard/${profile.user_type}` 
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
      ...(roleSpecificItems[profile.user_type] || []),
      ...sharedItems
    ];
  };

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
          <div className="flex flex-col space-y-2">
            {getNavigationItems().map((item) => (
              <Link key={item.href} to={item.href} className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-accent hover:text-accent-foreground" onClick={() => setIsSidebarOpen(false)}>
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-col w-64 bg-secondary text-secondary-foreground border-r border-muted h-screen fixed top-0 left-0 z-40">
        <div className="p-4 flex items-center justify-center">
          <span className="text-lg font-bold">HealthProAssist</span>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-col space-y-2 p-2">
          {getNavigationItems().map((item) => (
            <Link key={item.href} to={item.href} className={`flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-accent hover:text-accent-foreground ${location.pathname === item.href ? 'bg-accent text-accent-foreground font-medium' : ''}`}>
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          ))}
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
