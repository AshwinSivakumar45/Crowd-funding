import React from "react";
import "./Style.css";
import { Link } from "react-router-dom";
// import sam from "../Assests/sam.jpg"; 

function Card({ title, fundraiserName, totalAmount, progress, endDate, bannerImage,category,profileImage,_id }) {

  return (
<Link to={`/details/${_id}`}>
    <div className="card inline-block w-80 rounded-2xl">
      <img src={bannerImage} alt="Campaign" className="bannerImage p-0" width={320} height={186}/>
      <p className="m-2 pl-2 font-bold">{title}</p>
      <p className="m-2 pl-2 profile flex">
        <img src={profileImage} alt="Profile" />
        <span className="ml-3 mt-1">{fundraiserName}</span>
      </p>
      <progress id="file" value={70000/totalAmount*100} max="100" className="mt-0 ml-2 pl-2"></progress>
      <p className="mt-2 mb-3 p-2">{20} days left</p>
    </div>
</Link>
  );
}   

export default Card;
