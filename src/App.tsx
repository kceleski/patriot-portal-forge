import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import components
import PublicLayout from '@/layouts/PublicLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/layouts/DashboardLayout';
import NotFound from '@/pages/NotFound';
import ElevenLabsWidget from '@/components/ElevenLabsWidget';

// Public Pages
import HomePage from '@/pages/HomePage';
import FindCarePage from '@/pages/FindCarePage';
import PricingPage from '@/pages/PricingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

// Dashboard Pages
import FamilyDashboard from '@/pages/family/FamilyDashboard';
import AgentDashboard from '@/pages/agent/AgentDashboard';
import HealthcareDashboard from '@/pages/healthcare/HealthcareDashboard';
import FacilityDashboard from '@/pages/facility/FacilityDashboard';

// Family Routes
import FamilyMessaging from '@/pages/family/FamilyMessaging';
import SavedFavorites from '@/pages/family/SavedFavorites';

// Agent Routes
import CRM from '@/pages/agent/CRM';
import PerformanceDashboard from '@/pages/agent/PerformanceDashboard';

// Healthcare Professional Routes
import FacilitiesDirectory from '@/pages/healthcare/FacilitiesDirectory';
import ReferralManagement from '@/pages/healthcare/ReferralManagement';
import InvoicingTools from '@/pages/healthcare/InvoicingTools';
import ClientTracking from '@/pages/healthcare/ClientTracking';

// Facility Routes
import ListingManagement from '@/pages/facility/ListingManagement';
import FacilityAnalytics from '@/pages/facility/FacilityAnalytics';
import PlacementSpecialists from '@/pages/facility/PlacementSpecialists';
import WebinarManagement from '@/pages/facility/WebinarManagement';

// Shared Routes
import FacilitiesGallery from '@/pages/FacilitiesGallery';
import FacilitiesMap from '@/pages/FacilitiesMap';

// Contexts
import { AuthProvider } from '@/contexts/AuthContext';
import { CalendarPage } from '@/pages/Calendar';

const queryClient = new QueryClient();

const FloatingWidgetWrapper = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  if (isHomePage) {
    return null;
  }
  
  return <ElevenLabsWidget variant="floating" />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background-main">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path="find-care" element={<FindCarePage />} />
                <Route path="pricing" element={<PricingPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </Route>

              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardLayout />}>
                  {/* Family Dashboard */}
                  <Route path="family" element={<FamilyDashboard />} />
                  <Route path="family/messaging" element={<FamilyMessaging />} />
                  <Route path="family/favorites" element={<SavedFavorites />} />

                  {/* Agent Dashboard */}
                  <Route path="agent" element={<AgentDashboard />} />
                  <Route path="agent/crm" element={<CRM />} />
                  <Route path="agent/performance" element={<PerformanceDashboard />} />

                  {/* Healthcare Professional Dashboard */}
                  <Route path="healthcare" element={<HealthcareDashboard />} />
                  <Route path="healthcare/facilities" element={<FacilitiesDirectory />} />
                  <Route path="healthcare/referrals" element={<ReferralManagement />} />
                  <Route path="healthcare/invoicing" element={<InvoicingTools />} />
                  <Route path="healthcare/clients" element={<ClientTracking />} />

                  {/* Facility Dashboard */}
                  <Route path="facility" element={<FacilityDashboard />} />
                  <Route path="facility/listings" element={<ListingManagement />} />
                  <Route path="facility/analytics" element={<FacilityAnalytics />} />
                  <Route path="facility/specialists" element={<PlacementSpecialists />} />
                  <Route path="facility/webinars" element={<WebinarManagement />} />

                  {/* Shared routes */}
                  <Route path="facilities" element={<FacilitiesGallery />} />
                  <Route path="facilities/map" element={<FacilitiesMap />} />
                  <Route path="calendar" element={<CalendarPage />} />
                </Route>
              </Route>

              {/* Catch all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            {/* Floating widget for all pages except homepage */}
            <FloatingWidgetWrapper />
            
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
