import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient } from 'react-query';

// Import components
import PublicLayout from '@/layouts/PublicLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/layouts/DashboardLayout';
import NotFound from '@/pages/NotFound';

// Public Pages
import HomePage from '@/pages/HomePage';
import FindCarePage from '@/pages/FindCarePage';
import PricingPage from '@/pages/PricingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

// Dashboard Pages
import FamilyDashboard from '@/pages/dashboards/FamilyDashboard';
import AgentDashboard from '@/pages/dashboards/AgentDashboard';
import HealthcareDashboard from '@/pages/dashboards/HealthcareDashboard';
import FacilityDashboard from '@/pages/dashboards/FacilityDashboard';

// Family Routes
import FamilyMessaging from '@/pages/dashboards/family/FamilyMessaging';
import SavedFavorites from '@/pages/dashboards/family/SavedFavorites';

// Agent Routes
import CRM from '@/pages/dashboards/agent/CRM';
import PerformanceDashboard from '@/pages/dashboards/agent/PerformanceDashboard';

// Healthcare Professional Routes
import FacilitiesDirectory from '@/pages/dashboards/healthcare/FacilitiesDirectory';
import ReferralManagement from '@/pages/dashboards/healthcare/ReferralManagement';
import InvoicingTools from '@/pages/dashboards/healthcare/InvoicingTools';
import ClientTracking from '@/pages/dashboards/healthcare/ClientTracking';

// Facility Routes
import ListingManagement from '@/pages/dashboards/facility/ListingManagement';
import FacilityAnalytics from '@/pages/dashboards/facility/FacilityAnalytics';
import PlacementSpecialists from '@/pages/dashboards/facility/PlacementSpecialists';
import WebinarManagement from '@/pages/dashboards/facility/WebinarManagement';

// Shared Routes
import FacilitiesGallery from '@/pages/FacilitiesGallery';
import FacilitiesMap from '@/pages/FacilitiesMap';

// Contexts
import { AuthProvider } from '@/contexts/AuthContext';
import { CalendarPage } from '@/pages/Calendar';

function App() {
  return (
    <QueryClient>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-primary-cream">
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
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClient>
  );
}

export default App;
