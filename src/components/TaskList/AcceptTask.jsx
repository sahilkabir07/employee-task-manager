import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const AcceptTask = ({ data }) => {
    const { updateTaskStatus } = useContext(AuthContext);

    const handleComplete = () => {
        updateTaskStatus(data.assignedTo, data.id, 'completed');
    };

    const handleFail = () => {
        updateTaskStatus(data.assignedTo, data.id, 'failed');
    };

    return (
        <div className='flex-shrink-0 h-full w-[300px] bg-yellow-400 rounded-xl p-5'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-yellow-600 px-3 py-1 rounded text-white'>{data.category}</h3>
                <h4 className='text-sm text-white'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold text-white'>{data.taskTitle}</h2>
            <p className='text-sm mt-2 text-white'>{data.taskDescription}</p>

            <div className='flex justify-between mt-4 gap-2'>
                {!data.completed && !data.failed && (
                    <>
                        <button
                            onClick={handleComplete}
                            className='bg-green-600 py-1 px-3 text-sm rounded text-white hover:bg-green-700 w-1/2'
                        >
                            Mark as Completed
                        </button>
                        <button
                            onClick={handleFail}
                            className='bg-red-600 py-1 px-3 text-sm rounded text-white hover:bg-red-700 w-1/2'
                        >
                            Mark as Failed
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AcceptTask;
