import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/LocalStorage";

export const AuthContext = createContext({ dataEmployees: [], dataAdmin: {} });

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({ dataEmployees: [], dataAdmin: {} });

    useEffect(() => {

        const storedData = getLocalStorage();
        console.log("Fetched Local Storage Data:", storedData);

        if (storedData) {
            const { dataEmployees = [], dataAdmin = {} } = storedData;
            setUserData({ dataEmployees, dataAdmin });
        }


    }, []);

    return (
        <AuthContext.Provider value={userData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
