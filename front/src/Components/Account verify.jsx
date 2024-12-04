import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Accountverify() {
    
    const [Name,setName]=useState("");
    const [Phone, setPhone]=useState("");
    const [Email,setEmail] = useState("");
    const [PanCard,setPan] =useState("");
    const [AccNo,setAccno] =useState("");
    const [Ifsc, setIfsc]=useState("");
    const [branch, setBranch]=useState(""); 
    const navigate = useNavigate() 

    async function  handleSubmit(e){
        e.preventDefault();
        try {
            let result =await axios.post("http://localhost:1000/Amount",{
                Name,
                Phone_Number: Phone,
                Email,
                Pan_card:PanCard,
                Account_Number:AccNo,
                IFSC_Number:Ifsc,
                Branch:branch
            })

            console.log(result);

            if(result.status === 200)
            {
               navigate("/Success")
            }
            
        } catch (e) {
            console.log(e.message);
            
        }

    }
    return (
        <div>
            <h1 className="text-center m-10 text-2xl">
                Account verification
            </h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md space-y-4">
        <div>
          <label className="block text-[#2c333c] font-medium mb-2">Name:</label>
          <input type="text"  name="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400" onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
          <label className="block text-[#2c333c] font-medium mb-2">Phone Number:</label>
          <input  type="tel" name="phoneNumber"  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400" onChange={(e)=>setPhone(e.target.value)}/>
        </div>
        <div>
          <label className="block text-[#2c333c] font-medium mb-2">Email:</label>
          <input type="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400" onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div>
          <label className="block text-[#2c333c] font-medium mb-2">PAN Card Number:</label>
          <input type="text"  name="panCard" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400" onChange={(e)=>setPan(e.target.value)}/>
        </div>
        <div>
          <label className="block text-[#2c333c] font-medium mb-2">Account Number:</label>
          <input type="text" name="accountNumber" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400" onChange={(e)=>setAccno(e.target.value)}/>
        </div>
        <div>
          <label className="block text-[#2c333c] font-medium mb-2">IFSC Code:</label>
          <input  type="text"  name="ifscCode" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400" onChange={(e)=>setIfsc(e.target.value)} />
        </div>
        <div>
          <label className="block text-[#2c333c] font-medium mb-2">Branch:</label>
          <input type="text" name="branch" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400" onChange={(e)=>setBranch(e.target.value)}/>
        </div>
        <button
          type="submit"  className="w-full py-2 mt-4 bg-[#34A853] text-white font-semibold rounded-md hover:bg-red-600"> Verify</button>
      </form>
        </div>
    );
  }
  
  export default Accountverify;
  