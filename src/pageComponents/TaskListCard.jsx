import React from 'react';

const TaskListCard = ({ taskCounts }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-10 px-4 w-full">
            <div className="rounded-2xl min-h-[130px] p-6 bg-red-600 text-white">
                <h2 className="text-4xl font-extrabold">{taskCounts.new}</h2>
                <h3 className="text-lg font-medium mt-2">New Tasks</h3>
            </div>
            <div className="rounded-2xl min-h-[130px] p-6 bg-blue-600 text-white">
                <h2 className="text-4xl font-extrabold">{taskCounts.active}</h2>
                <h3 className="text-lg font-medium mt-2">Active Tasks</h3>
            </div>
            <div className="rounded-2xl min-h-[130px] p-6 bg-green-600 text-white">
                <h2 className="text-4xl font-extrabold">{taskCounts.completed}</h2>
                <h3 className="text-lg font-medium mt-2">Completed Tasks</h3>
            </div>
            <div className="rounded-2xl min-h-[130px] p-6 bg-yellow-600 text-white">
                <h2 className="text-4xl font-extrabold">{taskCounts.failed}</h2>
                <h3 className="text-lg font-medium mt-2">Failed Tasks</h3>
            </div>
        </div>
    );
};

export default TaskListCard;
