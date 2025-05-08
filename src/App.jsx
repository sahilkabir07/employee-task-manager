import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import Header from "./pageComponents/Header";
import { useAuth } from "./context/AuthProvider";
import { useTheme } from "./context/ThemeContext"; // Import the theme hook

function App() {
  const { loggedInUser, logout } = useAuth();
  const { theme } = useTheme(); // Get current theme
  const role = loggedInUser?.role;

  return (
    <div
      className={`min-h-screen ${theme === "light"
        ? "bg-gradient-to-b from-sky-600 to-blue-200"
        : "bg-[#111]"
        } relative overflow-hidden`}
    >
      <img
        src="images/clouds2.jpg"
        alt="clouds"
        className="fixed top-0 left-0 w-full h-full object-cover opacity-50 pointer-events-none z-0"
      />


      <div className="relative z-10">
        <Header loggedInUserData={loggedInUser} handleLogout={logout} />

        <Routes>
          <Route
            path="/"
            element={
              !loggedInUser ? (
                <Login />
              ) : (
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
