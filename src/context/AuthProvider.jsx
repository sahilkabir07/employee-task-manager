import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [taskCounts, setTaskCounts] = useState({
        newTask: 0,
        active: 0,
        completed: 0,
        failed: 0,
    });

    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
        const storedUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

        setEmployees(storedEmployees);
        setLoggedInUser(storedUser);
    }, []);

    useEffect(() => {
        localStorage.setItem("employees", JSON.stringify(employees));
        updateTaskCounts();
    }, [employees]);

    useEffect(() => {
        if (loggedInUser) {
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        } else {
            localStorage.removeItem("loggedInUser");
        }
    }, [loggedInUser]);

    const updateTaskCounts = () => {
        const counts = { newTask: 0, active: 0, completed: 0, failed: 0 };

        employees.forEach(emp => {
            emp.tasks?.forEach(task => {
                if (counts[task.status] !== undefined) {
                    counts[task.status]++;
                }
            });
        });

        setTaskCounts(counts);
    };

    const login = (email, password) => {
        const user = employees.find((u) => u.email === email && u.password === password);

        if (user) {
            setLoggedInUser(user);
            return true;
        }
        return false;
    };

    const logout = () => {
        setLoggedInUser(null);
        localStorage.removeItem("loggedInUser");
        navigate("/login");
    };

    const registerEmployee = (userData) => {
        const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];

        const existing = storedEmployees.find(user => user.email === userData.email);
        if (existing) return false;

        const newUser = { ...userData, tasks: [] };
        const updatedEmployees = [...storedEmployees, newUser];

        setEmployees(updatedEmployees);
        setLoggedInUser(newUser);

        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        localStorage.setItem("loggedInUser", JSON.stringify(newUser));

        return true;
    };

    const assignTask = (employeeEmail, task) => {
        const updatedEmployees = employees.map(emp =>
            emp.email === employeeEmail
                ? {
                    ...emp,
                    tasks: [
                        ...(emp.tasks || []),
                        { ...task, assignedBy: loggedInUser?.name || "Admin" },
                    ],
                }
                : emp
        );

        const employeeExists = updatedEmployees.find(emp => emp.email === employeeEmail);
        if (!employeeExists) return false;

        setEmployees(updatedEmployees);
        return true;
    };

    const updateTaskStatus = (employeeEmail, taskId, newStatus) => {
        const updatedEmployees = employees.map((emp) => {
            if (emp.email === employeeEmail) {
                const updatedTasks = emp.tasks.map((task) =>
                    task.id === taskId ? { ...task, status: newStatus } : task
                );
                return { ...emp, tasks: updatedTasks };
            }
            return emp;
        });

        setEmployees(updatedEmployees);
    };

    return (
        <AuthContext.Provider
            value={{
                loggedInUser,
                employees,
                taskCounts,
                login,
                logout,
                registerEmployee,
                assignTask,
                updateTaskStatus,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
