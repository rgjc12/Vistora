import "./styles/globals.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/LandingPage/App";
import Auth from "./pages/Auth/Auth";
import FAQ from "./pages/FAQ/FAQ";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage"; // 👈 Import it here
import LoginPage from "./pages/Auth/LoginPage"; // optional, if separated
import "./styles/index.css";
//import Profile from "./pages/Profile/Profile";
import DashboardMainPage from "./pages/Dashboard/Provider Dash/DashboardMainPage";
import { store } from "./store/store";
import { Provider } from "react-redux";
import ClaimsSummaryPage from "./pages/Dashboard/Provider Dash/ClaimsSummaryPage";
import DasboardSettingsPage from "./pages/Dashboard/Provider Dash/DasboardSettingsPage";
import TasksPage from "./pages/Dashboard/Provider Dash/TasksPage";
import AppWrapper from "./pages/AppWrapper/AppWrapper";
import NotificationsPage from "./pages/Dashboard/Provider Dash/NotificationsPage";
import TaskDetailPage from "./pages/Dashboard/Provider Dash/TaskDetailPage";
import ClaimPage from "./pages/Dashboard/Provider Dash/ClaimPage";
//import ProviderDash from "./pages/Dashboard/Provider Dash/ProviderDash";
import ProfilePage from "./pages/Dashboard/Provider Dash/ProfilePage";
import ToastManager from "./components/ui/ToastManager";
import SubmitClaimPage from "./pages/Dashboard/Provider Dash/SubmitClaimPage";
import HelpAndSupportPage from "./pages/Dashboard/Provider Dash/HelpAndSupportPage";
import DashboardTpaHome from "./pages/Dashboard/TPA-Dash/DashboardTpaHome";
import ClaimsReviewPage from "./pages/Dashboard/TPA-Dash/ClaimsReviewPage";
import FlaggedClaimsPage from "./pages/Dashboard/TPA-Dash/FlaggedClaimsPage";
import FraudSignalsPage from "./pages/Dashboard/TPA-Dash/FraudSignalsPage";
import Providers from "./pages/Dashboard/TPA-Dash/Providers";
import AppealsManagementPage from "./pages/Dashboard/TPA-Dash/AppealsManagementPage";
import TeamManagementPage from "./pages/Dashboard/TPA-Dash/TeamManagementPage";
import SettingsPage from "./pages/Dashboard/TPA-Dash/SettingsPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastManager>
          <AppWrapper>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/login" element={<LoginPage />} />{" "}
              {/* Optional */}
              <Route
                path="/auth/forgot-password"
                element={<ForgotPasswordPage />}
              />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path="/dashboard" element={<DashboardMainPage />} />
              {/* Provider */}
              <Route
                path="/dashboard/claims-summary"
                element={<ClaimsSummaryPage />}
              />
              <Route
                path="/dashboard/SubmitClaim"
                element={<SubmitClaimPage />}
              />
              <Route path="/dashboard/claims" element={<ClaimPage />} />
              <Route
                path="/dashboard/settings"
                element={<DasboardSettingsPage />}
              />
              <Route path="/dashboard/tasks" element={<TasksPage />} />
              <Route
                path="/dashboard/tasks/:taskId/taskDetails"
                element={<TaskDetailPage />}
              />
              <Route
                path="/dashboard/notifications"
                element={<NotificationsPage />}
              />
              <Route path="/dashboard/help" element={<HelpAndSupportPage />} />
              <Route path="/dashboard/profile" element={<ProfilePage />} />
              {/* Provider */}
              {/* TPA */}
              <Route
                path="/dashboard/tpa/home"
                element={<DashboardTpaHome />}
              />
              <Route
                path="/dashboard/tpa/claimsReview"
                element={<ClaimsReviewPage />}
              />
              <Route
                path="/dashboard/tpa/flaggedClaims"
                element={<FlaggedClaimsPage />}
              />
              <Route
                path="/dashboard/tpa/fraudSignals"
                element={<FraudSignalsPage />}
              />
              <Route path="/dashboard/tpa/providers" element={<Providers />} />
              <Route
                path="/dashboard/tpa/appealsManagement"
                element={<AppealsManagementPage />}
              />
              <Route
                path="/dashboard/tpa/teamManagement"
                element={<TeamManagementPage />}
              />
              <Route
                path="/dashboard/tpa/settings"
                element={<SettingsPage />}
              />
              {/* TPA */}
            </Routes>
          </AppWrapper>
        </ToastManager>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
