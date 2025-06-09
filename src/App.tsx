import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Providers
import { AuthProvider } from '@/contexts/AuthContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import { TempAuthProvider } from '@/contexts/TempAuthContext';

// Layouts and Pages
import PublicLayout from '@/layouts/PublicLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import HomePage from '@/pages/HomePage';
import FindCarePage from '@/pages/FindCarePage';
import PricingPage from '@/pages/PricingPage';
import LoginPage from '@/pages/public/LoginPage';
import RegisterPage from '@/pages/public/RegisterPage';
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
import ElevenLabsWidget from '@/components/ElevenLabsWidget';

// Import new agent pages
import FacilityMapView from '@/pages/agent/FacilityMapView';
import FacilityContactBook from '@/pages/agent/FacilityContactBook';
import DocumentFormBuilder from '@/pages/agent/DocumentFormBuilder';
import InboxMessaging from '@/pages/agent/InboxMessaging';

const queryClient = new QueryClient();

const FloatingWidgetWrapper = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return isHomePage ? null : <ElevenLabsWidget variant="floating" />;
};

function AppRoutes() {
  return (
    <Routes>
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

      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute />}>
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
          <TempAuthProvider>
            <Router>
              <div className="min-h-screen bg-brand-off-white">
                <AppRoutes />
                <FloatingWidgetWrapper />
                <Toaster />
              </div>
            </Router>
          </TempAuthProvider>
        </AccessibilityProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
