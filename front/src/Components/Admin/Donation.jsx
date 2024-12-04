import React, { useEffect, useState } from "react";
import axios from "axios";

const DonationTable = () => {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);

  // Fetch donations from the server
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("http://localhost:1000/donation"); 
        console.log(response);
        setDonations(response.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, []);

  return (
    // <div className="overflow-auto mt-4">
    //   <table className="min-w-full bg-white rounded-lg shadow-md">
    //     <thead>
    //       <tr className="bg-gray-800 text-white">
    //         <th className="py-3 px-4 text-left">Donor Name</th>
    //         <th className="py-3 px-4 text-left">Amount</th>
    //         <th className="py-3 px-4 text-left">Date</th>
    //         <th className="py-3 px-4 text-left">Campaign</th>
    //         <th className="py-3 px-4 text-left">Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {donations.length > 0 ? (
    //         donations.map((donation) => (
    //           <tr key={donation._id} className="border-b border-gray-200">
    //             <td className="py-3 px-4">{donation.donorName || "Anonymous"}</td>
    //             <td className="py-3 px-4">₹{donation.amount}</td>
    //             <td className="py-3 px-4">{new Date(donation.createdAt).toLocaleDateString()}</td>
    //             <td className="py-3 px-4">{donation.campaign || "N/A"}</td>
    //             <td className="py-3 px-4">
    //               <button
    //                 className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-800 transition"
    //                 onClick={() => setSelectedDonation(donation)}
    //               >
    //                 View
    //               </button>
    //             </td>
    //           </tr>
    //         ))
    //       ) : (
    //         <tr>
    //           <td colSpan="5" className="text-center py-4 text-gray-500">
    //             No donations found.
    //           </td>
    //         </tr>
    //       )}
    //     </tbody>
    //   </table>

    //   {/* Modal for viewing details */}
    //   {selectedDonation && (
    //     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    //       <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
    //         <h2 className="text-lg font-semibold text-gray-800 mb-4">Donation Details</h2>
    //         <p><strong>Donor Name:</strong> {selectedDonation.donorName || "Anonymous"}</p>
    //         <p><strong>Amount:</strong> ₹{selectedDonation.amount}</p>
    //         <p><strong>Date:</strong> {new Date(selectedDonation.createdAt).toLocaleDateString()}</p>
    //         <p><strong>Campaign:</strong> {selectedDonation.campaign || "N/A"}</p>
    //         <p><strong>Payment ID:</strong> {selectedDonation.razorpayPaymentId}</p>
    //         <p><strong>Order ID:</strong> {selectedDonation.razorpayOrderId}</p>
    //         <button
    //           className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    //           onClick={() => setSelectedDonation(null)}
    //         >
    //           Close
    //         </button>
    //       </div>
    //     </div>
    //   )}
    // </div>

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 shadow-lg rounded-lg text-center max-w-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        This Page is Under Construction 🚧
      </h1>
      <p className="text-gray-600">
        We are working hard to get this feature ready for you. Stay tuned!
      </p>
    </div>
  </div>
  );
};

export default DonationTable;
