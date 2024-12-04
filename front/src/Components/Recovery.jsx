import { useState } from "react"
import login from "../Assests/login image.jpg"
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Recovery(){
        const[Email,setEmail]=useState("");
        const[error,setErrorMessage]=useState("")
        const navigate=useNavigate();

        async function  handlesubmit(e){
        e.preventDefault();
        setErrorMessage("");

        try {
            const result = await axios.post("http://localhost:1000/generateOTP", {
                Email
            },{ withCredentials: true });

            console.log(result);

            if (result.status === 200) {
                navigate("/otpverify");
            }
        } catch (error) {
            console.log(error.message);
            
        }   
    }
    return(
        <div className="flex justify-center m-20">

            <div className="mt-10">
                <h1 className="text-3xl font-medium">Enter Email 📧</h1>
                <h2 className="text-lg font-normal mb-5">Every step counts towards your goal. <br/>Enter the valid Email to send the OTP <br/>your identity and continue your Reset Progress</h2>

                <form onSubmit={handlesubmit}>
                    <label id="Email" className="text-sm  mt-5 mb-0">Enter your valid Email</label><br/>
                    <input type="text" placeholder="Email" id="otp" className="mb-3 border-2 border-black w-full h-12 rounded-lg pl-2" onChange={(e) => setEmail(e.target.value)}/><br/>

                    <button type="submit" className="login-btn flex justify-center border-2 border-black w-full h-12 pt-2 rounded-lg ">Get OTP</button>
                </form>
            </div>

            <div>
                <img src={login} alt="Login image" width={500} className="mx-10 rounded-2xl"/>
            </div>
        </div>
    )
}

export default Recovery;