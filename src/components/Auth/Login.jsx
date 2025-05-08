import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useAuth } from '../../context/AuthProvider';
import { useTheme } from '../../context/ThemeContext';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loggedInUser } = useAuth();
    const { theme } = useTheme();
    const navigate = useNavigate();

    const containerRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        if (loggedInUser) {
            const timeout = setTimeout(() => {
                if (loggedInUser.role === "admin") {
                    navigate("/admin-dashboard");
                } else {
                    navigate("/employee-dashboard");
                }
            }, 150);

            return () => clearTimeout(timeout);
        }
    }, [loggedInUser, navigate]);

    useEffect(() => {
        gsap.fromTo(containerRef.current, {
            y: 50,
            opacity: 0,
            scale: 0.95,
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
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
        const success = login(email, password);

        if (success) {
            setEmail("");
            setPassword("");
        } else {
            alert("Invalid email or password.");
        }
    };

    return (
        <div className={`overflow-x-hidden ${theme === 'dark' ? 'bg-transparent' : 'bg-transparent'} `}>
            <div className="flex justify-center items-start min-h-screen pt-12 w-screen">
                <div
                    ref={containerRef}
                    className={`border-2 ${theme === 'light' ? 'border-sky-400' : 'border-emerald-600'} px-6 py-6 sm:px-10 sm:py-8 md:px-14 md:py-10 rounded-2xl shadow-[0_0_20px_${theme === 'light' ? 'rgba(135,206,250,0.5)' : '#10b981'}] transition-all max-w-md w-full mx-4`}
                >
                    <form
                        className="flex flex-col items-center justify-center gap-4"
                        onSubmit={submitHandler}
                    >
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={`w-full border-2 ${theme === 'light' ? 'border-sky-400' : 'border-emerald-600'} text-xl py-3 px-6 rounded-full placeholder:text-${theme === 'light' ? 'sky-700' : 'white'} outline-none bg-transparent text-${theme === 'light' ? 'sky-800' : 'emerald-white'} transition focus:shadow-[0_0_10px_${theme === 'light' ? 'rgba(135,206,250,0.8)' : '#10b981'}]`}
                            type="email"
                            placeholder='Enter Your Email'
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={`w-full border-2 ${theme === 'light' ? 'border-sky-400' : 'border-emerald-600'} text-xl py-3 px-6 rounded-full placeholder:text-${theme === 'light' ? 'sky-700' : 'white'} outline-none bg-transparent text-${theme === 'light' ? 'sky-800' : 'emerald-white'} transition focus:shadow-[0_0_10px_${theme === 'light' ? 'rgba(135,206,250,0.8)' : '#10b981'}]`}
                            type="password"
                            placeholder='Enter Your Password'
                        />
                        <button
                            ref={buttonRef}
                            className={`w-full bg-${theme === 'light' ? 'sky' : 'emerald'}-600 text-xl py-3 px-6 rounded-full text-white hover:bg-${theme === 'light' ? 'sky' : 'emerald'}-700 transition-all`}
                        >
                            Login
                        </button>
                        <p className={`text-${theme === 'light' ? 'sky' : 'white'}-700 mt-4 text-center`}>
                            Don’t have an account?{" "}
                            <span
                                onClick={() => navigate('/signup')}
                                className={`text-${theme === 'light' ? 'sky' : 'emerald'}-600 cursor-pointer underline hover:text-${theme === 'light' ? 'sky' : 'emerald'}-900 transition`}
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
