import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useAuth } from '../../context/AuthProvider'; // Import useAuth hook

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loggedInUser } = useAuth(); // ✅ corrected variable name
    const navigate = useNavigate();

    const containerRef = useRef(null);
    const buttonRef = useRef(null);

    // Use this effect to handle navigation after login state update
    useEffect(() => {
        if (loggedInUser) {
            // Avoid flicker by wrapping the redirect in a timeout
            const timeout = setTimeout(() => {
                if (loggedInUser.role === "admin") {
                    navigate("/admin-dashboard");
                } else {
                    navigate("/employee-dashboard");
                }
            }, 150);  // 150ms delay for state to fully update

            return () => clearTimeout(timeout); // Cleanup timeout on unmount
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
                boxShadow: "0 0 10px #10b981, 0 0 20px #10b981",
                repeat: -1,
                yoyo: true,
                duration: 1.2,
                ease: "sine.inOut",
            });
        }
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        const success = login(email, password); // ✅ fixed: passing separately

        if (success) {
            setEmail("");
            setPassword("");
        } else {
            alert("Invalid email or password.");
        }
    };

    return (
        <div className='bg-[#111] overflow-x-hidden'>
            <div className="flex h-screen w-screen items-center justify-center">
                <div
                    ref={containerRef}
                    className="border-2 border-emerald-600 p-14 rounded-2xl shadow-[0_0_20px_#10b981] transition-all"
                >
                    <form
                        className="flex flex-col items-center justify-center gap-4"
                        onSubmit={submitHandler}
                    >
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border-2 border-emerald-600 text-xl py-3 px-6 rounded-full placeholder:text-gray-400 outline-none bg-transparent text-white transition focus:shadow-[0_0_10px_#10b981]"
                            type="email"
                            placeholder='Enter Your Email'
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="border-2 border-emerald-600 text-xl py-3 px-6 rounded-full placeholder:text-gray-400 outline-none bg-transparent text-white transition focus:shadow-[0_0_10px_#10b981]"
                            type="password"
                            placeholder='Enter Your Password'
                        />
                        <button
                            ref={buttonRef}
                            className="bg-emerald-600 text-xl py-3 px-6 rounded-full text-white hover:bg-black transition-all"
                        >
                            Login
                        </button>
                        <p className="text-white mt-4">
                            Don’t have an account?{" "}
                            <span
                                onClick={() => navigate('/signup')}
                                className="text-emerald-400 cursor-pointer underline hover:text-emerald-300 transition"
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
