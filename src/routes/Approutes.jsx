import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/AdminDashboard";
import MentorDashboard from "../pages/mentor/MentorDashboard";
import UserDashboard from "../pages/user/UserDashboard";

import UserAvailability from "../pages/user/UserAvailability";
import MentorAvailability from "../pages/mentor/MentorAvailability";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mentor"
        element={
          <ProtectedRoute role="mentor">
            <MentorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* ✅ NEW ROUTES (STEP 2) */}

      <Route
        path="/user/availability"
        element={
          <ProtectedRoute role="user">
            <UserAvailability />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mentor/availability"
        element={
          <ProtectedRoute role="mentor">
            <MentorAvailability />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}