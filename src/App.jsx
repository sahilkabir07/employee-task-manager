import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { AuthContext } from "./context/AuthProvider";

function App() {
  const [user, setUser] = useState(undefined);
  const [loggedInUserData, setLoggedInUserData] = useState(null);

  const userData = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
      try {
        const userData = JSON.parse(loggedInUser);
        if (userData && userData.role) {
          setUser(userData.role);
          setLoggedInUserData(userData.data || null);
        }
      } catch (error) {
        console.error("Error parsing loggedInUser:", error);
        localStorage.removeItem("loggedInUser");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const handleLogin = (email, password) => {
    if (email === "admin@example.com" && password === "123") {
      const adminData = { role: "admin" };
      localStorage.setItem("loggedInUser", JSON.stringify(adminData));
      setUser("admin");
    } else if (userData?.dataEmployees) {
      const employee = userData.dataEmployees.find(
        (e) => e.email === email && e.password === password
      );

      if (employee) {
        const employeeData = { role: "employees", data: employee };
        localStorage.setItem("loggedInUser", JSON.stringify(employeeData));
        setUser("employees");
        setLoggedInUserData(employee);
      } else {
        alert("Invalid credentials");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setLoggedInUserData(null);
  };

  if (user === undefined) return <div className="loading-screen">Loading...</div>;

  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : null}
      {user === "admin" ? <AdminDashboard changeUser={setUser} /> : null}
      {user === "employees" ? <EmployeeDashboard data={loggedInUserData} changeUser={setUser} /> : null}
    </>
  );
}

export default App;
