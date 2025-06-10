
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

// Dashboards
import FamilyDashboard from '@/pages/family/FamilyDashboard';
import FamilyMessaging from '@/pages/family/FamilyMessaging';
import SavedFavorites from '@/pages/family/SavedFavorites';
import AgentDashboard from '@/pages/agent/AgentDashboard';
import AllClients from '@/pages/agent/AllClients';
import PerformanceDashboard from '@/pages/agent/PerformanceDashboard';
import HealthcareDashboard from '@/pages/healthcare/HealthcareDashboard';
import FacilityDashboard from '@/pages/facility/FacilityDashboard';

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

// Import new facility pages
import ListingManagement from '@/pages/facility/ListingManagement';
import EmployeeManagement from '@/pages/facility/EmployeeManagement';
import FacilityPayments from '@/pages/facility/FacilityPayments';

// Add the import at the top
import PresentationMockData from '@/components/presentation/PresentationMockData';

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
        <Route path="subscribed-providers" element={<SubscribedProvidersDirectory />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Protected Routes - Now using proper authentication */}
      <Route path="/dashboard" element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* Family */}
          <Route path="family" element={<FamilyDashboard />} />
          <Route path="family/messaging" element={<FamilyMessaging />} />
          <Route path="family/favorites" element={<SavedFavorites />} />

          {/* Agent */}
          <Route path="agent" element={<AgentDashboard />} />
          <Route path="agent/clients" element={<AllClients />} />
          <Route path="agent/performance" element={<PerformanceDashboard />} />
          <Route path="agent/new-client" element={<NewClient />} />
          <Route path="agent/facility-map" element={<FacilityMapView />} />
          <Route path="agent/contacts" element={<FacilityContactBook />} />
          <Route path="agent/form-builder" element={<DocumentFormBuilder />} />
          <Route path="agent/inbox" element={<InboxMessaging />} />

          {/* Healthcare */}
          <Route path="healthcare" element={<HealthcareDashboard />} />
          <Route path="healthcare/intake-form" element={<ClientIntakeForm />} />

          {/* Facility */}
          <Route path="facility" element={<FacilityDashboard />} />
          <Route path="facility/listings" element={<ListingManagement />} />
          <Route path="facility/employees" element={<EmployeeManagement />} />
          <Route path="facility/payments" element={<FacilityPayments />} />

          {/* Shared */}
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="find-care" element={<FindCarePage />} />
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
