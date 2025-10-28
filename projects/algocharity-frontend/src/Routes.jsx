import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import WalletIntegration from './pages/wallet-integration';
import AdminPanel from './pages/admin-panel';
import CauseDetailsPage from './pages/cause-details';
import LandingPage from './pages/landing-page';
import CharityDashboard from './pages/charity-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/wallet-integration" element={<WalletIntegration />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/cause-details" element={<CauseDetailsPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/charity-dashboard" element={<CharityDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
