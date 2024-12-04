import React, { useState } from "react";
import { useEffect } from "react";
import { FaHeartbeat, FaPaw, FaSchool, FaBusinessTime } from "react-icons/fa";
import Education from '../Assests/education-sponser.jpeg';
import Surgery from '../Assests/heartsurgery.avif';
import Animal from '../Assests/Animals-2.avif';
import Dog from '../Assests/Animal-3.avif';
import Sponsor from '../Assests/Sponsor.webp';
import Care from '../Assests/Care.webp';
import Hungry from '../Assests/Hungry.webp';
import Footer from "./Footer";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {

  const [campaign,setCampaign] = useState([])

  useEffect(() => {
    const fetchCampaign = async () => {
        try {
            const result = await axios.get(`http://localhost:1000/card`);
            setCampaign(result.data);

            console.log(result)
        } catch (e) {
            console.error("Error fetching campaign details:", e);
        }
    };
    fetchCampaign();
}, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <div 
        className="banner_h min-h-screen bg-cover bg-center flex items-start text-black"
        style={{
          height:300,
          backgroundImage: "url('https://img-cdn.inc.com/image/upload/f_webp,c_fit,w_828,q_auto/images/panoramic/getty_1053277490_415016.jpg')",
        }}
      >
        <div className="w-full max-w-2xl px-8 pt-32 pb-20">
          <h1 className="text-4xl md:text-5xl font-bold">Need Help with Medical Expenses?</h1>
          <p className="text-lg md:text-xl mt-4">
            Raise Funds for Your Treatment and Hospital Bills.
          </p>
          <Link to="/fundraiser"><button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">
            Create a Free Fundraiser
          </button></Link>
        </div>
      </div>
      
      {/* Category Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8">
        <Link to="/Campaigns/Education"><CategoryCard icon={<FaSchool />} title="Education" /></Link>
        <Link to="/Campaigns/Medical"><CategoryCard icon={<FaHeartbeat />} title="Medical" /></Link>
        <Link to="/Campaigns/Animal"><CategoryCard icon={<FaPaw />} title="Animal Welfare" /></Link>
        <Link to="/Campaigns/Business"><CategoryCard icon={<FaBusinessTime />} title="Business Support" /></Link>
      </section>

      {/* Featured Causes */}
      <section className="p-8 bg-white shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Causes</h2>
        <div className="flex gap-6 overflow-x-scroll whitespace-nowrap scrollbar-hide">
        {campaign.map((campaigns, index) => (
          <CauseCard 
            key={index} 
            imgSrc={campaigns.bannerImage} 
            title={campaigns.title} 
            raised={campaigns.raised} 
            goal={campaigns.goal} 
            daysLeft={campaigns.daysLeft}
            _id={campaigns._id || campaigns.id} 
          />
        ))}
      </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="bg-gray-200 p-12 text-center">
        <h3 className="text-2xl font-bold">Our Impact So Far</h3>
        <div className="flex justify-around mt-8">
          <ImpactMetric value="₹15,000,000+" description="Funds Raised" />
          <ImpactMetric value="2,500+" description="Successful Campaigns" />
          <ImpactMetric value="50,000+" description="Supporters Worldwide" />
        </div>
      </section>

      {/* Donation Plan Section */}
      <div className="bg-gray-100 py-10 px-4 flex justify-center">
        <div className="bg-secondary rounded-lg p-8 w-full max-w-5xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Introducing Social Impact Plan..</h2>
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Create more impact with SIP</h1>
            <p className="text-gray-600 mt-2">
              You hold the power to empower change, amplify impact, and create potential - all with a single tap of a button.
            </p>
          </div>
          
          {/* Card Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <ImpactCard imgSrc={Dog} title="Shelter Innocent Strays" description="1,987 meals sponsored" />
            <ImpactCard imgSrc={Sponsor} title="Sponsor Education" description="1,987 kids educated" />
            <ImpactCard imgSrc={Care} title="Support The Elderly" description="1,987 meals sponsored" />
            <ImpactCard imgSrc={Hungry} title="Stop Them From Sleeping Hungry" description="1,987 meals sponsored" />
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-gray-700 text-lg font-medium">
              Starting at only <span className="font-bold text-gray-800">₹100/month</span>
            </p>
            <Link to="/donation"><button className="mt-4 sm:mt-0 bg-teal-950 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg">
              Donate monthly →
            </button></Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="p-12 text-center bg-gray-100">
        <h3 className="text-3xl font-bold">How It Works</h3>
        <div className="flex flex-col md:flex-row justify-center mt-8 space-y-6 md:space-y-0 md:space-x-12">
          <Step number="1" description="Explore & Choose a Cause" />
          <Step number="2" description="Donate & Share" />
          <Step number="3" description="Witness the Impact" />
        </div>
      </section>

      {/* Footer Section */}
     <Footer/>

    </div>
  );
}

// Components
const CategoryCard = ({ icon, title }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
    <div className="text-4xl text-blue-500 mb-4">{icon}</div>
    <h3 className="text-lg font-semibold">{title}</h3>
  </div>
);

const CauseCard = ({ imgSrc, title, raised, goal, daysLeft,_id }) => (
  <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col w-96">
    <img 
      src={imgSrc || 'path_to_default_image.jpg'} 
      alt={title} 
      className="rounded-md h-40 w-full object-cover mb-4" 
    />
    <h4 className="text-lg font-semibold">{title}</h4>
    <p className="text-gray-600">Raised: {raised} / {goal}</p>
    <p className="text-gray-500">{daysLeft} days left</p>

    <Link to={`/details/${_id}`}>
    <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold">
      Donate Now
    </button>
    </Link>
  </div>
);


const ImpactMetric = ({ value, description }) => (
  <div className="text-center">
    <p className="text-4xl font-bold text-blue-500">{value}</p>
    <p className="text-lg text-gray-600">{description}</p>
  </div>
);

const ImpactCard = ({ imgSrc, title, description }) => (
  <div className="bg-white p-4 rounded-lg shadow-md text-center flex flex-col items-center">
    <img src={imgSrc} alt={title} className="h-24 w-24 rounded-full object-cover mb-4" />
    <h4 className="font-bold text-lg">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Step = ({ number, description }) => (
  <div className="flex flex-col items-center">
    <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
      {number}
    </div>
    <p className="text-lg font-semibold">{description}</p>
  </div>
);

export default Home;
