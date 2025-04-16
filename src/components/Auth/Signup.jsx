import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = ({ handleSignup }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("employee");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const employees = JSON.parse(localStorage.getItem("employees")) || [];
        const existingUser = employees.find(user => user.email === email);

        if (existingUser) {
            alert("User with this email already exists!");
            return;
        }

        const userData = {
            role,
            name,
            email,
            password,
            tasks: [],
            taskCount: {
                newTask: 0,
                active: 0,
                completed: 0,
                failed: 0
            }
        };

        handleSignup(userData);

        if (role === "admin") {
            navigate("/admin-dashboard");
        } else {
            navigate("/employee-dashboard");
        }

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="bg-[#111]">
            <div className="flex h-screen w-screen items-center justify-center">
                <div className="border-2 border-emerald-600 p-20 rounded-2xl">
                    <form className="flex flex-col items-center justify-center gap-2" onSubmit={submitHandler}>
                        <input value={name} onChange={(e) => setName(e.target.value)} required
                            className="border-2 border-emerald-600 text-xl py-3 px-5 rounded-full placeholder:text-gray-400 outline-none bg-transparent"
                            type="text" placeholder="Enter Your Name" />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} required
                            className="border-2 border-emerald-600 text-xl py-3 px-5 rounded-full placeholder:text-gray-400 outline-none bg-transparent"
                            type="email" placeholder="Enter Your Email" />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} required
                            className="border-2 border-emerald-600 text-xl py-3 px-5 rounded-full placeholder:text-gray-400 outline-none bg-transparent"
                            type="password" placeholder="Enter Your Password" />
                        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                            className="border-2 border-emerald-600 text-xl py-3 px-5 rounded-full placeholder:text-gray-400 outline-none bg-transparent"
                            type="password" placeholder="Confirm Your Password" />
                        <div className="flex gap-4 text-white text-lg">
                            <label>
                                <input type="radio" name="role" value="admin" checked={role === "admin"} onChange={() => setRole("admin")} /> Admin
                            </label>
                            <label>
                                <input type="radio" name="role" value="employee" checked={role === "employee"} onChange={() => setRole("employee")} /> Employee
                            </label>
                        </div>
                        <button className="!bg-emerald-600 text-xl py-3 px-5 rounded-full text-white outline-none border-none hover:!bg-black">
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
