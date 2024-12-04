import { useState } from "react";
import axios from "axios";
import { useEffect,useRef } from "react";

function ProfileForm() {
    const [userID, setUserID] = useState("");
    const [Name, setName] = useState("");
    const [Username, setUser] = useState("");
    const [Email, setEmail] = useState("");
    const [PhoneNo, setPhoneNo] = useState("");
    const [Address, setAddress] = useState("");
    const [Pin, setPin] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const isInitialRender = useRef(true);
    



    useEffect(()=>{
        async function ProfileData(){
            try {
                const token = localStorage.getItem("authToken");
                console.log(token);
                
                const result=await axios.get("http://localhost:1000/Profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                const { _id="",Name = "", Username = "", Email = "", PhoneNumber = "", Address = "", Pincode = "" } = result.data || {};
                setUserID(_id)
                setName(Name);
                setUser(Username);
                setEmail(Email);
                setPhoneNo(PhoneNumber);
                setAddress(Address);
                setPin(Pincode);
                // console.log(Name);
            } catch (e) {
                console.error("Error fetching campaign details:", e);
            }
        }
        if (isInitialRender.current) {
            ProfileData();
            isInitialRender.current = false;
        }
    },[])


     const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Form Submitted:", { Name, Username, Email, PhoneNo, Address, Pin });

        if (PhoneNo.length !== 10) {
            setErrorMessage("Please enter a valid Phone number");
            return;
        }

        try {
            const result = await axios.post("http://localhost:1000/ProfileUpdate", {
                Name,
                Username,
                Email,
                PhoneNumber: PhoneNo,
                Address,
                Pincode:Pin,
            },{
                headers: {
                    userID: userID, 
                }
                });

            console.log(result);
        } catch (err) {
            console.error("Error during registration:", err.response?.data || err.message);
            setErrorMessage(err.response?.data || "Failed to register. Please try again later.");
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12">
            <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-10 #34A853 lg:p-10 shadow-lg rounded-lg bg-white max-w-4xl w-full">
                <div className="w-full max-w-lg">
                {errorMessage && <p className="error-message text-red-600 text-center mb-5">{errorMessage}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col lg:flex-row lg:space-x-3">
                            <div className="w-full">
                                <label htmlFor="Name" className="text-lg font-semibold text-gray-700">Name</label>
                                <input type="text" value={Name} id="Name" className="border-2 border-gray-300  w-full h-12 rounded-lg pl-4 mt-1 hover:border-[#34A853] transition duration-150 ease-in-out"onChange={(e) => setName(e.target.value)}/>
                            </div>

                            <div className="w-full mt-4 lg:mt-0">
                                <label htmlFor="Username" className="text-lg font-semibold text-gray-700">Username</label>
                                <input type="text" value={Username} id="Username" className="border-2 border-gray-300  w-full h-12 rounded-lg pl-4 mt-1 hover:border-[#34A853] transition duration-150 ease-in-out"onChange={(e) => setUser(e.target.value)}/>
                            </div>
                        </div>

                        <label htmlFor="E-mail" className="text-lg font-semibold text-gray-700">E-mail</label>
                        <input type="email" value={Email} id="E-mail" className="border-2 border-gray-300  w-full h-12 rounded-lg pl-4 mt-1 hover:border-[#34A853] transition duration-150 ease-in-out" onChange={(e) => setEmail(e.target.value)}/>

                        <label htmlFor="PhoneNumber" className="text-lg font-semibold text-gray-700">Phone Number</label>
                        <input type="tel" value={PhoneNo} id="PhoneNumber" className="border-2 border-gray-300  w-full h-12 rounded-lg pl-4 mt-1 hover:border-[#34A853] transition duration-150 ease-in-out"onChange={(e) => setPhoneNo(e.target.value)}/>

                        <label htmlFor="message" className="text-lg font-semibold text-gray-700">Address</label>
                        <textarea id="message" name="message" value={Address} required className="border-2 border-gray-300  w-full h-32 rounded-lg pl-4 mt-1 hover:border-[#34A853] transition duration-150 ease-in-out" onChange={(e) => setAddress(e.target.value)}></textarea>

                        <label htmlFor="Pincode" className="text-lg font-semibold text-gray-700">Pincode</label>
                        <input type="number" value={Pin} id="Pincode" className="border-2 border-gray-300  w-full h-12 rounded-lg pl-4 mt-1 hover:border-[#34A853] transition duration-150 ease-in-out" onChange={(e) => setPin(e.target.value)}/>

                        <button type="submit" className="bg-[#2c333c] hover:bg-[#34A853] text-white w-full h-12 rounded-lg mt-4 font-semibold shadow-md transition duration-150 ease-in-out">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProfileForm;
