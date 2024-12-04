import React, { useState, useEffect } from "react";
import axios from "axios";

const ApproveCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

 
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("http://localhost:1000/pendingcampaigns"); 
        console.log(setCampaigns(response.data));
        
        
        
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  const handleViewDetails = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleCloseDetails = () => {
    setSelectedCampaign(null);
  };

  const handleApprove = async (campaignId) => {
    try {
      const response = await axios.post(`http://localhost:1000/approve/${campaignId}`);
      alert(`Campaign with ID ${campaignId} has been approved.`);
      setCampaigns((prevCampaigns) =>
        prevCampaigns.map((campaign) =>
          campaign.id === campaignId ? { ...campaign, status: "Approved" } : campaign
        )
      );
    } catch (error) {
      console.error("Error approving campaign:", error);
    }
  };

  const handleReject = async (campaignId) => {
    try {
      const response = await axios.post(
        `http://localhost:1000/reject/${campaignId}` // Adjust URL to your API endpoint
      );
      alert(`Campaign with ID ${campaignId} has been rejected.`);
      setCampaigns((prevCampaigns) =>
        prevCampaigns.filter((campaign) => campaign.id !== campaignId)
      );
    } catch (error) {
      console.error("Error rejecting campaign:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Approve Campaigns</h2>

      {/* Campaign Approval Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Campaign Title</th>
              <th className="py-3 px-6 text-left">Creator</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Method</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
  {campaigns.length > 0 ? (
    campaigns
      .filter((campaign) => campaign.status === "pending")
      .map((campaign) => (
        <tr key={campaign._id} className="border-b hover:bg-gray-50">
          <td className="py-3 px-6">{campaign.title}</td>
          <td className="py-3 px-6">{campaign.fundraiserName}</td>
          <td className="py-3 px-6">{campaign.status}</td>
          <td className="py-3 px-6">{campaign.category}</td>
          <td className="py-3 px-6 flex justify-end space-x-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => handleApprove(campaign._id)}
            >
              Approve
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => handleReject(campaign._id)}
            >
              Reject
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleViewDetails(campaign)}
            >
              View Details
            </button>
          </td>
        </tr>
      ))
  ) : (
    <tr>
      <td
        colSpan="5"
        className="py-6 text-center text-gray-500 font-semibold"
      >
        No campaigns pending approval.
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>

      {/* Campaign Details Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full shadow-xl">
            <h3 className="text-xl font-bold mb-4">
              Campaign Details - {selectedCampaign.title}
            </h3>
            <p className="mb-4">
              <strong>Description:</strong> {selectedCampaign.about}
            </p>
            <p className="mb-4">
              <strong>Target Amount:</strong> ${selectedCampaign.totalAmount}
            </p>
            <p className="mb-4">
              <strong>Raised Amount:</strong> 
              <img src={selectedCampaign.bannerImage} alt="" />
            </p>
            <p className="mb-4">
              <strong>Deadline:</strong> {selectedCampaign.endDate}
            </p>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={handleCloseDetails}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApproveCampaigns;
