import React from 'react';
import Header from '../../pageComponents/Header';
import TaskListCard from '../../pageComponents/TaskListCard';
import TaskList from '../TaskList/TaskList';

const EmployeeDashboard = ({ changeUser, data }) => {
    if (!data) {
        return (
            <div className="p-10 bg-[#1C1C1C] h-full text-white">
                <p>Loading employee data...</p>
            </div>
        );
    }

    return (
        <div className="p-10 bg-[#1C1C1C] h-full">
            <Header changeUser={changeUser} data={data} />
            <TaskListCard data={data} />
            <TaskList employeeName={data.name} />
        </div>
    );
};

export default EmployeeDashboard;
