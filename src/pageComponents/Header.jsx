import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Header = ({ loggedInUserData, handleLogout }) => {
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
            gsap.to(headerRef.current, {
                backgroundColor: scrollPosition > 50 ? "#1f1f1f" : "#2D2D2D",
                duration: 0.5,
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const letters = textRef.current?.children;

        if (letters) {
            gsap.fromTo(
                letters,
                {
                    x: 100,
                    opacity: 0,
                },
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
            duration: 0.5,
            ease: "power2.out",
        });
    }, [loggedInUserData]);

    const handleHover = (e) => {
        gsap.to(e.target, {
            scale: 1.3,
            textShadow: "0 0 15px #22c55e, 0 0 30px #22c55e, 0 0 45px #22c55e",
            duration: 0.1,
            ease: "power3.out",
        });
    };

    const handleLeave = (e) => {
        gsap.to(e.target, {
            scale: 1,
            textShadow: "none",
            duration: 0.1,
            ease: "power3.inOut",
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

    return (
        <div
            ref={headerRef}
            className="flex justify-between items-center bg-[#111] text-white p-6 rounded-xl"
        >
            {/* Main content wrapper */}
            <div className="flex w-full justify-center items-center">
                <h1
                    ref={textRef}
                    className={`text-3xl font-bold flex flex-wrap ${loggedInUserData ? "text-left" : "text-center"
                        }`}
                >
                    {wrapText(displayText)}
                </h1>
            </div>

            <div className="flex items-center gap-4 ml-auto">
                {loggedInUserData && (
                    <button
                        ref={buttonRef}
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg text-lg"
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
