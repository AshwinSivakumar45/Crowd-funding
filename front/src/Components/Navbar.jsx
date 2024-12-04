import "../Components/Style.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../Assests/logo.png";
import profileIcon from "../Assests/ketto-support-icon.avif"

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        navigate("/");
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div id="Search" className="flex w-full h-25 p-5 text-lg text-gray-300">
            <div>
                <Link to="/Home"><h1 className="mr-10 ml-20 text-lg w-96 inline-block"> 
                    <img src={logo} alt="" width={150} className="transition-all duration-300 ease-in-out hover:scale-150" /></h1></Link> 
            </div>
            
            <div className="flex">
                 <div className="ml-32 mr-10 text-lg pt-1">
                    <Link to="/Home">  <h1> Home</h1> </Link>
                </div>
                <div className="ml-14 mr-10 text-lg pt-1">
                    <Link to="/Campaigns">  <h1>Campaigns</h1> </Link>
                </div>
                <div className=" ml-14 text-lg pt-1"> 
                    <Link to="/fundraiser"> <h1>Campaigns for</h1> </Link>
                </div>
            </div>

            <div>
               {isLoggedIn?(
                    <div className="relative ml-80"><img src={profileIcon} alt="Profile" className="w-10 h-10 rounded-full cursor-pointer" onClick={toggleDropdown} />
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                                <Link to="/Dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
                                <button onClick={handleLogout}  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"  >Logout</button>
                            </div> )}
                    </div>
                ):( <div className="login ml-80 text-lg px-4 py-1 border-2 border-gray-300 rounded-lg mr-16 pt-0">
                        <button onClick={() => navigate("/SignIn")} className="pt-1">Log in</button>
                    </div>
                )}
            </div>       
        </div>
    );
};

export default Navbar;
