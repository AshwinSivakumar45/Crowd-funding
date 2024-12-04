import axios from "axios";
import { useState } from "react";

function Quries() {
    const [Question, setQuestion] = useState("");
    const [Email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false); // Track submission success

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const result = await axios.post("http://localhost:1000/question", {
                Question,
                Email
            });
            
            if (result.status === 200) {
                setSubmitted(true);
            }
        } catch (error) {
            console.error("Error submitting the question:", error);
        }
    }

    return (
        <div className="max-h-96 flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                {submitted ? (
                    <h1 className="text-2xl font-semibold text-green-700 text-center">
                        Thank you! Our team will contact you soon.
                    </h1>
                ) : (
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                            Feel free to ask any questions you may have! 😊
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <input type="email" placeholder="Type your email..." className="block w-full border border-gray-300 p-4 rounded-md h-10 mb-4 focus:outline-none focus:border-gray-800 focus:ring-2 focus:ring-gray-200"required onChange={(e) => setEmail(e.target.value)}/>
                            <textarea id="about" placeholder="Type your question here..."className="block w-full border border-gray-300 p-4 rounded-md resize-none h-32 focus:outline-none focus:border-gray-800 focus:ring-2 focus:ring-gray-200" required onChange={(e) => setQuestion(e.target.value)}/>
                            <button type="submit" className="w-full mt-4 bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
                                Submit
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Quries;
