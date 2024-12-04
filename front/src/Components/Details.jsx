import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiFillInstagram } from "react-icons/ai";
import { MdGroups } from "react-icons/md";
import "../Components/Style.css";

const CampaignDetails = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [amount, setAmount] = useState(""); 

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const result = await axios.get(`http://localhost:1000/details/${id}`);
                setCampaign(result.data);
            } catch (e) {
                console.error("Error fetching campaign details:", e);
            }
        };
        fetchCampaign();
    }, [id]);

    const handlePayment = async () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount to donate.");
            return;
        }

        try {

            const loggedInUserId = localStorage.getItem("userId"); 

            const orderResponse = await axios.post("http://localhost:1000/orders", {
                amount,
            });

            const { order_id, amount: orderAmount, currency } = orderResponse.data;

            const options = {
                key: "rzp_test_UtFEEE7DLIxos0",
                amount: orderAmount.toString(),
                currency,
                name: campaign?.fundraiserName || "Support Campaign",
                description: "Thank you for your support!",
                order_id,
                handler: async (response) => {
                    const paymentData = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        userId:loggedInUserId,
                        amount,
                        Fundraiser_id: campaign._id,
                        Fundraiser_Name:campaign.fundraiserName
                    };
                    console.log(paymentData);
                    

                    await axios.post("http://localhost:1000/verify", paymentData);
                    alert("Payment successful! Thank you for your support.");
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Error in payment processing:", error.message);
            alert("Payment failed. Please try again.");
        }
    };



    if (!campaign) return <p>Loading...</p>;

    return (
        <div className="bg-gray-100 min-h-screen p-6 flex justify-center">
            <div className="max-w-5xl w-full space-y-6">
                <header className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{campaign.title}</h1>
                    <div className="flex flex-col items-center md:flex-row gap-6">
                        <img src={campaign.bannerImage} alt="Campaign Banner" className="w-full md:w-1/2 rounded-lg bannerDetails"/>
                        <div className="flex flex-col items-start space-y-4 md:items-center md:text-center">
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount to donate" className="border border-gray-300 rounded-lg px-6 py-4 text-2xl font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition duration-200"/>

                            <button onClick={handlePayment} className="bg-green-500 hover:bg-green-600 text-white text-lg py-3 px-8 rounded-lg font-semibold transition duration-200">
                                Be a Supporter
                            </button>
                            <button className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-lg hover:opacity-95 transition duration-200">
                                <AiFillInstagram className="text-2xl" />
                                <span>Share the Message</span>
                            </button>
                            <p className="text-blue-600 text-lg font-semibold">
                                One Share, One Step Closer to Our Goal ₹5000
                            </p>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-700">Help Us Reach ₹ {campaign.totalAmount}</h2>
                                <p className="text-blue-600">We are still working towards our goal.</p>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <section className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">About This Campaign</h3>
                        <p className="text-gray-700 leading-relaxed">{campaign.about}</p>
                        <p className="mt-4 text-gray-500">
                            Providing scholarships and financial aid for children’s education, along with mentorship and guidance.
                        </p>
                    </section>

                    <div className="space-y-6">
                        <div className="bg-blue-100 rounded-lg shadow-lg p-6">
                            <h4 className="flex items-center text-lg font-semibold mb-4 text-gray-700">
                                <MdGroups className="text-2xl mr-2" />
                                Donated People
                            </h4>
                            <ul className="space-y-3">
                                <li className="flex justify-between items-center text-gray-700">
                                    <span>Arjun</span>
                                    <span>₹1,00,000</span>
                                </li>
                                <li className="flex justify-between items-center text-gray-700">
                                    <span>Ishika</span>
                                    <span>₹50,000</span>
                                </li>
                                <li className="flex justify-between items-center text-gray-700">
                                    <span>Lakshita</span>
                                    <span>₹49,999</span>
                                </li>
                                <li className="flex justify-between items-center text-gray-700">
                                    <span>Rishi</span>
                                    <span>₹50,000</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-blue-100 rounded-lg shadow-lg p-6">
                            <h4 className="flex items-center text-lg font-semibold mb-4 text-gray-700">
                                <MdGroups className="text-2xl mr-2" />
                                Top Donors
                            </h4>
                            <ul className="space-y-3">
                                <li className="flex justify-between items-center text-gray-700">
                                    <span>Advik</span>
                                    <span>₹1,00,000</span>
                                </li>
                                <li className="flex justify-between items-center text-gray-700">
                                    <span>Mithra</span>
                                    <span>₹50,000</span>
                                </li>
                                <li className="flex justify-between items-center text-gray-700">
                                    <span>Siddharth</span>
                                    <span>₹50,000</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <section className="bg-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Patient Records</h4>
                    <div className="flex gap-4 overflow-x-auto">
                         {campaign?.patientImages?.map((doc, index) => (<img key={index} src={doc} alt="Patient Record" className="w-[190px] h-[231px] object-cover rounded-lg"/>))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CampaignDetails;
