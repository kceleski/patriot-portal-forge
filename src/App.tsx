import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Providers
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';

// Layouts and Pages
import PublicLayout from '@/layouts/PublicLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import HomePage from '@/pages/public/HomePage';
import FindCarePage from '@/pages/FindCarePage';
import PricingPage from '@/pages/public/PricingPage';
import LoginPage from '@/pages/public/LoginPage';
import RegisterPage from '@/pages/public/RegisterPage';
import SuperUserLogin from '@/pages/SuperUserLogin';
import NotFound from '@/pages/NotFound';
import FacilityDetail from '@/pages/FacilityDetail';
import ResourcesPage from '@/pages/public/ResourcesPage';
import FacilitiesDirectory from '@/pages/healthcare/FacilitiesDirectory';

// Dashboards
import FamilyDashboard from '@/pages/family/FamilyDashboard';
import FamilyMessaging from '@/pages/family/FamilyMessaging';
import SavedFavorites from '@/pages/family/SavedFavorites';
import AgentDashboard from '@/pages/agent/AgentDashboard';
import AllClients from '@/pages/agent/AllClients';
import PerformanceDashboard from '@/pages/agent/PerformanceDashboard';
import HealthcareDashboard from '@/pages/healthcare/HealthcareDashboard';
import FacilityDashboard from '@/pages/facility/FacilityDashboard';

// Admin Pages
import SuperAdminDashboard from '@/pages/admin/SuperAdminDashboard';

// Shared
import { CalendarPage } from '@/pages/Calendar';
import { ClientIntakeForm } from '@/pages/healthcare/ClientIntakeForm';
import UserProfile from '@/pages/UserProfile';
import ElevenLabsAgent from '@/components/ElevenLabsAgent';
import FacilitiesGallery from '@/pages/public/FacilitiesGallery';

// Import agent pages
import FacilityMapView from '@/pages/agent/FacilityMapView';
import FacilityContactBook from '@/pages/agent/FacilityContactBook';
import DocumentFormBuilder from '@/pages/agent/DocumentFormBuilder';
import InboxMessaging from '@/pages/agent/InboxMessaging';
import NewClient from '@/pages/agent/NewClient';

// Import facility pages
import ListingManagement from '@/pages/facility/ListingManagement';
import EmployeeManagement from '@/pages/facility/EmployeeManagement';
import FacilityPayments from '@/pages/facility/FacilityPayments';

// Import shared components
import UniversalCRM from '@/components/shared/UniversalCRM';
import UniversalInvoicing from '@/components/shared/UniversalInvoicing';
import OrganizationAdmin from '@/components/shared/OrganizationAdmin';

// Add the import at the top
import PresentationMockData from '@/components/presentation/PresentationMockData';
import SuperUserDashboard from '@/pages/admin/SuperAdminDashboard';
import PlaceholderPage from '@/pages/shared/PlaceholderPage';
import StorepointFacilities from './pages/StorepointFacilities';

const queryClient = new QueryClient();

const FloatingAgentWrapper = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/super-login';
  return (isHomePage || isLoginPage) ? null : <ElevenLabsAgent />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Super User Login - kept separate for dev access */}
      <Route path="/super-login" element={<SuperUserLogin />} />

      {/* Presentation Route - for demo purposes */}
      <Route path="/presentation" element={
        <div className="min-h-screen">
          <PresentationMockData />
        </div>
      } />

      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="find-care" element={<FindCarePage />} />
        <Route path="facility/:id" element={<FacilityDetail />} />
        <Route path="facilities-gallery" element={<FacilitiesGallery />} />
        <Route path="facilities-directory" element={<FacilitiesDirectory />} />
        <Route path="subscribed-providers" element={<StorepointFacilities />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Protected Routes - Now using proper authentication */}
      <Route path="/dashboard" element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* Super User Routes */}
          <Route path="superuser" element={<SuperUserDashboard />} />
          <Route path="superuser/users" element={<PlaceholderPage title="User Management" description="Manage all users across the platform" backPath="/dashboard/superuser" />} />
          <Route path="superuser/facilities" element={<PlaceholderPage title="Facility Management" description="Manage all facilities on the platform" backPath="/dashboard/superuser" />} />
          <Route path="superuser/organizations" element={<PlaceholderPage title="Organization Management" description="Manage all organizations" backPath="/dashboard/superuser" />} />
          <Route path="superuser/analytics" element={<PlaceholderPage title="System Analytics" description="View platform-wide analytics and reports" backPath="/dashboard/superuser" />} />
          <Route path="superuser/payments" element={<PlaceholderPage title="Payment Management" description="Monitor all payments and transactions" backPath="/dashboard/superuser" />} />

          {/* Super Admin Routes */}
          <Route path="super-admin" element={<SuperAdminDashboard />} />
          <Route path="super-admin/users" element={<PlaceholderPage title="Admin User Management" description="Advanced user administration tools" backPath="/dashboard/super-admin" />} />
          <Route path="super-admin/facilities" element={<PlaceholderPage title="Admin Facility Management" description="Advanced facility administration" backPath="/dashboard/super-admin" />} />
          <Route path="super-admin/organizations" element={<PlaceholderPage title="Admin Organization Management" description="Advanced organization administration" backPath="/dashboard/super-admin" />} />
          <Route path="super-admin/analytics" element={<PlaceholderPage title="Admin Analytics" description="Advanced analytics and reporting tools" backPath="/dashboard/super-admin" />} />
          <Route path="super-admin/payments" element={<PlaceholderPage title="Admin Payment Management" description="Advanced payment administration" backPath="/dashboard/super-admin" />} />

          {/* Family Routes */}
          <Route path="family" element={<FamilyDashboard />} />
          <Route path="family/messaging" element={<FamilyMessaging />} />
          <Route path="family/favorites" element={<SavedFavorites />} />

          {/* Agent Routes (Professional Portal) */}
          <Route path="agent" element={<AgentDashboard />} />
          <Route path="agent/clients" element={<AllClients />} />
          <Route path="agent/new-client" element={<NewClient />} />
          <Route path="agent/intake-form" element={<ClientIntakeForm />} />
          <Route path="agent/referrals" element={<PlaceholderPage title="Agent Referrals" description="Manage client referrals and track their progress" backPath="/dashboard/agent" />} />
          <Route path="agent/reports" element={<PerformanceDashboard />} />
          <Route path="agent/facilities" element={<FacilityMapView />} />
          <Route path="agent/contacts" element={<FacilityContactBook />} />
          <Route path="agent/inbox" element={<InboxMessaging />} />
          <Route path="agent/payments" element={<UniversalInvoicing userType="agent" title="Payments & Commissions" />} />
          <Route path="agent/contracts" element={<PlaceholderPage title="Agent Contracts" description="View and manage your service contracts" backPath="/dashboard/agent" />} />
          <Route path="agent/org-admin" element={<OrganizationAdmin userType="agent" organizationName="Sample Agency" />} />

          {/* Healthcare Routes (Professional Portal) */}
          <Route path="healthcare" element={<HealthcareDashboard />} />
          <Route path="healthcare/clients" element={<AllClients />} />
          <Route path="healthcare/new-client" element={<NewClient />} />
          <Route path="healthcare/intake-form" element={<ClientIntakeForm />} />
          <Route path="healthcare/referrals" element={<PlaceholderPage title="Healthcare Referrals" description="Manage patient referrals and care coordination" backPath="/dashboard/healthcare" />} />
          <Route path="healthcare/reports" element={<PerformanceDashboard />} />
          <Route path="healthcare/facilities" element={<FacilityMapView />} />
          <Route path="healthcare/contacts" element={<FacilityContactBook />} />
          <Route path="healthcare/inbox" element={<InboxMessaging />} />
          <Route path="healthcare/org-admin" element={<OrganizationAdmin userType="healthcare" organizationName="Sample Health System" />} />

          {/* Facility Routes */}
          <Route path="facility" element={<FacilityDashboard />} />
          <Route path="facility/listings" element={<ListingManagement />} />
          <Route path="facility/employees" element={<EmployeeManagement />} />
          <Route path="facility/residents" element={<PlaceholderPage title="Resident Management" description="Manage current and prospective residents" backPath="/dashboard/facility" />} />
          <Route path="facility/payments" element={<FacilityPayments />} />
          <Route path="facility/contracts" element={<PlaceholderPage title="Facility Contracts" description="Manage service agreements and contracts" backPath="/dashboard/facility" />} />
          <Route path="facility/intake-documents" element={<PlaceholderPage title="Intake Documents" description="Manage resident intake documentation" backPath="/dashboard/facility" />} />
          <Route path="facility/webinars" element={<PlaceholderPage title="Webinar Management" description="Schedule and manage educational webinars" backPath="/dashboard/facility" />} />
          <Route path="facility/analytics" element={<PlaceholderPage title="Facility Analytics" description="View facility performance metrics and reports" backPath="/dashboard/facility" />} />
          <Route path="facility/inbox" element={<InboxMessaging />} />
          <Route path="facility/org-admin" element={<OrganizationAdmin userType="facility" organizationName="Sample Facility Group" />} />

          {/* Shared Routes */}
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="find-care" element={<FindCarePage />} />
          <Route path="messaging" element={<PlaceholderPage title="Universal Messaging" description="Secure messaging platform for all stakeholders" backPath="/dashboard" />} />
        </Route>
      </Route>

      {/* Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AccessibilityProvider>
          <Router>
            <div className="min-h-screen bg-brand-off-white">
              <AppRoutes />
              <FloatingAgentWrapper />
              <Toaster />
            </div>
          </Router>
        </AccessibilityProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
