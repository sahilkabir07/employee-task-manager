const LOCAL_STORAGE_KEY = "employees";

export const setLocalStorage = (employeesArray) => {
    if (Array.isArray(employeesArray)) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(employeesArray));
    }
};

export const getLocalStorage = () => {
    try {
        const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (Array.isArray(stored)) {
            return { dataEmployees: stored }; // ✅ Now it's consistent with destructuring
        }
    } catch (err) {
        console.error("Error reading localStorage:", err);
    }
    return { dataEmployees: [] }; // ✅ Always return in object format
};
