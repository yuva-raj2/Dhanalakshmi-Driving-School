import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import PublicLayout from "../layouts/PublicLayout";
import StudentListPage from "../pages/students/StudentListPage";
import StudentDetailPage from "../pages/students/StudentDetailPage";
import LoginPage from "../pages/auth/LoginPage";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import LandingPage from "../pages/public/LandingPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ProtectedRoute from "./ProtectdRoute";
import PaymentHistoryPage from "../pages/payments/PaymentHistoryPage";
import AttendancePage from "../pages/attendance/AttendancePage";
import SettingsPage from "../pages/settings/SettingsPage";
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

<Route
  path="/forgot-password"
  element={<ForgotPasswordPage />}
/>
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route
  path="/students"
  element={<StudentListPage />}
/>

<Route
  path="/students/:id"
  element={<StudentDetailPage />}
/>
          <Route
            path="/dashboard"
            element={<AdminDashboard />}
          />
          <Route
  path="/payments"
  element={<PaymentHistoryPage />}
/>

<Route
  path="/attendance"
  element={<AttendancePage />}
/>

<Route
  path="/settings"
  element={<SettingsPage />}
/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}