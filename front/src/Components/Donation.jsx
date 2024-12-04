import React, { useEffect, useState } from 'react';
import "../Components/Style.css";
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

const DonationCard = () => {
  const [selectedAmount, setSelectedAmount] = useState(300);
  const [customAmount, setCustomAmount] = useState('');
 

 
      const userId = localStorage.getItem('userId'); 
     

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null); 
  };

  const handlePledge = async () => {
    const amount = customAmount || selectedAmount;

    try {
      const loggedInUserId = localStorage.getItem("userId");

      const orderResponse = await axios.post(`http://localhost:1000/donation`, {
        amount,
      });

      const { order_id, amount: orderAmount, currency } = orderResponse.data;

      const options = {
        key: "rzp_test_UtFEEE7DLIxos0",
        amount: orderAmount.toString(),
        currency,
        name: "Monthly Donation", // Safe access to fundraiserName
        description: "Thank you for your support!",
        order_id,
        handler: async (response) => {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId: loggedInUserId,
            amount,
          };

          console.log(paymentData);

          // Send payment verification to backend
          await axios.post("http://localhost:1000/donationverify", paymentData);
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

  return (
    <div className=''>
      <div className='flex justify-end pt-20 h-screen pr-20 donation-card'>
        <div className="bg-[#f7f2e9] p-10 text-center rounded-lg shadow-md donation h-fit">
          <h2 className="text-2xl font-semibold mb-2">Social Impact Plan</h2>
          <p className="text-gray-600 mb-5">
            Join our community of monthly donors providing urgent medical care to children
          </p>

          <div className="flex justify-center gap-4 mb-5">
            <button
              className={`px-5 py-2 rounded-lg ${selectedAmount === 200 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => handleAmountClick(200)}
            >
              ₹200/mo
            </button>
            <button
              className={`px-5 py-2 rounded-lg ${selectedAmount === 300 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => handleAmountClick(300)}
            >
              ₹300/mo
            </button>
            <button
              className={`px-5 py-2 rounded-lg ${selectedAmount === 500 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => handleAmountClick(500)}
            >
              ₹500/mo
            </button>
            <input
              type="number"
              placeholder="Other Amount"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="px-5 py-2 border rounded-lg text-center w-28"
            />
          </div>

          <button
            className="bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-lg w-full text-lg font-medium"
            onClick={handlePledge}
          >
            Pledge ₹{customAmount || selectedAmount} / Month
          </button>

          <div className="flex items-center justify-center mt-5 text-sm text-gray-600">
            <span>4,21,908 donors are giving monthly</span>
          </div>

          <p className="text-xs text-gray-500 mt-5">
            This site is protected by reCAPTCHA and the Google <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Terms of Service</a> apply.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DonationCard;
