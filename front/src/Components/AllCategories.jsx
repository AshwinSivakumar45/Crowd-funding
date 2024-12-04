import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Style.css";
import Card from "./Card";

function AllCategory() {
  const [campaigns, setCampaigns] = useState([]); 

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        
        const result = await axios.get('http://localhost:1000/card')
        console.log("Fetched data:", result.data);
        setCampaigns(result.data); 
      } catch (e) {
        console.error("Error fetching campaigns:", e);
      }
    };

    fetchCampaigns(); 
  }, []);

  return (
    <div>
      <div className="p-16 ml-10 mt-3 rounded-2xl grid grid-cols-3 gap-6">
        {campaigns.length > 0 ? (campaigns.map((campaign, index) => (<Card key={index} {...campaign} />))) : ( <p>No campaigns available.</p> )}
      </div>
    </div>
  );
}

export default AllCategory;
