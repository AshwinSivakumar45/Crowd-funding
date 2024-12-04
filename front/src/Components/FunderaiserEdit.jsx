import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FundEdit = () => {
    const [fundraiserName, setFundraiserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [title, setTitle] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [endDate, setEndDate] = useState("");
    const [category, setCategory] = useState("");
    const [bannerImage, setBannerImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [about, setAbout] = useState("");
    const [patientImages, setPatientImages] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [datum,setData] = useState()
    const navigate = useNavigate();

    const {_id} = useParams();
    // console.log(_id);
    
    useEffect(()=>{
        const fund = async()=>{
        const response = await axios.get(`http://localhost:1000/fundedit/${_id}`);
        setData(response.data)
        console.log(response);
        
        }
        fund()
    },[])

    const handlePatientImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setPatientImages(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userId = localStorage.getItem("userId");
        console.log(userId);
        

        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("fundraiserName", fundraiserName);
        formData.append("email", email);
        formData.append("phoneNumber", phoneNumber);
        formData.append("title", title);
        formData.append("totalAmount", totalAmount);
        formData.append("endDate", endDate);
        formData.append("category", category);
        formData.append("bannerImage", bannerImage);
        formData.append("profileImage", profileImage);
        formData.append("about", about);
        patientImages.forEach((image) => {
            formData.append("patientImages", image);
        });

        try {
            const result = await axios.post("http://localhost:1000/uploads", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(result);
            setMessage("Fundraiser added successfully!");
            
        } catch (error) {
            console.error("Error submitting form:", error);
            setMessage("There was an error submitting the form. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4 text-[#2c333c]">Create a New Fundraiser</h2>

            {message && <p className="text-green-500 mb-4">{message}</p>}

            {loading && (
                <div className="absolute inset-0 bg-slate-300 bg-opacity-90 flex items-center justify-center z-10">
                    <p className="text-red-500 text-lg font-semibold">Submitting your fundraiser...</p>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="fundraiserName" className="block text-lg font-medium text-[#2c333c]">Fundraiser Name</label>
                    <input
                        type="text"
                        id="fundraiserName"
                        className="mt-1 block w-full border-2 border-[#2c333c] p-2 rounded-md"
                        value={datum.fundraiserName}
                        onChange={(e) => setFundraiserName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-lg font-medium text-[#2c333c]">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full border-2 border-[#2c333c] p-2 rounded-md"
                        value={datum.Email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-lg font-medium text-[#2c333c]">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        className="mt-1 block w-full border-2 border-[#2c333c] p-2 rounded-md"
                        value={datum.phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="title" className="block text-lg font-medium text-[#2c333c]">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="mt-1 block w-full border-2 border-[#2c333c] p-2 rounded-md"
                        value={datum.title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="totalAmount" className="block text-lg font-medium text-[#2c333c]">Total Amount</label>
                    <input
                        type="number"
                        id="totalAmount"
                        className="mt-1 block w-full border-2 border-[#2c333c] p-2 rounded-md"
                        value={datum.totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="endDate" className="block text-lg font-medium text-[#2c333c]">End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        className="mt-1 block w-full border-2 border-[#2c333c] p-2 rounded-md"
                        value={datum.endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="category" className="block text-lg font-medium text-[#2c333c]">Category</label>
                    <select
                        id="category"
                        className="mt-1 block w-full border-2 border-[#2c333c] p-2 rounded-md"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select a Category</option>
                        <option value="Education">Education</option>
                        <option value="Health">Health</option>
                        <option value="Business">Business</option>
                        <option value="Animals">Animals</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="bannerImage" className="block text-lg font-medium text-[#2c333c]">Banner Image</label>
                    <input
                        type="file"
                        id="bannerImage"
                        className="mt-1 block w-full border-2 border-[#2c333c] p-2 rounded-md"
                        accept="image/*"
                        onChange={(e) => setBannerImage(e.target.files[0])}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="profileImage" className="block text-lg font-medium text-[#2c333c]">Profile Image</label>
                    <input
                        type="file"
                        id="profileImage"
                        className="mt-1 block w-full border-2 border-[#2c333c] p-2 rounded-md"
                        accept="image/*"
                        onChange={(e) => setProfileImage(e.target.files[0])}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="about" className="block text-lg font-medium text-[#2c333c]">About</label>
                    <textarea
                        id="about"
                        className="mt-1 block w-full border-2 border-[#2c333c] p-2 rounded-md"
                        value={datum.about}
                        onChange={(e) => setAbout(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="patientImages" className="block text-lg font-medium text-[#2c333c]">Patient Information (Multiple Photos)</label>
                    <input
                        type="file"
                        id="patientImages"
                        className="mt-1 block w-full border-2 border-[#2c333c] p-2 rounded-md"
                        accept="image/*"
                        multiple
                        onChange={handlePatientImagesChange}
                    />
                </div>

                <button type="submit" className="bg-[#34A853] text-white p-3 rounded-md w-full hover:bg-[#2c333c]">
                    Submit Fundraiser
                </button>
            </form>
        </div>
    );
};

export default FundEdit;
