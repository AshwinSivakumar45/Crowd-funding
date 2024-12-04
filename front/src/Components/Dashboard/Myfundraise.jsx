import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Medical from "../../Assests/Medical-4.avif";

function MyFundraise() {
    const [fundraisers, setFundraisers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFundraisers = async () => {
            try {
               
                const userId = localStorage.getItem("userId");

                if (userId) {
                 
                    const response = await axios.get("http://localhost:1000/fundDetails", {
                        params: { userId }
                    });
                    
                    setFundraisers(response.data);
                }
            } catch (error) {
                console.error("Error fetching fundraisers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFundraisers();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 border-b-4 border-green-500 pb-3">My Fundraisers</h1>

            {loading ? (
                <p>Loading fundraisers...</p>
            ) : fundraisers.length === 0 ? (
                <p>No fundraisers found.</p>
            ) : (
                fundraisers.map((fundraiser) => (
                    <Link to={`/CampainMaintain/${fundraiser._id}`} key={fundraiser._id}>
                        <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-white border rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 mb-4">
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors duration-300 mb-2">
                                    {fundraiser.title}
                                </h2>
                                <p className="text-gray-500 text-sm mb-2">
                                    Started: {new Date(fundraiser.createdAt).toLocaleDateString()} - End: {new Date(fundraiser.endDate).toLocaleDateString()}
                                </p>
                                <div className="flex items-center mt-4">
                                    <span className="text-green-500 font-medium mt-5">
                                        {`Fundraiser is ${fundraiser.status}`}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center mt-4 sm:mt-0">
                                <img
                                    src={fundraiser.bannerImage || Medical}
                                    alt="Fundraiser"
                                    className="w-32 h-24 rounded-lg object-cover mb-4 shadow-md"
                                />
                                <button className="text-sm text-green-600 font-semibold hover:underline focus:outline-none">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
}

export default MyFundraise;
