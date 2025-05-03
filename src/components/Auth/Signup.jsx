import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useAuth } from '../../context/AuthProvider';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("employee");

    const { registerEmployee } = useAuth();
    const navigate = useNavigate();

    const formRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const tl = gsap.fromTo(formRef.current, {
            y: 60,
            opacity: 0,
            scale: 0.95
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out"
        });

        const btnAnim = buttonRef.current && gsap.to(buttonRef.current, {
            boxShadow: "0 0 10px #10b981, 0 0 20px #10b981",
            repeat: -1,
            yoyo: true,
            duration: 1.2,
            ease: "sine.inOut"
        });

        return () => {
            tl.kill();
            if (btnAnim) btnAnim.kill();
        };
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
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

        const success = registerEmployee(userData);

        if (!success) {
            alert("User with this email already exists!");
            return;
        }

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
        <div className="bg-[#111] overflow-x-hidden min-h-screen flex items-center justify-center">
            <div
                ref={formRef}
                className="border-2 border-emerald-600 p-14 rounded-2xl shadow-[0_0_20px_#10b981] transition-all w-full max-w-md"
            >
                <form className="flex flex-col items-center justify-center gap-4" onSubmit={submitHandler}>
                    <input value={name} onChange={(e) => setName(e.target.value)} required
                        className="border-2 border-emerald-600 text-xl py-3 px-6 rounded-full placeholder:text-gray-400 outline-none bg-transparent text-white focus:shadow-[0_0_10px_#10b981] transition"
                        type="text" placeholder="Enter Your Name" />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} required
                        className="border-2 border-emerald-600 text-xl py-3 px-6 rounded-full placeholder:text-gray-400 outline-none bg-transparent text-white focus:shadow-[0_0_10px_#10b981] transition"
                        type="email" placeholder="Enter Your Email" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} required
                        className="border-2 border-emerald-600 text-xl py-3 px-6 rounded-full placeholder:text-gray-400 outline-none bg-transparent text-white focus:shadow-[0_0_10px_#10b981] transition"
                        type="password" placeholder="Enter Your Password" />
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                        className="border-2 border-emerald-600 text-xl py-3 px-6 rounded-full placeholder:text-gray-400 outline-none bg-transparent text-white focus:shadow-[0_0_10px_#10b981] transition"
                        type="password" placeholder="Confirm Your Password" />
                    <div className="flex gap-6 text-white text-lg mt-2">
                        <label>
                            <input type="radio" name="role" value="admin" checked={role === "admin"} onChange={() => setRole("admin")} /> Admin
                        </label>
                        <label>
                            <input type="radio" name="role" value="employee" checked={role === "employee"} onChange={() => setRole("employee")} /> Employee
                        </label>
                    </div>
                    <button
                        ref={buttonRef}
                        className="bg-emerald-600 text-xl py-3 px-6 rounded-full text-white hover:bg-black transition-all mt-4"
                    >
                        Sign Up
                    </button>
                    <p className="text-white mt-4">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate('/login')}
                            className="text-emerald-400 cursor-pointer underline hover:text-emerald-300 transition"
                        >
                            Login
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
