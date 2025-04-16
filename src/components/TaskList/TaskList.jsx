import React, { useContext } from "react";
import TaskCard from "./TaskCard";
import { AuthContext } from "../../context/AuthProvider";

const TaskList = ({ employeeName }) => {
    const { employees } = useContext(AuthContext);

    const employee = employees.find(
        (emp) => emp.name.toLowerCase() === employeeName.toLowerCase()
    );
    const tasks = employee?.tasks || [];

    return (
        <div id="tasklist" className="mt-10 space-y-5">
            {tasks.length === 0 ? (
                <div className="flex items-center justify-center h-[60vh] text-white text-xl font-semibold">
                    No tasks assigned yet.
                </div>
            ) : (
                tasks.map((task) => (
                    <TaskCard key={task.id} task={task} employeeName={employeeName} />
                ))
            )}
        </div>
    );
};

export default TaskList;
