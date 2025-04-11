import React, { useState, useEffect } from 'react';
import AcceptTask from './AcceptTask';
import NewTask from './NewTask';
import FailedTask from './FailedTask';

const TaskManage = ({ data }) => {
    const [taskData, setTaskData] = useState(data);

    useEffect(() => {
        setTaskData(data);
    }, [data]);

    const acceptTask = (employeeId, taskId) => {
        let employees = JSON.parse(localStorage.getItem("employees")) || [];
        let updatedEmployees = employees.map((employee) => {
            if (employee.id === employeeId) {
                const task = employee.tasks.find(task => task.id === taskId);
                if (task && task.newTask) {
                    task.newTask = false;
                    task.active = true;
                    employee.taskCount.newTask -= 1;
                    employee.taskCount.active += 1;
                }
            }
            return employee;
        });

        localStorage.setItem("employees", JSON.stringify(updatedEmployees));

        setTaskData(updatedEmployees);
    };


    const completeTask = (employeeId, taskId) => {
        let employees = JSON.parse(localStorage.getItem("employees")) || [];
        let updatedEmployees = employees.map((employee) => {
            if (employee.id === employeeId) {
                const task = employee.tasks.find(task => task.id === taskId);
                if (task && task.active) {
                    task.active = false;
                    task.completed = true;

                    employee.taskCount.active -= 1;
                    employee.taskCount.completed += 1;
                }
            }
            return employee;
        });

        localStorage.setItem("employees", JSON.stringify(updatedEmployees));

        setTaskData(updatedEmployees);
    };

    const failTask = (employeeId, taskId) => {
        let employees = JSON.parse(localStorage.getItem("employees")) || [];
        let updatedEmployees = employees.map((employee) => {
            if (employee.id === employeeId) {
                const task = employee.tasks.find(task => task.id === taskId);
                if (task && task.active) {
                    task.active = false;
                    task.failed = true;

                    employee.taskCount.active -= 1;
                    employee.taskCount.failed += 1;
                }
            }
            return employee;
        });

        localStorage.setItem("employees", JSON.stringify(updatedEmployees));

        setTaskData(updatedEmployees);
    };

    return (
        <div>
            {taskData.map((employee) => (
                <div key={employee.id}>
                    <h3>{employee.firstname}</h3>
                    {employee.tasks.map((task) => (
                        <div key={task.id}>
                            <h4>{task.taskTitle}</h4>
                            <p>{task.taskDescription}</p>
                            <p>Category: {task.category}</p>
                            <p>Date: {task.taskDate}</p>


                            {task.newTask && (
                                <NewTask
                                    data={task}
                                    acceptTask={acceptTask}
                                    employeeId={employee.id}
                                />
                            )}
                            {task.active && !task.completed && !task.failed && (
                                <AcceptTask
                                    data={task}
                                    completeTask={completeTask}
                                    failTask={failTask}
                                    employeeId={employee.id}
                                />
                            )}
                            {task.failed && (
                                <FailedTask data={task} employeeId={employee.id} />
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TaskManage;
