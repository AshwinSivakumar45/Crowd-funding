import axios from 'axios';
import React, { useEffect, useState } from 'react';

const HandleCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:1000/campaigns");
        setCampaigns(response.data.data); 
      } catch (error) {
        console.error("Error fetching campaigns:", error.message);
      }
    }
    fetchData(); 
  }, []);

  const handleViewDetails = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleCloseDetails = () => {
    setSelectedCampaign(null);
  };

  const handleDelete = async(_id)=>{
          const response = await axios.post(`http://localhost:1000/deleteCampaigns/${_id}`)
          console.log(response.data);
          
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Handle Campaigns</h2>

      <div className="overflow-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Campaign Title</th>
              <th className="py-3 px-4 text-left">Creator</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.length > 0 ? (
              campaigns.map((campaign) => (
                <tr key={campaign._id} className="border-b">
                  <td className="py-3 px-4">{campaign.title}</td>
                  <td className="py-3 px-4">{campaign.fundraiserName}</td>
                  <td className="py-3 px-4">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
                      onClick={() => handleViewDetails(campaign)}
                    >
                      View Details
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onClick={()=>handleDelete(campaign._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="py-3 px-4 text-center text-gray-500 italic"
                >
                  No campaigns available
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
              <strong>Raised Amount:</strong> ${selectedCampaign.raisedAmount}
            </p>
            <p className="mb-4">
              <strong>Deadline:</strong> {selectedCampaign.endDate}
            </p>
            {selectedCampaign.bannerImage && (
              <div className="mb-4">
                <strong>Banner Image:</strong>
                <img
                  src={selectedCampaign.bannerImage}
                  alt="Banner"
                  className="w-full h-auto mt-2 rounded"
                />
              </div>
            )}
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

export default HandleCampaigns;
