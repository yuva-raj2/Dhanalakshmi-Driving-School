import React from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/authStore";
import { AppLayout } from "../../shared/layouts/AppLayout";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role || "")) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

const LazyPage = (path) => {
  const Comp = React.lazy(() => import(`../../features/${path}`));
  return <Comp />;
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: LazyPage("auth/Login"),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: "dashboard",
            element: LazyPage("dashboard/AdminDashboard"),
          },
          {
            path: "students",
            element: LazyPage("students/StudentList"),
          },
          {
            path: "payments",
            element: LazyPage("payments/PaymentHistory"),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);