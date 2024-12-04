function Success() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                <h1 className="text-3xl font-bold text-green-700 text-center mb-4">
                    Your Account is
                    <span className="text-red-600"> Under Review</span>
                </h1>
                <p className="text-gray-600 text-center mb-6">
                    Thank you for your patience while we review your information. We'll notify you as soon as the process is complete.
                </p>
                <div className="flex justify-center">
                    <button className="px-6 py-2 text-white bg-green-600 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Success;
