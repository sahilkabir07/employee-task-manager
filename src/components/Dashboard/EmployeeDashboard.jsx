import React, { useContext } from 'react';
import Header from '../../pageComponents/Header';
import TaskListCard from '../../pageComponents/TaskListCard';
import TaskList from '../TaskList/TaskList';
import { AuthContext } from '../../context/AuthProvider'; // 🔥 use context

const EmployeeDashboard = ({ changeUser, data }) => {
    const { employees } = useContext(AuthContext); // 🔥 Get the latest employees from context

    // 🔥 Match the current employee using name
    const currentEmployee = employees.find(
        (emp) => emp.name.toLowerCase() === data?.name.toLowerCase()
    );

    if (!currentEmployee) {
        return (
            <div className="p-10 bg-[#1C1C1C] h-full text-white">
                <p>Loading employee data...</p>
            </div>
        );
    }

    return (
        <div className="p-10 bg-[#1C1C1C] h-full">
            <Header changeUser={changeUser} data={currentEmployee} />
            <TaskListCard employee={currentEmployee} /> {/* ✅ pass correct updated data */}
            <TaskList employeeName={currentEmployee.name} />
        </div>
    );
};

export default EmployeeDashboard;
