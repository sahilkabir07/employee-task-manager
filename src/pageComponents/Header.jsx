import React from 'react';

const Header = ({ onLogout, props }) => {
    const logoutUser = () => {
        localStorage.removeItem("loggedInUser");
        window.location.reload()
        onLogout();
        props.changeUser("")
    };

    return (
        <div className='text-white flex items-end justify-between'>
            <h1 className='text-2xl font-medium'>
                Hello,
                <br />
                <span className='text-3xl font-semibold'>👋</span>
            </h1>
            <button onClick={logoutUser} className='!bg-red-500 text-white px-5 py-2 text-lg font-medium rounded'>
                Log Out
            </button>
        </div>
    );
};

export default Header;
