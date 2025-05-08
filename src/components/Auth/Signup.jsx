import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useAuth } from '../../context/AuthProvider';
import { useTheme } from '../../context/ThemeContext';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("employee");

    const { registerEmployee } = useAuth();
    const { theme } = useTheme();
    const navigate = useNavigate();

    const formRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(formRef.current, {
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

        if (buttonRef.current) {
            gsap.to(buttonRef.current, {
                boxShadow: theme === 'light'
                    ? "0 0 15px rgba(135,206,250,0.8), 0 0 25px rgba(135,206,250,0.6)"
                    : "0 0 10px #10b981, 0 0 20px #10b981",
                repeat: -1,
                yoyo: true,
                duration: 1.5,
                ease: "sine.inOut",
            });
        }
    }, [theme]);

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
        <div className={`overflow-x-hidden min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-transparent' : 'bg-transparent'}`}>
            <div
                ref={formRef}
                className={`border-2 ${theme === 'light' ? 'border-sky-400' : 'border-emerald-600'} p-14 rounded-2xl shadow-[0_0_20px_${theme === 'light' ? 'rgba(135,206,250,0.5)' : '#10b981'}] transition-all w-full max-w-md`}
            >
                <form className="flex flex-col items-center justify-center gap-4" onSubmit={submitHandler}>
                    <input value={name} onChange={(e) => setName(e.target.value)} required
                        className={`border-2 ${theme === 'light' ? 'border-sky-400' : 'border-emerald-600'} text-xl py-3 px-6 rounded-full placeholder:text-${theme === 'light' ? 'sky-700' : 'emerald-700'} outline-none bg-transparent text-${theme === 'light' ? 'sky-800' : 'emerald-700'} transition focus:shadow-[0_0_10px_${theme === 'light' ? 'rgba(135,206,250,0.8)' : '#10b981'}]`}
                        type="text" placeholder="Enter Your Name" />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} required
                        className={`border-2 ${theme === 'light' ? 'border-sky-400' : 'border-emerald-600'} text-xl py-3 px-6 rounded-full placeholder:text-${theme === 'light' ? 'sky-700' : 'emerald-700'} outline-none bg-transparent text-${theme === 'light' ? 'sky-800' : 'emerald-700'} transition focus:shadow-[0_0_10px_${theme === 'light' ? 'rgba(135,206,250,0.8)' : '#10b981'}]`}
                        type="email" placeholder="Enter Your Email" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} required
                        className={`border-2 ${theme === 'light' ? 'border-sky-400' : 'border-emerald-600'} text-xl py-3 px-6 rounded-full placeholder:text-${theme === 'light' ? 'sky-700' : 'emerald-700'} outline-none bg-transparent text-${theme === 'light' ? 'sky-800' : 'emerald-700'} transition focus:shadow-[0_0_10px_${theme === 'light' ? 'rgba(135,206,250,0.8)' : '#10b981'}]`}
                        type="password" placeholder="Enter Your Password" />
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                        className={`border-2 ${theme === 'light' ? 'border-sky-400' : 'border-emerald-600'} text-xl py-3 px-6 rounded-full placeholder:text-${theme === 'light' ? 'sky-700' : 'emerald-700'} outline-none bg-transparent text-${theme === 'light' ? 'sky-800' : 'emerald-700'} transition focus:shadow-[0_0_10px_${theme === 'light' ? 'rgba(135,206,250,0.8)' : '#10b981'}]`}
                        type="password" placeholder="Confirm Your Password" />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className={`border-2 ${theme === 'light' ? 'border-sky-400' : 'border-emerald-600'} text-xl py-3 px-6 rounded-full bg-transparent text-${theme === 'light' ? 'sky-800' : 'emerald-700'} outline-none cursor-pointer`}
                    >
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button
                        ref={buttonRef}
                        className={`bg-${theme === 'light' ? 'sky' : 'emerald'}-600 text-xl py-3 px-6 rounded-full text-white hover:bg-${theme === 'light' ? 'sky' : 'emerald'}-700 transition-all`}
                    >
                        Signup
                    </button>
                    <p className={`text-${theme === 'light' ? 'sky' : 'white'}-700 mt-4`}>
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate('/login')}
                            className={`text-${theme === 'light' ? 'sky' : 'emerald'}-600 cursor-pointer underline hover:text-${theme === 'light' ? 'sky' : 'emerald'}-900 transition`}
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
