import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '../../context/ThemeContext';

const EmployeeCard = ({ emp }) => {
    const cardRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 20, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' }
        );
    }, []);

    let newTask = 0, active = 0, completed = 0, failed = 0;

    const tasks = Array.isArray(emp?.tasks) ? emp.tasks : [];

    tasks.forEach(task => {
        if (task.status === 'new') newTask++;
        else if (task.status === 'active') active++;
        else if (task.status === 'completed') completed++;
        else if (task.status === 'failed') failed++;
    });

    return (
        <div
            ref={cardRef}
            className={`rounded-xl p-6 transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-[0_0_15px_#10b98155] hover:border-emerald-500 border border-transparent 
            ${theme === 'dark' ? 'bg-gradient-to-br from-transparent to-[#1c1c1c] border-gray-700 shadow-lg text-white' : 'bg-transparent text-black'}`}
        >
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{emp.name}</h2>
            <p className={`text-gray-300 mb-1 ${theme === 'dark' ? 'text-white' : 'text-sky-800'}`}>Email: {emp.email}</p>
            <p className={`text-gray-300 mb-4 ${theme === 'dark' ? 'text-white' : 'text-sky-800'}`}>Total Tasks: {emp.tasks?.length || 0}</p>

            <div className="grid grid-cols-2 gap-2 text-sm">
                <p><span className="text-green-400 font-medium">New:</span> {newTask}</p>
                <p><span className="text-blue-400 font-medium">Active:</span> {active}</p>
                <p><span className="text-yellow-400 font-medium">Completed:</span> {completed}</p>
                <p><span className="text-red-400 font-medium">Failed:</span> {failed}</p>
            </div>
        </div>
    );
};

export default EmployeeCard;
