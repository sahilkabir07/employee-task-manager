import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const AllTasks = () => {
    const userData = useContext(AuthContext);

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
                {userData.dataEmployees.map((elem, index) => (
                    <div key={index} className='border-2 border-emerald-500 py-2 mb-2 px-4 flex rounded'>
                        <h2 className='text-lg font-medium w-1/5'>{elem.firstname}</h2>
                        <h3 className='w-1/5 text-blue-500 text-lg font-medium text-center'>{elem.taskCount.newTask}</h3>
                        <h3 className='w-1/5 text-yellow-400 text-lg font-medium text-center'>{elem.taskCount.active}</h3>
                        <h3 className='w-1/5 text-green-400 text-lg font-medium text-center'>{elem.taskCount.completed}</h3>
                        <h3 className='w-1/5 text-red-500 text-lg font-medium text-center'>{elem.taskCount.failed}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllTasks;
