import login from "../Assests/login image.jpg";
import "../Components/Style.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    async function handlesubmit(e) {
        e.preventDefault();
        setErrorMessage("");

        try {
            const result = await axios.post("http://localhost:1000/Login", {
                Email,
                Password,
            });

            console.log(result);

            if (result.status === 200) {
                localStorage.setItem("authToken", result.data.token);
                localStorage.setItem("userId",result.data.checkmail._id)
                
                navigate("/Home");
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setErrorMessage(err.response.data);
            } else {
                setErrorMessage("An error occurred. Please try again.");
            }
        }
    }

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center p-5 lg:p-20 space-y-10 lg:space-y-0 lg:space-x-10">
            <div className="w-full max-w-lg flex justify-center lg:order-2">
                <img src={login} alt="Login" className="w-full h-auto rounded-2xl ml-9" />
            </div>
            <div className="w-full max-w-lg text-center lg:text-left lg:order-1">
                <h1 className="text-3xl font-medium">Welcome Back 👋</h1>
                <h2 className="text-lg font-normal mb-5">
                    Everyday is a new chance to create a change. Sign in to pursue your vision and make a difference.
                </h2>

                {errorMessage && <p className="error-message text-red-600 mb-5">{errorMessage}</p>}

                <form onSubmit={handlesubmit} className="space-y-4">
                    <div>
                        <label htmlFor="Email" className="text-lg">Email</label>
                        <input
                            type="email"
                            placeholder="Example@email.com"
                            id="Email"
                            className="border-2 border-black w-full h-12 rounded-lg pl-2 mt-1"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="Password" className="text-lg">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            id="Password"
                            className="border-2 border-black w-full h-12 rounded-lg pl-2 mt-1"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Link to="/recovery" className="text-cyan-400 text-sm flex justify-end mb-3">Forgot Password?</Link>
                    <button type="submit" className="bg-black text-white w-full h-12 rounded-lg">Sign In</button>
                </form>
                <p className="text-center mt-5">
                    Don’t have an account? <Link to="/register" className="text-cyan-400">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
