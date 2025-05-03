import React, { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import gsap from 'gsap';

const CreateTask = () => {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [assignTo, setAssignTo] = useState("");
    const [category, setCategory] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { assignTask, employees } = useContext(AuthContext);
    const formRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            formRef.current,
            { opacity: 0, y: 50, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
        );

        if (buttonRef.current) {
            gsap.to(buttonRef.current, {
                boxShadow: "0 0 8px #10b981, 0 0 14px #10b981",
                repeat: -1,
                yoyo: true,
                duration: 1.5,
                ease: "sine.inOut"
            });
        }
    }, []);

    const resetForm = () => {
        setTaskTitle("");
        setTaskDescription("");
        setTaskDate("");
        setAssignTo("");
        setCategory("");
        setErrorMessage("");
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!taskTitle || !taskDescription || !taskDate || !assignTo || !category) {
            setErrorMessage("Please fill in all fields");
            return;
        }

        const newTask = {
            id: Date.now(),
            taskTitle,
            taskDate,
            taskDescription,
            category,
            status: "new"
        };

        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const success = assignTask(assignTo, newTask);
            if (!success) {
                setErrorMessage("Employee not found!");
            } else {
                resetForm();
            }
        } catch (err) {
            console.error(err);
            setErrorMessage("Error assigning task. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            ref={formRef}
            className="p-6 bg-[#1a1a1a] mt-10 rounded-xl text-white shadow-[0_0_25px_#10b98155] transition-all"
        >
            <form onSubmit={submitHandler} className="flex flex-wrap justify-between w-full gap-6">
                <div className="w-full md:w-1/2">
                    <label className="block mb-2 text-sm">Task Title</label>
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        placeholder="Make a UI design"
                        className="text-sm py-2 px-4 w-full rounded outline-none border border-gray-600 mb-4 bg-[#2a2a2a] text-white focus:shadow-[0_0_8px_#10b981]"
                    />

                    <label className="block mb-2 text-sm">Date</label>
                    <input
                        type="date"
                        value={taskDate}
                        onChange={(e) => setTaskDate(e.target.value)}
                        className="text-sm py-2 px-4 w-full rounded outline-none border border-gray-600 mb-4 bg-[#2a2a2a] text-white focus:shadow-[0_0_8px_#10b981]"
                    />

                    <label className="block mb-2 text-sm">Assign to</label>
                    <select
                        value={assignTo}
                        onChange={(e) => setAssignTo(e.target.value)}
                        className="text-sm py-2 px-4 w-full rounded outline-none border border-gray-600 mb-4 bg-[#2a2a2a] text-white focus:shadow-[0_0_8px_#10b981]"
                    >
                        <option value="">Select employee</option>
                        {employees?.length > 0 ? (
                            employees
                                .filter(emp => emp.role === "employee")
                                .map((emp) => (
                                    <option key={emp.email} value={emp.email}>
                                        {emp.name}
                                    </option>
                                ))
                        ) : (
                            <option disabled>No employees found</option>
                        )}
                    </select>

                    <label className="block mb-2 text-sm">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Design, Dev, etc."
                        className="text-sm py-2 px-4 w-full rounded outline-none border border-gray-600 mb-4 bg-[#2a2a2a] text-white focus:shadow-[0_0_8px_#10b981]"
                    />
                </div>

                <div className="w-full md:w-[40%]">
                    <label className="block mb-2 text-sm">Description</label>
                    <textarea
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        placeholder="Task details..."
                        className="text-sm py-2 px-4 w-full h-28 rounded outline-none border border-gray-600 mb-4 bg-[#2a2a2a] text-white focus:shadow-[0_0_8px_#10b981]"
                    ></textarea>

                    {errorMessage && (
                        <p className="text-red-500 text-sm mb-3">{errorMessage}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        ref={buttonRef}
                        className={`bg-emerald-500 hover:bg-emerald-600 text-white h-10 w-full rounded mt-2 transition-all ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {isSubmitting ? "Creating..." : "Create Task"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTask;
