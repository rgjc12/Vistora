import "./styles/globals.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import Auth from "./pages/Auth/Auth";
import FAQ from "./pages/FAQ/FAQ";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage"; // 👈 Import it here
import LoginPage from "./pages/Auth/LoginPage"; // optional, if separated
import "./styles/index.css";
import { AuthProvider } from "./contexts/AuthContext";
import SignupPage from "./pages/Auth/SignupPage";
import VerificationPage from "./pages/Auth/VerificationPage";
import Profile from "./pages/Profile/Profile";
import { Provider } from 'react-redux';
import store from './pages/Profile/store/StoreIndex';


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store ={store}>
    <BrowserRouter>
    <AuthProvider> 
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/login" element={<LoginPage />} /> {/* Optional */}
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
