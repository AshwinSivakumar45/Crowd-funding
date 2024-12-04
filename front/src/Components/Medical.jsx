import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Style.css";
import Card from "./Card";

function Business() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const result = await axios.get("http://localhost:1000/card");
        setCampaigns(result.data.filter(campaign => campaign.category === "Health"));
        setLoading(false);
      } catch (e) {
        console.error("Error fetching campaigns:", e);
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-16 ml-10 mt-3 rounded-2xl grid grid-cols-3 gap-6">
      {campaigns.length > 0 ?(campaigns.map((campaign, index) => (
          <Card
            key={index}
            _id={campaign._id}
            title={campaign.title}
            fundraiserName={campaign.fundraiser}
            amountRaised={campaign.amountRaised}
            progress={campaign.progress}
            endDate={campaign.daysLeft}
            bannerImage={campaign.bannerImage}
            category={campaign.category}
            profileImage={campaign.profileImage}
          />
        ))
      ) : (
        <p>No business campaigns available.</p>
      )}
    </div>
  );
}

export default Business;
