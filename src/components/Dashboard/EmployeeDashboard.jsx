import React, { useContext } from 'react';
import TaskListCard from '../../pageComponents/TaskListCard';
import TaskList from '../TaskList/TaskList';
import { AuthContext } from "../../context/AuthProvider";
import { useTheme } from '../../context/ThemeContext';

const EmployeeDashboard = () => {
    const { loggedInUser, employees } = useContext(AuthContext);
    const { theme } = useTheme();

    if (!loggedInUser) {
        return (
            <div className="p-10 bg-[#1C1C1C] h-full text-white">
                <p>Loading employee data...</p>
            </div>
        );
    }

    const employee = employees.find(emp => emp.email === loggedInUser.email);

    if (!employee) {
        return <p className="text-white">No employee found.</p>;
    }

    const taskCounts = {
        new: 0,
        active: 0,
        completed: 0,
        failed: 0,
    };

    employee?.tasks?.forEach(task => {
        if (task.status === 'new') taskCounts.new++;
        else if (task.status === 'active') taskCounts.active++;
        else if (task.status === 'completed') taskCounts.completed++;
        else if (task.status === 'failed') taskCounts.failed++;
    });

    return (
        <div className={`p-10 min-h-screen ${theme === 'light' ? 'bg-transparent' : 'bg-transparent'}`}>
            <TaskListCard taskCounts={taskCounts} />
            <TaskList employeeName={employee.name} />
        </div>
    );
};

export default EmployeeDashboard;
