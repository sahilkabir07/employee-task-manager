import React from 'react';

const TaskListCard = ({ employees = [] }) => {
    let newTask = 0, active = 0, completed = 0, failed = 0;

    employees.forEach(emp => {
        emp?.tasks?.forEach(task => {
            if (task.newTask) newTask++;
            if (task.active) active++;
            if (task.completed) completed++;
            if (task.failed) failed++;
        });
    });

    const cards = [
        { label: 'New Task', count: newTask, bg: 'bg-red-500' },
        { label: 'Completed Task', count: completed, bg: 'bg-blue-500' },
        { label: 'Active Task', count: active, bg: 'bg-green-500' },
        { label: 'Failed Task', count: failed, bg: 'bg-yellow-500' },
    ];

    return (
        <div className='flex mt-10 justify-between flex-wrap gap-5'>
            {cards.map(({ label, count, bg }) => (
                <div key={label} className={`rounded-xl w-[45%] py-6 px-9 ${bg}`}>
                    <h2 className='text-3xl font-semibold text-white'>{count}</h2>
                    <h3 className='text-xl font-medium text-white'>{label}</h3>
                </div>
            ))}
        </div>
    );
};

export default TaskListCard;
