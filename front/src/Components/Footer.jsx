function Footer (){
    return(
        <div>
            <footer className="bg-gray-800 text-white py-6">
      <div className="text-center text-sm mb-4">
        <a href="#top" className="text-gray-400 hover:text-white">↑ Back to Top</a>
      </div>
      
      <div className="text-center text-sm mb-4">
        <p>Registered Address: YourCompany LTD, 1234 Address Street, City, Country</p>
        <p>© YourCompany. All Rights Reserved.</p>
      </div>
      
      <div className="flex justify-center space-x-6 mb-4">
        <a href="/privacy" className="text-gray-400 hover:text-white">Privacy & Terms of Use</a>
        <a href="/about" className="text-gray-400 hover:text-white">About Us</a>
        <a href="/trust" className="text-gray-400 hover:text-white">Why Trust Us</a>
        <a href="/editorial-policy" className="text-gray-400 hover:text-white">Editorial Policy</a>
        <a href="/login" className="text-gray-400 hover:text-white">Login</a>
        <a href="/contact" className="text-gray-400 hover:text-white">Email Us</a>
      </div>
      
      <div className="flex justify-center space-x-4">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </footer>

    </div>
    )
}

export default Footer