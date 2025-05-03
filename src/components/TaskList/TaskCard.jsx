import React, { useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import { AuthContext } from "../../context/AuthProvider";

const TaskCard = ({ task, employeeEmail }) => {
    const { updateTaskStatus } = useContext(AuthContext);
    const cardRef = useRef(null);

    useEffect(() => {
        if (cardRef.current) {
            gsap.fromTo(
                cardRef.current,
                { opacity: 0, y: 50, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
            );
        }
    }, []);

    const handleStatusChange = (status) => {
        updateTaskStatus(employeeEmail, task.id, status);
    };

    const statusColors = {
        new: "bg-red-500",
        active: "bg-yellow-500",
        completed: "bg-green-500",
        failed: "bg-gray-500",
    };

    const renderStatusButtons = () => {
        switch (task.status) {
            case "new":
                return (
                    <button
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl text-white font-semibold transition"
                        onClick={() => handleStatusChange("active")}
                    >
                        Accept
                    </button>
                );
            case "active":
                return (
                    <>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-white font-semibold transition"
                            onClick={() => handleStatusChange("completed")}
                        >
                            Complete
                        </button>
                        <button
                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-white font-semibold transition"
                            onClick={() => handleStatusChange("failed")}
                        >
                            Fail
                        </button>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div
            ref={cardRef}
            className="p-6 rounded-2xl bg-gradient-to-br from-[#2c2c2c] to-[#1c1c1c] text-white shadow-lg border border-gray-700 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-transform duration-300 max-w-md w-full"
        >
            <h2 className="text-xl font-semibold mb-2">{task.taskTitle}</h2>
            <p className="text-sm mb-1"><strong>Due Date:</strong> {task.taskDate}</p>
            <p className="text-sm mb-1"><strong>Category:</strong> {task.category}</p>
            <p className="text-sm mb-3"><strong>Description:</strong> {task.taskDescription}</p>

            <p className="text-sm mb-1"><strong>Assigned By:</strong> {task.assignedBy || "Unknown"}</p>

            <div className="flex items-center gap-3 mb-4">
                <strong>Status:</strong>
                {task.status ? (
                    <span
                        className={`px-3 py-1 text-sm rounded-full font-medium shadow-md ${statusColors[task.status] || "bg-gray-500"}`}
                    >
                        {task.status.toUpperCase()}
                    </span>
                ) : (
                    <span className="px-3 py-1 text-sm rounded-full font-medium shadow-md bg-gray-500">
                        UNKNOWN
                    </span>
                )}
            </div>

            <div className="flex gap-3 mt-4 flex-wrap">
                {renderStatusButtons()}
            </div>
        </div>
    );
};

export default TaskCard;
