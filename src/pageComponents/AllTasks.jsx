import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const AllTasks = () => {
    const { users } = useContext(AuthContext);

    return (
        <div className='bg-[#1c1c1c] p-5 mt-5 rounded'>
            <div className='bg-red-400 py-2 mb-2 px-4 flex rounded'>
                <h2 className='text-lg font-medium w-1/5'>Employee Name</h2>
                <h3 className='text-lg font-medium w-1/5 text-center'>New Task</h3>
                <h3 className='text-lg font-medium w-1/5 text-center'>Active Task</h3>
                <h3 className='text-lg font-medium w-1/5 text-center'>Completed Task</h3>
                <h3 className='text-lg font-medium w-1/5 text-center'>Failed Task</h3>
            </div>

            <div>
                {users && users.length > 0 ? (
                    users.map((elem, index) => (
                        <div key={index} className='border-2 border-emerald-500 py-2 mb-2 px-4 flex rounded'>
                            <h2 className='text-lg font-medium w-1/5'>{elem.firstname}</h2>
                            <h3 className='w-1/5 text-blue-500 text-lg font-medium text-center'>{elem.taskCount?.newTask || 0}</h3>
                            <h3 className='w-1/5 text-yellow-400 text-lg font-medium text-center'>{elem.taskCount?.active || 0}</h3>
                            <h3 className='w-1/5 text-green-400 text-lg font-medium text-center'>{elem.taskCount?.completed || 0}</h3>
                            <h3 className='w-1/5 text-red-500 text-lg font-medium text-center'>{elem.taskCount?.failed || 0}</h3>
                        </div>
                    ))
                ) : (
                    <p className="text-white text-center">No employee data available.</p>
                )}
            </div>
        </div>
    );
};

export default AllTasks;
