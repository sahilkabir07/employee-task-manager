import React, { useContext, useEffect, useRef } from "react";
import TaskCard from "./TaskCard";
import { AuthContext } from "../../context/AuthProvider";
import gsap from "gsap";
import { useTheme } from '../../context/ThemeContext';

const TaskList = ({ employeeName }) => {
    const { employees } = useContext(AuthContext);
    const taskContainerRef = useRef(null);
    const { theme } = useTheme();

    const employee = employees.find(
        (emp) => emp.name.toLowerCase() === employeeName.toLowerCase()
    );

    if (!employee) {
        return (
            <div className="text-white text-center mt-10">
                <p>Employee not found.</p>
            </div>
        );
    }

    const tasks = employee?.tasks || [];

    useEffect(() => {
        if (taskContainerRef.current && tasks.length > 0) {
            gsap.fromTo(
                taskContainerRef.current.children,
                { opacity: 0, scale: 0.9, y: 20 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 0.5,
                    ease: "power3.out",
                }
            );
        }
    }, [tasks]);

    return (
        <div className={`mt-10 ${theme === 'light' ? 'bg-transparent text-black' : 'bg-transparent text-white'} min-h-screen`}>
            {tasks.length === 0 ? (
                <div className="flex items-center justify-center h-[60vh] text-xl font-semibold">
                    No tasks assigned yet.
                </div>
            ) : (
                <div ref={taskContainerRef} className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} employeeEmail={employee.email} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
