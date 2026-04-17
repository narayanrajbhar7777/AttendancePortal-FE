import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext"; // ✅ import
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>   {/* ✅ REQUIRED */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);