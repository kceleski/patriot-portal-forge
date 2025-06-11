
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
import FacilitiesMap from '@/pages/FacilitiesMap';
import FacilityDetail from '@/pages/FacilityDetail';
import ResourcesPage from '@/pages/public/ResourcesPage';
import SubscribedProvidersDirectory from '@/pages/SubscribedProvidersDirectory';
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
        <Route path="facilities-map" element={<FacilitiesMap />} />     
        <Route path="facilities-gallery" element={<FacilitiesGallery />} />
        <Route path="facilities-directory" element={<FacilitiesDirectory />} />
        <Route path="subscribed-providers" element={<SubscribedProvidersDirectory />} />
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
          <Route path="superuser/users" element={<div>Super User - Users Management</div>} />
          <Route path="superuser/facilities" element={<div>Super User - Facilities Management</div>} />
          <Route path="superuser/organizations" element={<div>Super User - Organizations Management</div>} />
          <Route path="superuser/analytics" element={<div>Super User - Analytics</div>} />
          <Route path="superuser/payments" element={<div>Super User - Payments</div>} />

          {/* Super Admin Routes */}
          <Route path="super-admin" element={<SuperAdminDashboard />} />
          <Route path="super-admin/users" element={<div>Super Admin Users Management</div>} />
          <Route path="super-admin/facilities" element={<div>Super Admin Facilities Management</div>} />
          <Route path="super-admin/organizations" element={<div>Super Admin Organizations Management</div>} />
          <Route path="super-admin/analytics" element={<div>Super Admin Analytics</div>} />
          <Route path="super-admin/payments" element={<div>Super Admin Payments</div>} />

          {/* Family Routes */}
          <Route path="family" element={<FamilyDashboard />} />
          <Route path="family/messaging" element={<FamilyMessaging />} />
          <Route path="family/favorites" element={<SavedFavorites />} />

          {/* Agent Routes (Professional Portal) */}
          <Route path="agent" element={<AgentDashboard />} />
          <Route path="agent/clients" element={<AllClients />} />
          <Route path="agent/new-client" element={<NewClient />} />
          <Route path="agent/intake-form" element={<ClientIntakeForm />} />
          <Route path="agent/referrals" element={<div>Agent Referrals</div>} />
          <Route path="agent/reports" element={<PerformanceDashboard />} />
          <Route path="agent/facilities" element={<FacilityMapView />} />
          <Route path="agent/contacts" element={<FacilityContactBook />} />
          <Route path="agent/inbox" element={<InboxMessaging />} />
          <Route path="agent/payments" element={<UniversalInvoicing userType="agent" title="Payments & Commissions" />} />
          <Route path="agent/contracts" element={<div>Agent Contracts</div>} />
          <Route path="agent/org-admin" element={<OrganizationAdmin userType="agent" organizationName="Sample Agency" />} />

          {/* Healthcare Routes (Professional Portal) */}
          <Route path="healthcare" element={<HealthcareDashboard />} />
          <Route path="healthcare/clients" element={<AllClients />} />
          <Route path="healthcare/new-client" element={<NewClient />} />
          <Route path="healthcare/intake-form" element={<ClientIntakeForm />} />
          <Route path="healthcare/referrals" element={<div>Healthcare Referrals</div>} />
          <Route path="healthcare/reports" element={<PerformanceDashboard />} />
          <Route path="healthcare/facilities" element={<FacilityMapView />} />
          <Route path="healthcare/contacts" element={<FacilityContactBook />} />
          <Route path="healthcare/inbox" element={<InboxMessaging />} />
          <Route path="healthcare/org-admin" element={<OrganizationAdmin userType="healthcare" organizationName="Sample Health System" />} />

          {/* Facility Routes */}
          <Route path="facility" element={<FacilityDashboard />} />
          <Route path="facility/listings" element={<ListingManagement />} />
          <Route path="facility/employees" element={<EmployeeManagement />} />
          <Route path="facility/residents" element={<div>Resident Management</div>} />
          <Route path="facility/payments" element={<FacilityPayments />} />
          <Route path="facility/contracts" element={<div>Facility Contracts</div>} />
          <Route path="facility/intake-documents" element={<div>Intake Documents</div>} />
          <Route path="facility/webinars" element={<div>Webinar Management</div>} />
          <Route path="facility/analytics" element={<div>Facility Analytics</div>} />
          <Route path="facility/inbox" element={<InboxMessaging />} />
          <Route path="facility/org-admin" element={<OrganizationAdmin userType="facility" organizationName="Sample Facility Group" />} />

          {/* Shared Routes */}
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="find-care" element={<FindCarePage />} />
          <Route path="messaging" element={<div>Universal Messaging</div>} />
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
