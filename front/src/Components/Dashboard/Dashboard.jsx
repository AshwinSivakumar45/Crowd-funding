import Sam from "../../Assests/sam.jpg";
import MyFundraise from "./Myfundraise";
import { useLocation, Link } from "react-router-dom";
import Profile from "./Profile";
import Feedback from "./Feedback";

function Dashboard() {
    const location = useLocation();

    function renderContent() {
        if (location.pathname === "/Dashboard/Myfunds") {
            return <MyFundraise />;
        }
        if (location.pathname.includes("/Dashboard/Profile")) {
            return <Profile/>;  
        }
        if (location.pathname.includes("/Dashboard/Feedback")) {
            return <Feedback/>;  
        }
        if(location.pathname.includes("/Dashboard/"))

        return <MyFundraise/>
    }

    return (
        <div className="flex">
            <div className="w-96 bg-gray-800 text-white p-6 mt-9 mb-7 ml-6 rounded-lg">
                <div className="flex flex-col items-center mb-6">
                    <img src={Sam} alt="User Profile" className="w-32 h-32 rounded-full object-cover border-4 border-green-500 mb-4 transition-all duration-300 ease-in-out hover:scale-105" />
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold text-gray-100">Username</h1>
                        <h2 className="text-lg text-gray-400 mt-1">test@gmail.com</h2>
                    </div>
                </div>
                <hr className="my-4 border-gray-600" />
                <div className="text-center">
                    <ul className="space-y-3">
                        <li>
                            <Link to="/Dashboard/Myfunds" className={`text-lg text-gray-200 hover:text-green-400 cursor-pointer block py-2 px-4 rounded-md transition-all  ${location.pathname === "/Dashboard/Myfunds" ? "bg-green-600" : ""}`}>My Fundraisers</Link>
                        </li>
                        <li>
                            <Link to="/Dashboard/Profile" className={`text-lg text-gray-200 hover:text-green-400 cursor-pointer block py-2 px-4 rounded-md  ${location.pathname === "/Dashboard/Profile" ? "bg-green-600" : ""}`}> Edit Profile</Link>
                        </li>
                        <li>
                            <Link to="/Dashboard/MyDonations" className={`text-lg text-gray-200 hover:text-green-400 cursor-pointer block py-2 px-4 rounded-md transition-all duration-300 ease-in-out ${location.pathname === "/Dashboard/MyDonations" ? "bg-green-600" : ""}`}> My Donations</Link>
                        </li>
                        <li>
                            <Link to="/Dashboard/Feedback" className={`text-lg text-gray-200 hover:text-green-400 cursor-pointer block py-2 px-4 rounded-md transition-all duration-300 ease-in-out ${location.pathname === "/Dashboard/Feedback" ? "bg-green-600" : ""}`}> Feedback</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex-1 bg-gray-100 p-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
