import "../Components/Style.css";
import eye from "../Assests/eye.png";
import like from "../Assests/like.png";
import charity from "../Assests/charity.png";
import contact from "../Assests/contact-m.png";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function FundraiserMaintain() {
    const { _id } = useParams();  
    const [user, setUser] = useState(""); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);  

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                console.log(_id);
                
                const result = await axios.get(`http://localhost:1000/canpaigndetails/${_id}`);
                setUser(result.data); 
                setLoading(false);  

            } catch (e) {
                console.error("Error fetching campaign details:", e);
                setError("Error fetching campaign details. Please try again later.");
                setLoading(false);
            }
        };

        fetchCampaign();
    }, [_id]);  

    
    useEffect(() => {
        if (user) {
            console.log(user);
        }
    }, [user]); 

    if (loading) {
        return <div className="text-center mt-16">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-16 text-red-500">{error}</div>;
    }

    return (
        <div>
            <div className="bg-gray-50 min-h-screen p-6">
                <div className="mt-7 title">
                    <h1 className="text-3xl font-semibold text-gray-800">{user.fundraisers.fundraiserName}</h1>
                </div>
                <br />

                <div className="Manager p-8 m-5 bg-white shadow-lg rounded-lg">
                    <div className="ml-20 mr-20">
                        <div className="flex border p-5 details justify-between rounded-lg shadow-md bg-gray-100">
                            <div>
                                <p className="ml-4 text-sm text-gray-600 mb-3">Goal: ₹{user.fundraisers.totalAmount}</p>
                                <p className="ml-4 text-xl font-semibold text-gray-800">₹{user.totalAmountRaised || 0} Raised</p>
                                <progress
                                    id="file"
                                    value="50"
                                    max="100"
                                    className="mt-0 ml-2 pl-2 progress w-full h-2 rounded-full bg-blue-200"
                                ></progress>
                            </div>

                            <div className="flex flex-col items-end justify-between">
                                <Link to="/Campaigns">
                                    <button className="border w-40 h-8 ml-10 btn-maintain bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-300">Go to Fundraiser</button>
                                </Link>
                                <Link to={`/EditFund/${user.fundraisers._id}`}>
                                <button className="border w-40 h-8 ml-10 mt-4 btn-maintain text-white rounded-md hover:bg-gray-900 transition duration-300">Edit Fund details</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-16">
                    <h1 className="text-6xl text-green-500 font-semibold">Welcome {user.fundraisers.fundraiserName},</h1>
                    <h1 className="text-5xl mt-2 text-gray-700">Your fundraiser is <span className="text-green-500">live</span></h1>
                </div>

                <div className="flex justify-between m-8">
                    <div className="flex justify-evenly bg-teal-600 p-6 m-10 rounded-2xl shadow-xl">
                        <div>
                            <h1 className="text-white text-lg font-semibold">Need help? Contact your Fundraiser manager</h1>
                            <h1 className="text-white text-sm mt-2">payfund@gmail.com</h1>
                            <h1 className="text-white text-sm">+91 6369979989</h1>
                        </div>
                        <div className="ml-10">
                            <img src={contact} alt="Contact" width={90} className="rounded-full border-2 border-white shadow-lg" />
                        </div>
                    </div>

                    <div className="m-10 bg-white shadow-lg p-6 rounded-2xl">
                        <h1 className="text-center p-2 text-xl text-gray-700 font-semibold">Withdraw</h1>
                        <h1 className="text-center text-lg text-gray-600">To withdraw, please add beneficiary details</h1>
                        <Link to="/verify">
                            <h1 className="text-center p-2 text-teal-600 underline font-medium">Click here to verify</h1>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default FundraiserMaintain;
