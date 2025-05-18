import React, { useState, useEffect, useContext } from "react";
import logo from "../../assets/logo.png";
import { Outlet, Link } from "react-router-dom";
import DropDown from "../Util/DropDown";
import axios from "../Api";
import AuthContext from "../context/AuthContext";

const Navbar = (props) => {
    const s1 = "bg-white-900 drop-shadow-lg mx-3 px-7 py-2 rounded-md text-base font-medium hover:drop-shadow-xl hover:px-10 dark:hover:bg-midnight dark:hover:drop-shadow-dark-lg";
    const mobileS1 = "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700";
    
    const [theme, setTheme] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { getLoggedIn } = useContext(AuthContext);
    const doc = document.documentElement.classList;
    
    useEffect(() => {
        let t = localStorage.getItem("theme");
        if (!t) {
            localStorage.setItem("theme", 0);
        }
        t = localStorage.getItem("theme");
        setTheme(t);
        if (t == 1) {
            doc.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        localStorage.setItem(
            "theme",
            localStorage.getItem("theme") == 1 ? 0 : 1
        );
        setTheme(localStorage.getItem("theme"));
        if (theme == 0) {
            doc.add("dark");
        } else {
            doc.remove("dark");
        }
    };

    return (
        <>
            <nav className="bg-white-900 sticky top-0 z-10 dark:bg-gray-bg shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Link to="/">
                                    <div className="flex items-center">
                                        <img
                                            className="h-12 w-auto"
                                            src={logo}
                                            draggable={false}
                                            alt="BloodLink"
                                        />
                                        <div className="text-xl lg:text-xl font-bold ml-2 text-blood">
                                            BloodLink
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            <div className="ml-10 flex items-center space-x-4">
                                <DropDown 
                                    title="About Us" 
                                    children={["Home", "About BloodLink", "Contact Us"]} 
                                    links={["/", "/about", "/contactUs"]}
                                />
                                {props.logIn ? (
                                    <>
                                        <Link
                                            to={`/${props.user}/profile`}
                                            className={s1}
                                        >
                                            <i className="fa-solid fa-user"></i>
                                        </Link>
                                        <Link
                                            to="/"
                                            onClick={async () => {
                                                await axios.get("/auth/logout", { withCredentials: true });
                                                await getLoggedIn();
                                            }}
                                            className={s1}
                                        >
                                            Log Out
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <DropDown 
                                            title="Looking For Blood" 
                                            children={["Patient Login/Register", "Blood Bank Directory"]} 
                                            links={["/register/patient", "/bloodDirect"]}
                                        />
                                        <DropDown 
                                            title="Want To Donate Blood" 
                                            children={["Donor Login/Register", "Blood Donation Camps", "About Blood Donation"]} 
                                            links={["/register/donor", "/bloodCamps", "/aboutBloodDonation"]}
                                        />
                                        <DropDown 
                                            title="Blood Bank Login" 
                                            children={["Login", "Add Your Bloodbank"]} 
                                            links={["/login/bank", "/register/bank"]}
                                        />
                                    </>
                                )}
                                <button
                                    className="ml-2 p-2 rounded-full hover:shadow-lg"
                                    onClick={toggleTheme}
                                >
                                    <i
                                        className={`dark:text-white-900 fa-solid fa-lg fa-${theme == 0 ? "sun" : "moon"}`}
                                    ></i>
                                </button>
                            </div>
                        </div>

                        <div className="lg:hidden flex items-center">
                            <button
                                className="p-2 rounded-full hover:shadow-lg mr-2"
                                onClick={toggleTheme}
                            >
                                <i
                                    className={`dark:text-white-900 fa-solid fa-lg fa-${theme == 0 ? "sun" : "moon"}`}
                                ></i>
                            </button>
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {mobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="lg:hidden bg-white dark:bg-gray-800 shadow-lg rounded-b-lg">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <DropDown 
                                mobile={true}
                                title="About Us" 
                                children={["Home", "About BloodLink", "Contact Us"]} 
                                links={["/", "/about", "/contactUs"]}
                            />
                            
                            {props.logIn ? (
                                <>
                                    <Link
                                        to={`/${props.user}/profile`}
                                        className={mobileS1}
                                    >
                                        <i className="fa-solid fa-user mr-2"></i> Profile
                                    </Link>
                                    <Link
                                        to="/"
                                        onClick={async () => {
                                            await axios.get("/auth/logout", { withCredentials: true });
                                            await getLoggedIn();
                                            setMobileMenuOpen(false);
                                        }}
                                        className={mobileS1}
                                    >
                                        Log Out
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <DropDown 
                                        mobile={true}
                                        title="Looking For Blood" 
                                        children={["Patient Login/Register", "Blood Bank Directory"]} 
                                        links={["/register/patient", "/bloodDirect"]}
                                    />
                                    <DropDown 
                                        mobile={true}
                                        title="Want To Donate Blood" 
                                        children={["Donor Login/Register", "Blood Donation Camps", "About Blood Donation"]} 
                                        links={["/register/donor", "/bloodCamps", "/aboutBloodDonation"]}
                                    />
                                    <DropDown 
                                        mobile={true}
                                        title="Blood Bank Login" 
                                        children={["Login", "Add Your Bloodbank"]} 
                                        links={["/login/bank", "/register/bank"]}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
            <Outlet />
        </>
    );
};

export default Navbar;