
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import HomePage from "./pages/public/HomePage";
import PricingPage from "./pages/public/PricingPage";
import FindCarePage from "./pages/public/FindCarePage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";

// Family Portal Pages
import FamilyDashboard from "./pages/family/FamilyDashboard";
import FamilyMessaging from "./pages/family/FamilyMessaging";
import SavedFavorites from "./pages/family/SavedFavorites";

// Healthcare Professional Portal Pages
import HealthcareDashboard from "./pages/healthcare/HealthcareDashboard";
import ClientTracking from "./pages/healthcare/ClientTracking";
import ReferralManagement from "./pages/healthcare/ReferralManagement";
import InvoicingTools from "./pages/healthcare/InvoicingTools";
import FacilitiesDirectory from "./pages/healthcare/FacilitiesDirectory";

// Placement Agent Portal Pages
import AgentDashboard from "./pages/agent/AgentDashboard";
import CRM from "./pages/agent/CRM";
import PerformanceDashboard from "./pages/agent/PerformanceDashboard";

// Facility Portal Pages
import FacilityDashboard from "./pages/facility/FacilityDashboard";
import ListingManagement from "./pages/facility/ListingManagement";
import FacilityAnalytics from "./pages/facility/FacilityAnalytics";
import PlacementSpecialists from "./pages/facility/PlacementSpecialists";
import WebinarManagement from "./pages/facility/WebinarManagement";

// New Facility Pages
import FacilitiesGallery from "./pages/FacilitiesGallery";
import FacilitiesMap from "./pages/FacilitiesMap";

import NotFound from "./pages/NotFound";
import AvaEnhanced from "./components/AvaEnhanced";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="find-care" element={<FindCarePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>

            {/* Family Portal Routes */}
            <Route path="/family" element={
              <ProtectedRoute allowedUserTypes={['family']}>
                <DashboardLayout userType="family" />
              </ProtectedRoute>
            }>
              <Route index element={<FamilyDashboard />} />
              <Route path="messaging" element={<FamilyMessaging />} />
              <Route path="favorites" element={<SavedFavorites />} />
            </Route>

            {/* Healthcare Professional Portal Routes */}
            <Route path="/healthcare" element={
              <ProtectedRoute allowedUserTypes={['healthcare']}>
                <DashboardLayout userType="healthcare" />
              </ProtectedRoute>
            }>
              <Route index element={<HealthcareDashboard />} />
              <Route path="clients" element={<ClientTracking />} />
              <Route path="referrals" element={<ReferralManagement />} />
              <Route path="invoicing" element={<InvoicingTools />} />
              <Route path="facilities" element={<FacilitiesDirectory />} />
            </Route>

            {/* Placement Agent Portal Routes */}
            <Route path="/agent" element={
              <ProtectedRoute allowedUserTypes={['agent']}>
                <DashboardLayout userType="agent" />
              </ProtectedRoute>
            }>
              <Route index element={<AgentDashboard />} />
              <Route path="crm" element={<CRM />} />
              <Route path="performance" element={<PerformanceDashboard />} />
            </Route>

            {/* Facility Portal Routes */}
            <Route path="/facility" element={
              <ProtectedRoute allowedUserTypes={['facility']}>
                <DashboardLayout userType="facility" />
              </ProtectedRoute>
            }>
              <Route index element={<FacilityDashboard />} />
              <Route path="listings" element={<ListingManagement />} />
              <Route path="analytics" element={<FacilityAnalytics />} />
              <Route path="specialists" element={<PlacementSpecialists />} />
              <Route path="webinars" element={<WebinarManagement />} />
            </Route>

            {/* Shared Facility Routes */}
            <Route path="/facilities" element={
              <ProtectedRoute allowedUserTypes={['healthcare', 'agent']}>
                <DashboardLayout userType="shared" />
              </ProtectedRoute>
            }>
              <Route index element={<FacilitiesGallery />} />
              <Route path="map" element={<FacilitiesMap />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <AvaEnhanced />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
