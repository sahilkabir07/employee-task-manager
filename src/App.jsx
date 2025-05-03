import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Import Routes and Route for routing
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import Header from "./pageComponents/Header";
import { useAuth } from "./context/AuthProvider";

function App() {
  const { loggedInUser, logout } = useAuth();  // Use the useAuth hook to get loggedInUser and logout
  const role = loggedInUser?.role;

  return (
    <>
      <Header loggedInUserData={loggedInUser} handleLogout={logout} />
      <Routes>
        <Route
          path="/"
          element={
            !role ? ( // If no role, show Login
              <Login />
            ) : (
              // Redirect based on role (admin or employee)
              <Navigate
                to={role === "admin" ? "/admin-dashboard" : "/employee-dashboard"}
                replace
              />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin-dashboard"
          element={role === "admin" ? <AdminDashboard /> : <Navigate to="/" replace />}
        />
        <Route
          path="/employee-dashboard"
          element={role === "employee" ? <EmployeeDashboard /> : <Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
