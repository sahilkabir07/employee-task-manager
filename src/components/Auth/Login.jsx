import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const success = handleLogin({ email, password });

        if (success) {
            const user = JSON.parse(localStorage.getItem("loggedInUser"));
            if (user.role === "admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/employee-dashboard");
            }
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className='bg-[#111]'>
            <div className="flex h-screen w-screen items-center justify-center">
                <div className="border-2 border-emerald-600 p-20 rounded-2xl">
                    <form className="flex flex-col items-center justify-center gap-2" onSubmit={submitHandler}>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border-2 border-emerald-600 text-xl py-3 px-5 rounded-full placeholder:text-gray-400 outline-none bg-transparent"
                            type="email"
                            placeholder='Enter Your Email'
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="border-2 border-emerald-600 text-xl py-3 px-5 rounded-full placeholder:text-gray-400 outline-none bg-transparent"
                            type="password"
                            placeholder='Enter Your Password'
                        />
                        <button className="!bg-emerald-600 text-xl py-3 px-5 rounded-full text-white outline-none border-none hover:!bg-black">
                            Login
                        </button>
                        <p className="text-white mt-4">
                            Don’t have an account?{" "}
                            <span
                                onClick={() => navigate('/signup')}
                                className="text-emerald-400 cursor-pointer underline"
                            >
                                Sign up
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
