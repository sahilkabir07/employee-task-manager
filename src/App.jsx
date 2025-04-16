import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";

function App() {
  const [user, setUser] = useState(undefined); // loading state
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
      try {
        const storedUser = JSON.parse(loggedInUser);
        setUser(storedUser.role);
        setLoggedInUserData(storedUser);
      } catch (error) {
        console.error("Error parsing loggedInUser:", error);
        localStorage.removeItem("loggedInUser");
        setUser(null);
        setLoggedInUserData(null);
      }
    } else {
      setUser(null);
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleLogin = ({ email, password }) => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = allUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      setUser(foundUser.role);
      setLoggedInUserData(foundUser);
      return true;
    }

    alert("Invalid credentials");
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setLoggedInUserData(null);
  };

  const handleSignup = (newUserData) => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = [...allUsers, newUserData];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedInUser", JSON.stringify(newUserData));

    setUser(newUserData.role);
    setLoggedInUserData(newUserData);
  };

  if (user === undefined) return <div className="loading-screen">Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <Login handleLogin={handleLogin} />
            ) : (
              <Navigate to={user === "admin" ? "/admin-dashboard" : "/employee-dashboard"} replace />
            )
          }
        />
        <Route path="/signup" element={<Signup handleSignup={handleSignup} />} />
        <Route
          path="/admin-dashboard"
          element={
            user === "admin" ? (
              <AdminDashboard
                changeUser={setUser}
                handleLogout={handleLogout}
                data={loggedInUserData} // Pass data here
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/employee-dashboard"
          element={
            user === "employee" ? (
              <EmployeeDashboard
                data={loggedInUserData}
                changeUser={setUser}
                handleLogout={handleLogout}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
