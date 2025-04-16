import React from 'react';

const EmployeeCard = ({ emp }) => {
    return (
        <div className="rounded-xl p-6 shadow-md bg-[#2D2D2D] text-white">
            <h2 className="text-xl font-semibold mb-2">{emp.name}</h2>
            <p className="text-gray-300 mb-1">Email: {emp.email}</p>
            <p className="text-gray-300">Tasks Assigned: {emp.tasks?.length || 0}</p>
        </div>
    );
};

export default EmployeeCard;
