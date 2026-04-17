import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import ProtectedRoute from "./auth/ProtectedRoute";

import EmployeeDashboardPage from "./pages/employee/EmployeeDashboardPage";
import UserDashboardPage from "./pages/users/UserDashboardPage";
import UserAttendancePage from "./pages/users/UserAttendancePage";
import ForgotPasswordPage from "./auth/ForgotPasswordPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* ✅ NEW */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute role="EMPLOYEE">
              <EmployeeDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="USER">
              <UserDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/attendance"
          element={
            <ProtectedRoute role="USER">
              <UserAttendancePage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;