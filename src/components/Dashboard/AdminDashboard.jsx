import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import EmployeeCard from "./EmployeeCard";
import CreateTask from "../../pageComponents/CreateTask";
import { useTheme } from "../../context/ThemeContext";  // Assuming you have this context

const AdminDashboard = () => {
    const { employees } = useContext(AuthContext);
    const { theme } = useTheme();

    const filteredEmployees = employees.filter(emp => emp.role === "employee");

    const bgColor = theme === 'light' ? 'bg-transparent' : 'bg-transparent';
    const textColor = theme === 'light' ? 'text-transparent' : 'text-transparent';

    return (
        <div className={`${bgColor} ${textColor} p-10 min-h-screen`}>
            <CreateTask />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-6">
                {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp) => (
                        <EmployeeCard key={emp.email} emp={emp} />
                    ))
                ) : (
                    <p className="text-lg col-span-full text-center">
                        No employees found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
