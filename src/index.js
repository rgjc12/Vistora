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
import SignupPage from "./pages/Auth/SignupPage";
import VerificationPage from "./pages/Auth/VerificationPage";
//import Profile from "./pages/Profile/Profile";
import DashboardMainPage from "./pages/Dashboard/DashboardMainPage";
import { store } from "./store/store";
import { Provider } from "react-redux";
import ClaimsSummaryPage from "./pages/Dashboard/ClaimsSummaryPage";
import DasboardSettingsPage from "./pages/Dashboard/DasboardSettingsPage";
import TasksPage from "./pages/Dashboard/TasksPage";
import AppWrapper from "./pages/AppWrapper/AppWrapper";
import NotificationsPage from "./pages/Dashboard/NotificationsPage";
import TaskDetailPage from "./pages/Dashboard/TaskDetailPage";
import ClaimPage from "./pages/Dashboard/ClaimPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
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
            {/**
             * 
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verification" element={<VerificationPage />} />
            <Route path="/profile" element={<Profile />} />
             */}
            <Route path="/dashboard" element={<DashboardMainPage />} />
            <Route
              path="/dashboard/claims-summary"
              element={<ClaimsSummaryPage />}
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
          </Routes>
        </AppWrapper>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
