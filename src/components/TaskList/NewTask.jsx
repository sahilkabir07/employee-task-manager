import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const NewTask = ({ data }) => {
    const { updateTaskStatus } = useContext(AuthContext);

    const handleAccept = () => {
        updateTaskStatus(data.assignedTo, data.id, 'active');
    };

    return (
        <div className='flex-shrink-0 h-full w-[300px] bg-red-400 rounded-xl p-5'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 px-3 py-1 rounded text-white'>{data.category}</h3>
                <h4 className='text-sm text-white'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold text-white'>{data.taskTitle}</h2>
            <p className='text-sm mt-2 text-white'>{data.taskDescription}</p>

            <div className='flex justify-between mt-4'>
                {data.newTask && !data.active && !data.completed && !data.failed && (
                    <button
                        onClick={handleAccept}
                        className='bg-green-600 py-1 px-3 text-sm rounded text-white w-full hover:bg-green-700'
                    >
                        Accept Task
                    </button>
                )}
            </div>
        </div>
    );
};

export default NewTask;
