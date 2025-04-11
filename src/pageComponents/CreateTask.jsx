import React, { useState } from 'react';

const CreateTask = () => {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [asignTo, setAsignTo] = useState("");
    const [category, setCategory] = useState("");
    const [newTask, setNewTask] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        const newTask = {
            taskTitle,
            taskDate,
            taskDescription,
            category,
            active: false,
            newTask: true,
            failed: false,
            completed: false,
        };
        let data = JSON.parse(localStorage.getItem("employees")) || [];

        console.log("Existing data:", data);
        if (!Array.isArray(data)) {
            console.error("Invalid data structure:", data);
            return;
        }

        data.forEach((elem) => {
            if (asignTo === elem.firstname) {
                elem.tasks = elem.tasks || [];
                elem.tasks.push(newTask);
                elem.taskCount.newTask = (elem.taskCount.newTask || 0) + 1;
            }
        });


        localStorage.setItem("employees", JSON.stringify(data));


        setTaskTitle("");
        setTaskDescription("");
        setTaskDate("");
        setCategory("");
        setAsignTo("");
        setNewTask({});
    };

    return (
        <div className="p-5 bg-[#1c1c1c] mt-7 rounded">
            <form onSubmit={submitHandler} className="flex items-start justify-between flex-wrap w-full">
                <div className="w-1/2">
                    <div>
                        <h3 className="text-sm text-gray-300 mb-1">Task Title</h3>
                        <input
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            className="text-sm py-2 px-3 w-4/5 rounded outline-none border-[1px] border-gray-600 mb-4 text-black"
                            type="text"
                            placeholder="Make a UI design"
                        />
                    </div>
                    <div>
                        <h3 className="text-sm text-gray-300 mb-1">Date</h3>
                        <input
                            value={taskDate}
                            onChange={(e) => setTaskDate(e.target.value)}
                            className="text-sm py-2 px-3 w-4/5 rounded outline-none border-[1px] border-gray-600 mb-4 text-black"
                            type="date"
                        />
                    </div>
                    <div>
                        <h3 className="text-sm text-gray-300 mb-1">Assign to</h3>
                        <input
                            value={asignTo}
                            onChange={(e) => setAsignTo(e.target.value)}
                            className="text-sm py-2 px-3 w-4/5 rounded outline-none border-[1px] border-gray-600 mb-4 text-black"
                            type="text"
                            placeholder="Employee name"
                        />
                    </div>
                    <div>
                        <h3 className="text-sm text-gray-300 mb-1">Category</h3>
                        <input
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="text-sm py-2 px-3 w-4/5 rounded outline-none border-[1px] border-gray-600 mb-4 text-black"
                            type="text"
                            placeholder="Design, Dev, etc."
                        />
                    </div>
                </div>

                <div>
                    <h3 className="text-sm text-gray-300 mb-1">Description</h3>
                    <textarea
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        className="text-sm py-2 px-3 w-4/5 h-24 rounded outline-none border-[1px] border-gray-600 mb-4 text-black"
                        placeholder="Task details..."
                    ></textarea>
                    <button className="bg-green-500 hover:bg-green-600 text-white h-10 w-24 rounded">
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTask;
