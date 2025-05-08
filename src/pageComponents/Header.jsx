import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const Header = ({ loggedInUserData, handleLogout }) => {
    const { theme } = useTheme();
    const headerRef = useRef(null);
    const textRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: -100 },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power3.out",
            }
        );
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const headerBackground = scrollPosition > 50 ? (theme === 'light' ? 'transparent' : 'transparent') : 'transparent';
            gsap.to(headerRef.current, {
                backgroundColor: headerBackground,
                duration: 0.5,
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [theme]);

    useEffect(() => {
        const letters = textRef.current?.children;

        if (letters) {
            gsap.fromTo(
                letters,
                { x: 100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.3,
                    stagger: 0.05,
                    ease: "power3.out",
                }
            );
        }

        gsap.to(buttonRef.current, {
            opacity: loggedInUserData ? 1 : 0,
            x: loggedInUserData ? 0 : 50,
            visibility: loggedInUserData ? 'visible' : 'hidden',
            duration: 0.5,
            ease: "power2.out",
        });
    }, [loggedInUserData]);

    const handleHover = (e) => {
        const glowColor = theme === 'light' ? '#18fc' : '#00ff7f';
        gsap.to(e.target, {
            scale: 1.3,
            color: glowColor,
            textShadow: `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`,
            duration: 0.2,
            ease: "power2.out",
        });
    };

    const handleLeave = (e) => {
        const normalColor = "white";
        gsap.to(e.target, {
            scale: 1,
            color: normalColor,
            textShadow: "none",
            duration: 0.2,
            ease: "power2.inOut",
        });
    };

    const wrapText = (text) => {
        return text.split("").map((char, index) => (
            <span
                key={index}
                className="inline-block"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
            >
                {char === " " ? "\u00A0" : char}
            </span>
        ));
    };

    const displayText = loggedInUserData
        ? `Welcome, ${loggedInUserData.name}`
        : "Welcome";

    const textStyle = theme === 'light'
        ? 'text-gradient-light'
        : 'text-gradient-dark';

    return (
        <div
            ref={headerRef}
            className="relative flex flex-col sm:flex-row sm:items-center text-white p-6 rounded-xl transition-colors duration-300"
        >
            {/* Centered Content */}
            <div className="flex justify-center items-center w-full mb-4 sm:mb-0">
                <h1
                    ref={textRef}
                    className={`text-2xl sm:text-2xl md:text-3xl font-bold flex flex-wrap justify-center ${textStyle}`}
                >
                    {wrapText(displayText)}
                </h1>
            </div>

            {/* Right-aligned Buttons */}
            <div className="flex justify-center sm:ml-auto gap-4 w-full sm:w-auto">
                {loggedInUserData && (
                    <button
                        ref={buttonRef}
                        onClick={handleLogout}
                        className="bg-sky-600 hover:bg-sky-300 px-4 py-2 rounded-lg text-sm sm:text-base text-white transition duration-300 ease-in-out"
                    >
                        Logout
                    </button>
                )}
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Header;
