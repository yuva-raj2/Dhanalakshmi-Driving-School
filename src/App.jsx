import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import GlobalErrorBoundary from '@components/ui/GlobalErrorBoundary.jsx';
import PageLoader from '@components/ui/PageLoader.jsx';
import { useAuthStore } from '@store/authStore.js';

// ─── Lazy-loaded layouts ──────────────────────────────────────
const PublicLayout   = lazy(() => import('@components/layout/PublicLayout.jsx'));
const AppLayout      = lazy(() => import('@components/layout/AppLayout.jsx'));
const ProtectedRoute = lazy(() => import('@components/auth/ProtectedRoute.jsx'));

// ─── Lazy-loaded pages ────────────────────────────────────────
const LandingPage       = lazy(() => import('@pages/public/LandingPage.jsx'));
const LoginPage         = lazy(() => import('@pages/auth/LoginPage.jsx'));
const RegisterPage      = lazy(() => import('@pages/auth/RegisterPage.jsx'));
const ForgotPasswordPage = lazy(() => import('@pages/auth/ForgotPasswordPage.jsx'));

// Dashboard pages
const AdminDashboard    = lazy(() => import('@pages/dashboard/AdminDashboard.jsx'));
const StudentDashboard  = lazy(() => import('@pages/dashboard/StudentDashboard.jsx'));
const InstructorDashboard = lazy(() => import('@pages/dashboard/InstructorDashboard.jsx'));

// Student management
const StudentListPage   = lazy(() => import('@pages/students/StudentListPage.jsx'));
const StudentDetailPage = lazy(() => import('@pages/students/StudentDetailPage.jsx'));
const StudentFormPage   = lazy(() => import('@pages/students/StudentFormPage.jsx'));

// Other pages
const AttendancePage    = lazy(() => import('@pages/attendance/AttendancePage.jsx'));
const PaymentsPage      = lazy(() => import('@pages/payments/PaymentsPage.jsx'));
const VehiclesPage      = lazy(() => import('@pages/vehicles/VehiclesPage.jsx'));
const NotificationsPage = lazy(() => import('@pages/notifications/NotificationsPage.jsx'));
const SettingsPage      = lazy(() => import('@pages/settings/SettingsPage.jsx'));
const NotFoundPage      = lazy(() => import('@pages/NotFoundPage.jsx'));
const UnauthorizedPage  = lazy(() => import('@pages/UnauthorizedPage.jsx'));

// ─── Role-based default routes ────────────────────────────────
const ROLE_HOME_MAP = {
  ADMIN:      '/admin/dashboard',
  INSTRUCTOR: '/instructor/dashboard',
  STUDENT:    '/student/dashboard',
  SUPER_ADMIN: '/admin/dashboard',
};

function RoleRedirect() {
  const { user } = useAuthStore();
  const destination = user?.role ? ROLE_HOME_MAP[user.role] : '/login';
  return <Navigate to={destination} replace />;
}

export default function App() {
  return (
    <GlobalErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ── Public Routes ── */}
          <Route element={<PublicLayout />}>
            <Route path="/"              element={<LandingPage />} />
            <Route path="/login"         element={<LoginPage />} />
            <Route path="/register"      element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          {/* ── Protected: Admin ── */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']} />}>
            <Route element={<AppLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/students"  element={<StudentListPage />} />
              <Route path="/admin/students/new"     element={<StudentFormPage />} />
              <Route path="/admin/students/:id"     element={<StudentDetailPage />} />
              <Route path="/admin/students/:id/edit" element={<StudentFormPage />} />
              <Route path="/admin/attendance"   element={<AttendancePage />} />
              <Route path="/admin/payments"     element={<PaymentsPage />} />
              <Route path="/admin/vehicles"     element={<VehiclesPage />} />
              <Route path="/admin/notifications" element={<NotificationsPage />} />
              <Route path="/admin/settings"     element={<SettingsPage />} />
            </Route>
          </Route>

          {/* ── Protected: Instructor ── */}
          <Route element={<ProtectedRoute allowedRoles={['INSTRUCTOR', 'ADMIN', 'SUPER_ADMIN']} />}>
            <Route element={<AppLayout />}>
              <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
              <Route path="/instructor/attendance" element={<AttendancePage />} />
              <Route path="/instructor/students"   element={<StudentListPage />} />
              <Route path="/instructor/settings"   element={<SettingsPage />} />
            </Route>
          </Route>

          {/* ── Protected: Student ── */}
          <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
            <Route element={<AppLayout />}>
              <Route path="/student/dashboard"   element={<StudentDashboard />} />
              <Route path="/student/attendance"  element={<AttendancePage />} />
              <Route path="/student/payments"    element={<PaymentsPage />} />
              <Route path="/student/settings"    element={<SettingsPage />} />
            </Route>
          </Route>

          {/* ── Auth redirect ── */}
          <Route path="/app" element={<ProtectedRoute allowedRoles={['ADMIN','INSTRUCTOR','STUDENT','SUPER_ADMIN']} />}>
            <Route index element={<RoleRedirect />} />
          </Route>

          {/* ── Error pages ── */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*"             element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </GlobalErrorBoundary>
  );
}