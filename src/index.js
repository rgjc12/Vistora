import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Auth from "./Auth/Auth"; 
import  "./index.css"
import FAQ from "./FAQ/FAQ"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/FAQ" element={<FAQ />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
