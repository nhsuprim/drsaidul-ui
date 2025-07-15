"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
// import { getUserInfo, removeUserInfo } from "@/Server/auth.service";
import Image from "next/image";
// import mplLogo from "../../assets/images/MPL-12-Logo.png";
import { getUserInfo, removeUserInfo } from "../Server/auth.service";

const NavBar = () => {
    const [user, setUser] = useState<{ email?: string; role?: string } | null>(
        null
    );
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [admin, setAdmin] = useState(false);

    const pathname = usePathname();
    let lastScrollTop = 0;

    // Fetch user info on client-side
    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await getUserInfo();
            setUser(userInfo);
            if (userInfo.role === "admin") {
                setAdmin(true);
            }

            console.log(userInfo);
        };
        fetchUserInfo();
    }, []);

    const handleLogout = () => {
        removeUserInfo();
        setUser(null);
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleMenuClick = () => {
        setIsOpen(false); // Close the mobile menu on click
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > window.innerHeight) {
                setScrolled(true);

                if (currentScroll > lastScrollTop) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            } else {
                setScrolled(false);
                setIsVisible(true);
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className=" mb-4 ">
            <nav
                className={`top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ease-in-out ${
                    scrolled ? "shadow-md" : ""
                } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
            >
                <div className=" px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            {/* <Image
                                src={}
                                alt="logo"
                                width={50}
                                height={50}
                            /> */}
                            <Link
                                href="/"
                                className="text-2xl font-bold text-gray-800"
                            >
                                ডাঃ{" "}
                                <span className="text-green-400">
                                    সাইদুল ইসলাম
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {["/", "/services"].map((path) => (
                                        <Link
                                            key={path}
                                            href={path}
                                            className={`relative text-gray-500 px-3 py-2 rounded-md text-sm font-medium hover:scale-105 transition-transform duration-200 hover:text-blue-400 ${
                                                pathname === path
                                                    ? "text-blue-500"
                                                    : "group"
                                            }`}
                                            onClick={handleMenuClick}
                                        >
                                            {path === "/"
                                                ? "Home"
                                                : path
                                                      .replace("/", "")
                                                      .replace("-", " ")
                                                      .replace(/^\w/, (c) =>
                                                          c.toUpperCase()
                                                      )}
                                            <span
                                                className={`absolute left-0 bottom-0 block h-[1px] bg-blue-500 transition-all duration-300 ${
                                                    pathname === path
                                                        ? "w-full"
                                                        : "w-0 group-hover:w-full"
                                                }`}
                                            ></span>
                                        </Link>
                                    ))}
                                    {/* Conditionally render the Dashboard link if the user is an admin */}
                                    {admin && (
                                        <Link
                                            href="/admin/dashboard"
                                            className={`relative text-gray-500 px-3 py-2 rounded-md text-sm font-medium hover:scale-105 transition-transform duration-200 hover:text-blue-400 ${
                                                pathname === "/dashboard"
                                                    ? "text-blue-500"
                                                    : "group"
                                            }`}
                                            onClick={handleMenuClick}
                                        >
                                            Dashboard
                                            <span
                                                className={`absolute left-0 bottom-0 block h-[1px] bg-blue-500 transition-all duration-300 ${
                                                    pathname === "/dashboard"
                                                        ? "w-full"
                                                        : "w-0 group-hover:w-full"
                                                }`}
                                            ></span>
                                        </Link>
                                    )}
                                    {/* Conditionally render the My Team link if the user is a captain */}
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                <button
                                    onClick={toggleMenu}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-white hover:bg-gray-800 focus:outline-none focus:bg-gray-800 focus:text-white"
                                >
                                    {isOpen ? (
                                        <FaTimes className="h-6 w-6" />
                                    ) : (
                                        <FaBars className="h-6 w-6" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            {user?.email ? (
                                <button
                                    className="btn btn-primary"
                                    onClick={handleLogout}
                                >
                                    LOGOUT
                                </button>
                            ) : (
                                <Link href="/admin/login">
                                    <button className="btn btn-primary">
                                        LOGIN
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {["/", "/services"].map((path) => (
                                <Link
                                    key={path}
                                    href={path}
                                    className={`relative text-gray-800 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 hover:text-blue-400 ${
                                        pathname === path
                                            ? "text-blue-500"
                                            : "group"
                                    }`}
                                    onClick={handleMenuClick}
                                >
                                    {path === "/"
                                        ? "Home"
                                        : path
                                              .replace("/", "")
                                              .replace("-", " ")
                                              .replace(/^\w/, (c) =>
                                                  c.toUpperCase()
                                              )}
                                    <span
                                        className={`absolute left-0 bottom-0 block h-[1px] bg-blue-500 transition-all duration-300 ${
                                            pathname === path
                                                ? "w-full"
                                                : "w-0 group-hover:w-full"
                                        }`}
                                    ></span>
                                </Link>
                            ))}
                            {/* Conditionally render the Dashboard link if the user is an admin */}
                            {admin && (
                                <Link
                                    href="/dashboard"
                                    className={`relative text-gray-800 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 hover:text-blue-400 ${
                                        pathname === "/dashboard"
                                            ? "text-blue-500"
                                            : "group"
                                    }`}
                                    onClick={handleMenuClick}
                                >
                                    Dashboard
                                    <span
                                        className={`absolute left-0 bottom-0 block h-[1px] bg-blue-500 transition-all duration-300 ${
                                            pathname === "/dashboard"
                                                ? "w-full"
                                                : "w-0 group-hover:w-full"
                                        }`}
                                    ></span>
                                </Link>
                            )}
                            {/* Conditionally render the My Team link if the user is a captain */}

                            <div className="pl-2">
                                {user?.email ? (
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleLogout}
                                    >
                                        LOGOUT
                                    </button>
                                ) : (
                                    <Link
                                        onClick={handleMenuClick}
                                        href="/admin/login"
                                    >
                                        <button className="btn btn-primary">
                                            LOGIN
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default NavBar;
