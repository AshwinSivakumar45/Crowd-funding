import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Components/Style.css";
import login from "../Assests/register image.jpg";
import axios from "axios";

const SignUp = () => {
    const [name, setName] = useState("");
    const [Username, setUser] = useState("");
    const [Email, setEmail] = useState("");
    const [PhoneNo, setPhoneNo] = useState("");
    const [Address, setAddress] = useState("");
    const [Pincode, setPin] = useState("");
    const [Password, setPassword] = useState("");
    const [conform, setConform] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    async function handlesubmit(e) {
        e.preventDefault();
        setErrorMessage("");

        if (PhoneNo.length !== 10) {
            setErrorMessage("Please enter a valid Phone number");
            return;
        }

        const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/;

        if (Password.length <= 8) {
            return setErrorMessage("Password must be more than 8 characters");
        } else if (!specialCharacter.test(Password)) {
            return setErrorMessage("Password must contain at least one special character");
        } else if (Password !== conform) {
            return setErrorMessage("Passwords don't match");
        }

        try {
            const result = await axios.post("http://localhost:1000/register", {
                Name: name,
                Username,
                Email,
                PhoneNumber: PhoneNo,
                Address,
                Pincode,
                Password,
                conformPassword: conform,
            });

            console.log(result);

            if (result.status === 200) {
                navigate("/");
            }
        } catch (err) {
            console.error("Error during registration:", err.response?.data || err.message);
            setErrorMessage(err.response?.data || "Failed to register. Please try again later.");
        }
    }

    return (
        <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-10 p-5 lg:p-10">
            <div className="flex justify-center mb-10 lg:mb-0">
                <img src={login} alt="Login" className="w-72 lg:w-[500px] rounded-2xl" />
            </div>

            <div className="w-full max-w-lg">
                <h1 className="text-3xl font-medium text-center lg:text-left">Join Us!</h1>
                <h2 className="text-lg font-normal text-center lg:text-left mb-5">
                    Everyday is a chance to turn dreams into reality. Register to bring your vision to life and make an impact.
                </h2>
                {errorMessage && <p className="error-message text-red-600 text-center mb-5">{errorMessage}</p>}

                <form onSubmit={handlesubmit} className="space-y-4">
                    <div className="flex flex-col lg:flex-row lg:space-x-3">
                        <div className="w-full">
                            <label htmlFor="Name" className="text-lg">Name</label>
                            <input type="text" placeholder="Enter the Name" id="Name" className="border-2 border-black w-full h-12 rounded-lg pl-2 mt-1" onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="w-full mt-4 lg:mt-0">
                            <label htmlFor="Username" className="text-lg">Username</label>
                            <input type="text" placeholder="Create your Username" id="Username" className="border-2 border-black w-full h-12 rounded-lg pl-2 mt-1" onChange={(e) => setUser(e.target.value)} />
                        </div>
                    </div>

                    <label htmlFor="E-mail" className="text-lg">E-mail</label>
                    <input type="email" placeholder="Enter the E-mail" id="E-mail" className="border-2 border-black w-full h-12 rounded-lg pl-2 mt-1" onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="PhoneNumber" className="text-lg">Phone Number</label>
                    <input type="tel" placeholder="Enter your Phone Number" id="PhoneNumber" className="border-2 border-black w-full h-12 rounded-lg pl-2 mt-1" onChange={(e) => setPhoneNo(e.target.value)} />

                    <label htmlFor="message" className="text-lg">Address</label>
                    <textarea id="message" name="message" placeholder="Your Address" required className="border-2 border-black w-full h-32 rounded-lg pl-2 mt-1" onChange={(e) => setAddress(e.target.value)}></textarea>

                    <label htmlFor="Pincode" className="text-lg">Pincode</label>
                    <input type="number" placeholder="Enter your Pincode" id="Pincode" className="border-2 border-black w-full h-12 rounded-lg pl-2 mt-1" onChange={(e) => setPin(e.target.value)} />

                    <div className="flex flex-col lg:flex-row lg:space-x-3">
                        <div className="w-full">
                            <label htmlFor="Password" className="text-lg">Password</label>
                            <input type="password" placeholder="Enter your Password" id="Password" className="border-2 border-black w-full h-12 rounded-lg pl-2 mt-1" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="w-full mt-4 lg:mt-0">
                            <label htmlFor="ConformPassword" className="text-lg">Confirm Password</label>
                            <input type="password" placeholder="Re-Enter the Password" id="ConformPassword" className="border-2 border-black w-full h-12 rounded-lg pl-2 mt-1" onChange={(e) => setConform(e.target.value)} />
                        </div>
                    </div>

                    <button type="submit" className="bg-black text-white w-full h-12 rounded-lg mt-4">Sign Up</button>
                </form>
                <p className="text-center mt-4">
                    Already have an Account? <Link to="/" className="text-cyan-400">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
