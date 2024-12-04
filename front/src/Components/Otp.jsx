import login from "../Assests/login image.jpg"
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Otp = () =>{

    const [otp, setOtp] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate()

    async function handlesubmit(e){
        e.preventDefault();
        setErrorMessage("");
        // console.log(otp);

        try {
            const result = await axios.post("http://localhost:1000/otpverify", {
                OTP:otp
            },{ withCredentials: true });

            console.log(result);

            if (result.status === 200) {
                navigate("/reset");
            }
        } catch (error) {
            console.log(error.message);
            
        }   
    }

    return(
        <div className="flex justify-center m-20">

            <div className="mt-10">
                <h1 className="text-3xl font-medium">Enter OTP 🔐</h1>
                <h2 className="text-lg font-normal mb-5">Every step counts towards your goal. <br/>Enter the OTP sent to your Email to verify <br/>your identity and continue your Reset Progress</h2>

                <form onSubmit={handlesubmit}>
                    <label id="otp" className="text-sm flex justify-center mt-5 mb-0">Enter the 6 digit OTP send to your Email</label><br/>
                    <input type="text" placeholder="OTP" id="otp" className="mb-3 border-2 border-black w-full h-12 rounded-lg pl-2" onChange={(e) => setOtp(e.target.value)}/><br/>

                    <p className="text-cyan-400 flex justify-end mb-3">Resend OTP</p>
                    <button type="submit" className="login-btn flex justify-center border-2 border-black w-full h-12 pt-2 rounded-lg ">Recover</button>
                </form>
            </div>

            <div>
                <img src={login} alt="Login image" width={500} className="mx-10 rounded-2xl"/>
            </div>
        </div>
    )
}

export default Otp;