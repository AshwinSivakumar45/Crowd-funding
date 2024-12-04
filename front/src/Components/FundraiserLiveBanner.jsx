import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import heart from "../Assests/ketto-support-icon.avif"
import { useLocation } from "react-router-dom";

const FundraiserLiveBanner = () => {

    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const fundraiserName = urlParams.get('fundraiserName');
  const shareOnWhatsapp = () => {
    const message = `🎉 Congratulations ${fundraiserName}! Your fundraiser is live. Support our cause and make a difference!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex items-center justify-between bg-[#f8fbfd] border rounded-lg p-6 shadow-lg mx-auto max-w-4xl mt-8">
      <div className="flex items-center">
        <img
          src={heart}
          alt="Heart Icon"
          className="w-20 h-20 mr-4 rounded-full"
        />
        <div className="mx-10">
          <h2 className="text-2xl font-semibold text-gray-800">
            Congratulations {fundraiserName}! Your fundraiser is live.
          </h2>
          <p className="text-gray-500 mt-2">
            Share your fundraiser today to get your first donation and put your
            campaign on the path to success.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <button
          onClick={shareOnWhatsapp}
          className="bg-[#25D366] text-white px-6 py-3 rounded-lg flex items-center hover:bg-[#20b358] transition duration-300 ease-in-out"
        >
          <FaWhatsapp className="mr-2 text-xl" />
          Share on Whatsapp
        </button>
        <p className="text-teal-500 mt-2 text-sm">
          We’ve created a ready-to-send message just for you!
        </p>
      </div>
    </div>
  );
};

export default FundraiserLiveBanner;
