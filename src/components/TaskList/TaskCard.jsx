import React, { useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import { AuthContext } from "../../context/AuthProvider";
import { useTheme } from "../../context/ThemeContext";

const TaskCard = ({ task, employeeEmail }) => {
    const { updateTaskStatus } = useContext(AuthContext);
    const { theme } = useTheme();
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;

        if (card) {
            gsap.fromTo(
                card,
                { opacity: 0, y: 50, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }
            );

            const handleMouseEnter = () => {
                gsap.to(card, {
                    rotateX: 12,
                    rotateY: -12,
                    scale: 1.04,
                    duration: 0.10,
                    ease: "power1.out",
                });
            };

            const handleMouseLeave = () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    duration: 0.10,
                    ease: "sine.out",
                });
            };

            card.addEventListener("mouseenter", handleMouseEnter);
            card.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                card.removeEventListener("mouseenter", handleMouseEnter);
                card.removeEventListener("mouseleave", handleMouseLeave);
            };
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
                    <div className="flex gap-3">
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
                    </div>
                );
            default:
                return null;
        }
    };

    const cardThemeClass =
        theme === "light"
            ? "bg-gradient-to-br from-transparent to-gray-100 text-black border-gray-300 shadow"
            : "bg-gradient-to-br from-transparent to-[#1c1c1c] text-white border-gray-700 shadow-lg";

    return (
        <div
            ref={cardRef}
            className={`p-6 rounded-2xl transition-transform duration-300 max-w-md w-full border ${cardThemeClass}`}
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
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

            <div className="mt-4 flex flex-wrap gap-2">
                {renderStatusButtons()}
            </div>
        </div>
    );
};

export default TaskCard;
