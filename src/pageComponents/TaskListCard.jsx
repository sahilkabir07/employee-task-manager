import React from 'react'

const TaskListCard = ({ data }) => {
    if (!data || !data.taskCount) return <div>Loading...</div>;

    return (
        <div className='flex mt-10 justify-between gap-5 screen'>
            <div className='rounded-xl w-[45%] py-6 px-9 !bg-red-400'>
                <h2 className='text-3xl font-semibold !bg-red-400 text-white'>{data.taskCount.newTask ?? 0}</h2>
                <h3 className='text-xl font-medium !bg-red-400 text-white'>New Task</h3>
            </div>
            <div className='rounded-xl w-[45%] py-6 px-9 !bg-blue-400'>
                <h2 className='text-3xl font-semibold !bg-blue-400 text-white'>{data.taskCount.completed ?? 0}</h2>
                <h3 className='text-xl font-medium !bg-blue-400 text-white'>Completed Task</h3>
            </div>
            <div className='rounded-xl w-[45%] py-6 px-9 !bg-green-400'>
                <h2 className='text-3xl font-semibold !bg-green-400 text-white'>{data.taskCount.active ?? 0}</h2>
                <h3 className='text-xl font-medium !bg-green-400 text-white'>Active Task</h3>
            </div>
            <div className='rounded-xl w-[45%] py-6 px-9 !bg-yellow-400'>
                <h2 className='text-3xl font-semibold !bg-yellow-400 text-white'>{data.taskCount.failed ?? 0}</h2>
                <h3 className='text-xl font-medium !bg-yellow-400 text-white'>Failed Task</h3>
            </div>
        </div>
    )
}

export default TaskListCard;
