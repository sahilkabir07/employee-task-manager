import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const TaskCard = ({ task, employeeName }) => {
    const { updateTaskStatus } = useContext(AuthContext);

    const handleStatusUpdate = (status) => {
        updateTaskStatus(employeeName, task.id, status);
    };

    return (
        <div className="bg-[#2C2C2C] text-white p-5 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">{task.taskTitle || 'Untitled Task'}</h2> {/* Changed to 'taskTitle' */}
            <p className="text-sm mb-4">{task.taskDescription || 'No description provided'}</p> {/* Changed to 'taskDescription' */}

            <div className="flex gap-3">
                <button
                    onClick={() => handleStatusUpdate('accept')}
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white"
                >
                    Accept
                </button>
                <button
                    onClick={() => handleStatusUpdate('complete')}
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
                >
                    Complete
                </button>
                <button
                    onClick={() => handleStatusUpdate('fail')}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
                >
                    Fail
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
