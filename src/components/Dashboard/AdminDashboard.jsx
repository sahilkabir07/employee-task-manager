import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import EmployeeCard from "./EmployeeCard";
import CreateTask from "../../pageComponents/CreateTask";

const AdminDashboard = () => {
    const { employees } = useContext(AuthContext);

    // Filter only employee roles
    const filteredEmployees = employees.filter(emp => emp.role === "employee");

    return (
        <div className="p-10 bg-[#1C1C1C] min-h-screen">
            <CreateTask />

            {/* Employee Task Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-6">
                {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp) => (
                        <EmployeeCard key={emp.email} emp={emp} />
                    ))
                ) : (
                    <p className="text-white text-lg col-span-full text-center">
                        No employees found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
