import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Header from "../../pageComponents/Header";
import EmployeeCard from "./EmployeeCard";
import CreateTask from "../../pageComponents/CreateTask";

const AdminDashboard = (props) => {
    const { employees } = useContext(AuthContext);

    const adminName = props.data?.name || "Admin"; // Make sure data is passed

    return (
        <div className="p-10 bg-[#1C1C1C] min-h-screen">
            <Header changeUser={props.changeUser} data={props.data} />
            <CreateTask />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-6">
                {employees?.length > 0 ? (
                    employees.map((emp, index) => (
                        <EmployeeCard key={index} emp={emp} />
                    ))
                ) : (
                    <p className="text-white">No employees found.</p>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
