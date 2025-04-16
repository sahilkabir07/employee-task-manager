import React from "react";

const Header = ({ changeUser, data }) => {
    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        changeUser(null);
    };

    return (
        <div className="flex justify-between items-center bg-[#2D2D2D] text-white p-4 rounded-xl">
            <h1 className="text-xl font-bold">Welcome, {data?.name || "User"}</h1> <br />
            <h2>👋</h2>
            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>
    );
};

export default Header;
