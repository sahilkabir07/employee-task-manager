import React from "react";

const Header = ({ changeUser, data }) => {
    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        changeUser(null);
    };

    return (
        <div className="flex justify-between items-center bg-[#2D2D2D] text-white p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold">Welcome, {data?.name || "User"}</h1>
                <span role="img" aria-label="wave" className="text-3xl">👋</span>
            </div>
            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-2"
            >
                <span className="text-xl">🚪</span> Logout
            </button>
        </div>
    );
};

export default Header;
