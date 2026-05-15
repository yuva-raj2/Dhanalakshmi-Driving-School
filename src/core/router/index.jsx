import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../store/authStore';
import { AppLayout } from '../../shared/components/layout/AppLayout';
import { PublicLayout } from '../../shared/layouts/PublicLayout';
import { Spinner } from '../../shared/components/ui/Spinner';

// Lazy load pages for code splitting
const LandingPage = lazy(() => import('../../features/landing/LandingPage.jsx'));
const Login = lazy(() => import('../../features/auth/Login.jsx'));
const Register = lazy(() => import('../../features/auth/Register.jsx')); // ✅ Fixed
const ForgotPassword = lazy(() => import('../../features/auth/ForgotPassword.jsx')); // ✅ Added if missing
const AdminDashboard = lazy(() => import('../../features/dashboard/AdminDashboard.jsx'));
const StudentDashboard = lazy(() => import('../../features/dashboard/StudentDashboard.jsx'));
const StudentList = lazy(() => import('../../features/students/StudentList.jsx'));
const PaymentHistory = lazy(() => import('../../features/payments/PaymentHistory.jsx'));

// Protected Route Component
const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <Outlet />;
};

// Public Route Component (redirects to dashboard if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Spinner size="lg" className="mt-20" />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <PublicRoute>
            <Suspense fallback={<Spinner size="lg" className="mt-20" />}>
              <Login />
            </Suspense>
          </PublicRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <PublicRoute>
            <Suspense fallback={<Spinner size="lg" className="mt-20" />}>
              <Register />
            </Suspense>
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: 'dashboard',
            element: (
              <Suspense fallback={<Spinner size="lg" className="mt-20" />}>
                <AdminDashboard />
              </Suspense>
            ),
          },
          {
            path: 'my-dashboard',
            element: (
              <Suspense fallback={<Spinner size="lg" className="mt-20" />}>
                <StudentDashboard />
              </Suspense>
            ),
          },
          {
            path: 'students',
            element: (
              <Suspense fallback={<Spinner size="lg" className="mt-20" />}>
                <StudentList />
              </Suspense>
            ),
          },
          {
            path: 'payments',
            element: (
              <Suspense fallback={<Spinner size="lg" className="mt-20" />}>
                <PaymentHistory />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);