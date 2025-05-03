const LOCAL_STORAGE_KEY_EMPLOYEES = "employees";
const LOCAL_STORAGE_KEY_USERS = "users";

export const setLocalStorage = (employeesArray, usersArray) => {
    if (Array.isArray(employeesArray)) {
        localStorage.setItem(LOCAL_STORAGE_KEY_EMPLOYEES, JSON.stringify(employeesArray));
    }
    if (Array.isArray(usersArray)) {
        localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(usersArray));
    }
};

export const getLocalStorage = () => {
    try {
        const storedEmployees = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_EMPLOYEES));
        const storedUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USERS));

        return {
            dataEmployees: Array.isArray(storedEmployees) ? storedEmployees : [],
            dataUsers: Array.isArray(storedUsers) ? storedUsers : [],
        };
    } catch (err) {
        console.error("Error reading localStorage:", err);
    }
    return { dataEmployees: [], dataUsers: [] };
};
