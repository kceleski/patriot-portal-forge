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
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import NotFound from '@/pages/NotFound';
import FacilityDetail from '@/pages/FacilityDetail';
import FamilyDashboard from '@/pages/family/FamilyDashboard';
import FamilyMessaging from '@/pages/family/FamilyMessaging';
import SavedFavorites from '@/pages/family/SavedFavorites';
import UserProfile from '@/pages/UserProfile';
import AgentDashboard from '@/pages/agent/AgentDashboard';
import HealthcareDashboard from '@/pages/healthcare/HealthcareDashboard';
import FacilityDashboard from '@/pages/facility/FacilityDashboard';
import { CalendarPage } from '@/pages/Calendar';
import { ClientIntakeForm } from '@/pages/healthcare/ClientIntakeForm';
import ElevenLabsWidget from '@/components/ElevenLabsWidget';

const queryClient = new QueryClient();

const FloatingWidgetWrapper = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  if (isHomePage) return null;
  return <ElevenLabsWidget variant="floating" />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AccessibilityProvider>
          <Router>
            <div className="min-h-screen bg-brand-off-white">
              <Routes>
                <Route path="/" element={<PublicLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="find-care" element={<FindCarePage />} />
                  <Route path="facility/:id" element={<FacilityDetail />} />
                  <Route path="pricing" element={<PricingPage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                </Route>

                <Route path="/dashboard" element={<ProtectedRoute />}>
                  <Route element={<DashboardLayout />}>
                    {/* Family Routes */}
                    <Route path="family" element={<FamilyDashboard />} />
                    <Route path="family/messaging" element={<FamilyMessaging />} />
                    <Route path="family/favorites" element={<SavedFavorites />} />

                    {/* Agent Routes */}
                    <Route path="agent" element={<AgentDashboard />} />

                    {/* Healthcare Routes */}
                    <Route path="healthcare" element={<HealthcareDashboard />} />
                    <Route path="healthcare/intake-form" element={<ClientIntakeForm />} />
                    
                    {/* Facility Routes */}
                    <Route path="facility" element={<FacilityDashboard />} />
                    
                    {/* Shared Routes */}
                    <Route path="calendar" element={<CalendarPage />} />
                    <Route path="profile" element={<UserProfile />} />
                  </Route>
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
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
