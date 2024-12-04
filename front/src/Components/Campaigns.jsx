import "./Style.css";
import { Link } from "react-router-dom";
import image from "../Assests/girls-sip.avif";
import Whatsapp from "../Assests/whatsapplogo.png";
import Instagram from "../Assests/instalogo.png";
import AllCategory from "./AllCategories";
import { useLocation } from "react-router-dom";
import Business from "./Business";
import Medical from "./Medical";
import Animal from "./Animal";
import Education from "./Education";
import { useState } from "react";
import Quries from "./Quries";
import Footer from "./Footer";

function Campaigns() {
    const [showQuries, setShowQuries] = useState(false);
    const location = useLocation();  
    const renderContent = () => {
        if (location.pathname === "/Campaigns") {
            return <AllCategory />; 
        }
        if (location.pathname.includes("Education")) {
            return <Education/>;  
        }
        if (location.pathname.includes("Business")) {
            return <Business/>;  
        }
        if (location.pathname.includes("Medical")) {
            return <Medical/>;  
        }
        if (location.pathname.includes("Animal")) {
            return <Animal/>;  
        }
        return <AllCategory />; 
    };

    const toggleQuries = () => {
        setShowQuries(!showQuries);
    };

    return (
        <div>
            <div className="banner w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <p className="pl-20 pt-32 pb-32 text-xl">
                    <span className="font-bold text-3xl">TOGETHER, TURN DREAMS INTO REALITY</span><br /><br />
                    <span>
                        Join hands to support inspiring stories and life-changing ideas. <br />
                        Every contribution brings hope and makes a difference.
                    </span>
                </p>
            </div>

            <div className="flex">
                <div className="sticky-sidebar p-16 ml-20 my-16 rounded-2xl">
                    <p className="text-xl font-semibold">CATEGORIES</p>
                    <hr />
                    <ul className="text-stone-950 mt-4">
                        <Link to="AllCategory"><li className={`All mt-6 justify-center cursor-pointer flex py-2 px-4 rounded-md transition-all ${location.pathname === "/Campaigns/AllCategory" ? "bg-green-600 text-2xl" : ""}` }>All Categories</li></Link>
                        <Link to="Education"><li className={`mt-6 flex justify-center text-lg text-gray-800 cursor-pointer  py-2 px-4 rounded-md transition-all ${location.pathname === "/Campaigns/Education" ? "bg-green-600 text-2xl" : ""}`} >Education</li></Link>
                        <Link to="Business"><li className={`mt-6 flex justify-center cursor-pointer  py-2 px-4 rounded-md transition-all ${location.pathname === "/Campaigns/Business" ? "bg-green-600 text-2xl " : ""}`}>Business</li></Link>
                        <Link to="Medical"><li className={`mt-6 flex justify-center cursor-pointer  py-2 px-4 rounded-md transition-all ${location.pathname === "/Campaigns/Medical" ? "bg-green-600 text-2xl " : ""}`}>Health</li></Link>
                        <Link to="Animal"><li className={`mt-6 flex justify-center cursor-pointer  py-2 px-4 rounded-md transition-all ${location.pathname === "/Campaigns/Animal" ? "bg-green-600 text-2xl" : ""}`}>Animals</li></Link>
                    </ul>
                </div>
                
                <div className="content flex-1 p-8">
                    {renderContent()} 
                </div>
            </div>

            <div className="flex justify-center gap-10 mt-10 mx-6">
                
                <div className="Contact w-96 h-28 p-4 bg-yellow-50 rounded-2xl shadow-lg text-center flex flex-col items-center justify-center">
                    <p className="font-semibold text-gray-800">Confused about how to start a Fundraiser?</p>
                    <button className="Talk mt-3 w-32 h-8 text-white font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-200" onClick={toggleQuries} >
                        Talk to us
                    </button>
                </div>
            </div>

            <div className="flex justify-center items-center mt-10 mx-6 mb-10">
                <p className="text-gray-700 text-center">
                    Check out our FAQs page or chat with us on Facebook or WhatsApp.
                </p>
                
                <button className="whatsapp flex items-center bg-green-500 text-white font-bold w-36 h-12 p-3 ml-10 pl-4 rounded-lg hover:bg-green-600 transition duration-300 transform hover:scale-105 mb-2">
        <img src={Whatsapp} alt="WhatsApp logo" className="w-6 h-6 mr-2" />
        <span>WhatsApp</span>
    </button>

    
    <button className="Instagram flex items-center bg-blue-600 text-white font-bold w-36 h-12 p-3 pl-4 ml-10 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 mb-2">
        <img src={Instagram} alt="Instagram logo" className="w-6 h-6 mr-2" />
        <span>Facebook</span>
    </button>
            </div>
            {showQuries && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md h-fit">
                        <button onClick={toggleQuries} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold">
                            X
                        </button>
                        <Quries/>
                    </div>
                </div>
            )}

            <Footer/>
        </div>
    );
}

export default Campaigns;
