
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

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

import NotFound from "./pages/NotFound";
import Ava from "./components/Ava";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          <Route path="/family" element={<DashboardLayout userType="family" />}>
            <Route index element={<FamilyDashboard />} />
            <Route path="messaging" element={<FamilyMessaging />} />
            <Route path="favorites" element={<SavedFavorites />} />
          </Route>

          {/* Healthcare Professional Portal Routes */}
          <Route path="/healthcare" element={<DashboardLayout userType="healthcare" />}>
            <Route index element={<HealthcareDashboard />} />
            <Route path="clients" element={<ClientTracking />} />
            <Route path="referrals" element={<ReferralManagement />} />
            <Route path="invoicing" element={<InvoicingTools />} />
            <Route path="facilities" element={<FacilitiesDirectory />} />
          </Route>

          {/* Placement Agent Portal Routes */}
          <Route path="/agent" element={<DashboardLayout userType="agent" />}>
            <Route index element={<AgentDashboard />} />
            <Route path="crm" element={<CRM />} />
            <Route path="performance" element={<PerformanceDashboard />} />
          </Route>

          {/* Facility Portal Routes */}
          <Route path="/facility" element={<DashboardLayout userType="facility" />}>
            <Route index element={<FacilityDashboard />} />
            <Route path="listings" element={<ListingManagement />} />
            <Route path="analytics" element={<FacilityAnalytics />} />
            <Route path="specialists" element={<PlacementSpecialists />} />
            <Route path="webinars" element={<WebinarManagement />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Ava />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
