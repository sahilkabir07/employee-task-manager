import { getLocalStorage, setLocalStorage } from './localStorage';

export const assignTaskToEmployee = (employeeEmail, newTask) => {
    const { dataEmployees } = getLocalStorage();

    const employeeIndex = dataEmployees.findIndex(emp => emp.email === employeeEmail);

    if (employeeIndex !== -1) {
        dataEmployees[employeeIndex].tasks.push(newTask);
        setLocalStorage(dataEmployees, []);
    } else {
        console.log('Employee not found!');
    }
};
