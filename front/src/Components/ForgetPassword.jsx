import login from "../Assests/login image.jpg";
import "../Components/Style.css"
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios"

const ForgetPassword = () =>{

    const [NewPassword, setNew] = useState("");
    const [Reset, setreEnter] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    async function handlesubmit(e){
     e.preventDefault();
    setErrorMessage("");


    const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/;

    if(NewPassword == ""){
        return setErrorMessage("Field is required")
    }else if(NewPassword.length < 8)
    {
        setErrorMessage("Please must be more the 8 characters");
    }else if(!specialCharacter.test(NewPassword)){
        return setErrorMessage("Please must contain atleast one special character");
    }
    else if(NewPassword !=Reset){
       return setErrorMessage("Password doesn't match")
    }
    console.log(NewPassword);


    try {
        const result = await axios.post("http://localhost:1000/resetPassword", {
            newPassword:NewPassword,
            confirmPassword:Reset
        },{ withCredentials: true });

        console.log(result);

        if (result.status === 200) {
            navigate("/");
        }
    } catch (error) {
        console.log(error.message);
        
    }   
}

    return(
        <div className="flex justify-center m-20">

            

            <div className="mt-10">
                <h1 className="text-3xl font-medium">Forgot Password? 🔒</h1>
                <h2 className="text-lg font-normal mb-5">Every setback is a setup for a comeback. <br/>Enter your new Password to reset your <br/>password and get back on track!</h2>
                {errorMessage && <p className="error-message text-red-600">{errorMessage}</p>}
                <form onSubmit={handlesubmit}>
                    <label id="Password" className="text-lg">New Password</label><br/>
                    <input type="Password" placeholder="Enter Your new Password" id="Password" className="mb-3 border-2 border-black w-full h-12 rounded-lg pl-2" onChange={(e) => setNew(e.target.value)}/><br/>

                    <label id="re-password" className="text-lg">Re-Enter Password</label><br/>
                    <input type="Password" placeholder="Re-Enter the Password" id="re-password" className=" border-2 border-black w-full h-12 rounded-lg pl-2" onChange={(e) => setreEnter(e.target.value)}/><br/>

                    <button type="submit" className="login-btn flex justify-center border-2 border-black w-full h-12 pt-2 rounded-lg mt-3 ">Sign in</button>
                </form>
            </div>

            <div>
                <img src={login} alt="Login image" width={500} className="mx-10 rounded-2xl"/>
            </div>
        </div>
    )
}

export default ForgetPassword