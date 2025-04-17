import React, { createContext, useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/LocalStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        try {
            const { dataEmployees } = getLocalStorage();
            const filteredEmployees = (dataEmployees || []).filter(emp => emp.role !== 'admin');
            setEmployees(filteredEmployees);
        } catch (error) {
            console.error('Error accessing localStorage:', error);
        }
    }, []);

    useEffect(() => {
        setLocalStorage(employees); // Persist employees data to localStorage on change
    }, [employees]);

    const assignTask = (assignedName, newTask) => {
        let found = false;

        const updatedEmployees = employees.map(employee => {
            if (employee.name.toLowerCase() === assignedName.toLowerCase()) {
                found = true;

                const updatedTasks = [
                    ...employee.tasks,
                    {
                        ...newTask,
                        newTask: true,
                        active: false,
                        completed: false,
                        failed: false
                    }
                ];

                const updatedTaskCount = {
                    ...employee.taskCount,
                    newTask: (employee.taskCount?.newTask || 0) + 1,
                };

                return {
                    ...employee,
                    tasks: updatedTasks,
                    taskCount: updatedTaskCount
                };
            }
            return employee;
        });

        if (!found) return false;

        setEmployees(updatedEmployees);
        return true;
    };

    const updateTaskStatus = (employeeName, taskId, newStatus) => {
        const updatedEmployees = employees.map(employee => {
            if (employee.name.toLowerCase() === employeeName.toLowerCase()) {
                const updatedTasks = employee.tasks.map(task => {
                    if (task.id === taskId) {
                        return {
                            ...task,
                            newTask: false,
                            active: newStatus === 'accept',
                            completed: newStatus === 'complete',
                            failed: newStatus === 'fail',
                        };
                    }
                    return task;
                });

                // Recalculate task counts
                const taskCount = {
                    newTask: 0,
                    active: 0,
                    completed: 0,
                    failed: 0,
                };

                updatedTasks.forEach(task => {
                    if (task.newTask) taskCount.newTask++;
                    if (task.active) taskCount.active++;
                    if (task.completed) taskCount.completed++;
                    if (task.failed) taskCount.failed++;
                });

                return {
                    ...employee,
                    tasks: updatedTasks,
                    taskCount,
                };
            }
            return employee;
        });

        setEmployees(updatedEmployees); // Save updated employees data to context and localStorage
    };

    return (
        <AuthContext.Provider value={{ employees, assignTask, updateTaskStatus }}>
            {children}
        </AuthContext.Provider>
    );
};
