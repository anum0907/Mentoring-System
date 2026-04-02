// import { Routes, Route } from "react-router-dom";

// import Login from "./pages/auth/Login";

// // Dashboards
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import MentorDashboard from "./pages/mentor/MentorDashboard";
// import UserDashboard from "./pages/user/UserDashboard";

// // Availability pages
// import UserAvailability from "./pages/user/UserAvailability";
// import MentorAvailability from "./pages/mentor/MentorAvailability";

// // Protected route
// import ProtectedRoute from "./routes/ProtectedRoute";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       {/* LOGIN */}
//       <Route path="/" element={<Login />} />

//       {/* USER */}
//       <Route
//         path="/user"
//         element={
//           <ProtectedRoute role="user">
//             <UserDashboard />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/user/availability"
//         element={
//           <ProtectedRoute role="user">
//             <UserAvailability />
//           </ProtectedRoute>
//         }
//       />

//       {/* MENTOR */}
//       <Route
//         path="/mentor"
//         element={
//           <ProtectedRoute role="mentor">
//             <MentorDashboard />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/mentor/availability"
//         element={
//           <ProtectedRoute role="mentor">
//             <MentorAvailability />
//           </ProtectedRoute>
//         }
//       />

//       {/* ADMIN */}
//       <Route
//         path="/admin"
//         element={
//           <ProtectedRoute role="admin">
//             <AdminDashboard />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }



import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";

// Dashboards
import AdminDashboard from "./pages/admin/AdminDashboard";
import MentorDashboard from "./pages/mentor/MentorDashboard";
import UserDashboard from "./pages/user/UserDashboard";

// Availability pages
import UserAvailability from "./pages/user/UserAvailability";
import MentorAvailability from "./pages/mentor/MentorAvailability";

// ADD THIS IMPORT
import OverlapPage from "./pages/admin/OverlapPage";

// Protected route
import ProtectedRoute from "./routes/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/" element={<Login />} />

      {/* USER */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/availability"
        element={
          <ProtectedRoute role="user">
            <UserAvailability />
          </ProtectedRoute>
        }
      />

      {/* MENTOR */}
      <Route
        path="/mentor"
        element={
          <ProtectedRoute role="mentor">
            <MentorDashboard />
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

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* 🔥 NEW OVERLAP + BOOK PAGE */}
      <Route
        path="/admin/overlap"
        element={
          <ProtectedRoute role="admin">
            <OverlapPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
