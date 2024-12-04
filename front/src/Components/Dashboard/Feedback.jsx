import axios from "axios";
import { useState } from "react";

function Feedback() {
    const [feedback, setFeedback] = useState("");
    const [Email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await axios.post("http://localhost:1000/feedback", {
                feedback,
                Email,
            });
            
            console.log(result);
            setSubmitted(true);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="bg-gray-100 flex items-center w-full justify-center py-12">
            <div className="w-full mx-5 p-8 bg-white shadow-md rounded-lg">
                {submitted ? (
                    <h1 className="text-2xl font-semibold text-green-700 text-center">
                        Thank you! Our team will contact you soon.
                    </h1>
                ) : (
                    <div>
                        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                            Please tell us what you think; any kind of feedback is highly appreciated. 🤗
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <label htmlFor="E-mail" className="text-lg font-semibold text-gray-700"> E-mail </label>
                                <input type="email" value={Email} placeholder="Enter your Email" id="E-mail" className="border-2 border-gray-300 w-full h-12 rounded-lg pl-4 mt-1 hover:border-[#34A853] transition duration-150 ease-in-out" onChange={(e) => setEmail(e.target.value)} /> 
                                <label htmlFor="message" className="text-lg font-semibold text-gray-700"> Enter Feedback </label>
                                <textarea id="message" name="message" placeholder="Type your feedback here..." required className="border-2 border-gray-300 w-full h-32 rounded-lg p-4 resize-none focus:outline-none focus:border-[#34A853] transition duration-150 ease-in-out"  onChange={(e) => setFeedback(e.target.value)}/>
                                <button className="bg-[#34A853] hover:bg-[#2c333c] text-white font-semibold w-full py-3 rounded-lg shadow-md transition duration-150 ease-in-out" type="submit">Submit Feedback</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Feedback;
