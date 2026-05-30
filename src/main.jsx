import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/globals.css";

import { AuthProvider } from "./contexts/AuthContext";
import QueryProvider from "./providers/QueryProvider";
import ToastProvider from "./providers/Toastprovider";

import AppRoutes from "./routes";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryProvider>
        <AppRoutes />
        <ToastProvider />
      </QueryProvider>
    </AuthProvider>
  </React.StrictMode>
);