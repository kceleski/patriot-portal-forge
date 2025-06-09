
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Providers
import { AuthProvider } from '@/contexts/AuthContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import { SuperUserProvider } from '@/contexts/SuperUserContext';

// Layouts and Pages
import PublicLayout from '@/layouts/PublicLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import SuperUserProtectedRoute from '@/components/SuperUserProtectedRoute';
import HomePage from '@/pages/public/HomePage';
import FindCarePage from '@/pages/FindCarePage';
import PricingPage from '@/pages/public/PricingPage';
import LoginPage from '@/pages/public/LoginPage';
import RegisterPage from '@/pages/public/RegisterPage';
import SuperUserLogin from '@/pages/SuperUserLogin';
import NotFound from '@/pages/NotFound';
import FacilitiesMap from '@/pages/FacilitiesMap';
import FacilityDetail from '@/pages/FacilityDetail';

// Dashboards
import FamilyDashboard from '@/pages/family/FamilyDashboard';
import FamilyMessaging from '@/pages/family/FamilyMessaging';
import SavedFavorites from '@/pages/family/SavedFavorites';
import AgentDashboard from '@/pages/agent/AgentDashboard';
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
      {/* Super User Login */}
      <Route path="/super-login" element={<SuperUserLogin />} />

      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="find-care" element={<FindCarePage />} />
        <Route path="facility/:id" element={<FacilityDetail />} />
        <Route path="facilities-map" element={<FacilitiesMap />} />     
        <Route path="pricing" element={<PricingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Protected Routes - Requires Super User Authentication */}
      <Route path="/dashboard" element={<SuperUserProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* Family */}
          <Route path="family" element={<FamilyDashboard />} />
          <Route path="family/messaging" element={<FamilyMessaging />} />
          <Route path="family/favorites" element={<SavedFavorites />} />

          {/* Agent - Enhanced with new features */}
          <Route path="agent" element={<AgentDashboard />} />
          <Route path="agent/facility-map" element={<FacilityMapView />} />
          <Route path="agent/contacts" element={<FacilityContactBook />} />
          <Route path="agent/form-builder" element={<DocumentFormBuilder />} />
          <Route path="agent/inbox" element={<InboxMessaging />} />

          {/* Healthcare */}
          <Route path="healthcare" element={<HealthcareDashboard />} />
          <Route path="healthcare/intake-form" element={<ClientIntakeForm />} />

          {/* Facility */}
          <Route path="facility" element={<FacilityDashboard />} />

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
          <SuperUserProvider>
            <Router>
              <div className="min-h-screen bg-brand-off-white">
                <AppRoutes />
                <FloatingAgentWrapper />
                <Toaster />
              </div>
            </Router>
          </SuperUserProvider>
        </AccessibilityProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
