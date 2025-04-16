import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const CreateTask = () => {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [assignTo, setAssignTo] = useState("");
    const [category, setCategory] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { assignTask, employees } = useContext(AuthContext);

    const submitHandler = (e) => {
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
        };

        setIsSubmitting(true);

        try {
            const success = assignTask(assignTo, newTask);
            if (!success) {
                setErrorMessage("Employee not found!");
                return;
            }

            setTaskTitle("");
            setTaskDescription("");
            setTaskDate("");
            setCategory("");
            setAssignTo("");
            setErrorMessage("");
        } catch (error) {
            setErrorMessage("Error assigning task. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-5 bg-[#1c1c1c] mt-7 rounded text-white">
            <form onSubmit={submitHandler} className="flex flex-wrap justify-between w-full gap-6">
                <div className="w-full md:w-1/2">
                    <div>
                        <h3 className="text-sm mb-1">Task Title</h3>
                        <input
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            className="text-sm py-2 px-3 w-full rounded outline-none border border-gray-600 mb-4 bg-[#2d2d2d]"
                            type="text"
                            placeholder="Make a UI design"
                        />
                    </div>
                    <div>
                        <h3 className="text-sm mb-1">Date</h3>
                        <input
                            value={taskDate}
                            onChange={(e) => setTaskDate(e.target.value)}
                            className="text-sm py-2 px-3 w-full rounded outline-none border border-gray-600 mb-4 bg-[#2d2d2d]"
                            type="date"
                        />
                    </div>
                    <div>
                        <h3 className="text-sm mb-1">Assign to</h3>
                        <select
                            value={assignTo}
                            onChange={(e) => setAssignTo(e.target.value)}
                            className="text-sm py-2 px-3 w-full rounded outline-none border border-gray-600 mb-4 bg-[#2d2d2d]"
                        >
                            <option value="">Select employee</option>
                            {employees?.map((emp) => (
                                <option key={emp.email} value={emp.name}>
                                    {emp.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h3 className="text-sm mb-1">Category</h3>
                        <input
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="text-sm py-2 px-3 w-full rounded outline-none border border-gray-600 mb-4 bg-[#2d2d2d]"
                            type="text"
                            placeholder="Design, Dev, etc."
                        />
                    </div>
                </div>

                <div className="w-full md:w-[40%]">
                    <h3 className="text-sm mb-1">Description</h3>
                    <textarea
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        className="text-sm py-2 px-3 w-full h-24 rounded outline-none border border-gray-600 mb-4 bg-[#2d2d2d]"
                        placeholder="Task details..."
                    ></textarea>

                    {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-green-500 hover:bg-green-600 text-white h-10 w-full rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Task'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTask;
