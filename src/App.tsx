import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Providers
import { AuthProvider } from '@/contexts/AuthContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';

// Layouts and Pages
import PublicLayout from '@/layouts/PublicLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import HomePage from '@/pages/Public/HomePage';
import FindCarePage from '@/pages/FindCarePage';
import PricingPage from '@/pages/PricingPage';
import LoginPage from '@/pages/public/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import NotFound from '@/pages/NotFound';
import FacilityDetail from '@/pages/FacilityDetail';

// Dashboards
import FamilyDashboard from '@/pages/FamilyDashboard/family';
import FamilyMessaging from '@/pages/FamilyMessaging/family';
import SavedFavorites from '@/pages/SavedFavorites/family';
import AgentDashboard from '@/pages/AgentDashboard/agent';
import HealthcareDashboard from '@/pages/HealthcareDashboard/healthcare';
import FacilityDashboard from '@/pages/FacilityDashboard/facility';

// Shared
import { CalendarPage } from '@/pages/Calendar';
import { ClientIntakeForm } from '@/pages/healthcare/ClientIntakeForm';
import UserProfile from '@/pages/UserProfile';
import ElevenLabsWidget from '@/components/ElevenLabsWidget';

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

          {/* Agent */}
          <Route path="agent" element={<AgentDashboard />} />

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
          <Router>
            <div className="min-h-screen bg-brand-off-white">
              <AppRoutes />
              <FloatingWidgetWrapper />
              <Toaster />
            </div>
          </Router>
        </AccessibilityProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
