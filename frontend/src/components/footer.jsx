import { FaHeart } from "react-icons/fa";

const Footer = () => {
    return (
      <footer className="bg-green-600 text-white py-4 text-sm">
        <div className="container mx-auto px-4">
          {/* Main Footer Grid (Hidden on Small Screens) */}
          <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-lg font-bold mb-2 flex items-center">
                MediCare <FaHeart className="ml-2" />
              </h3>
              <p className="text-xs">Quality healthcare and seamless appointments.</p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-1">
                <li><a href="/" className="hover:text-green-200">Home</a></li>
                <li><a href="/about" className="hover:text-green-200">About Us</a></li>
                <li><a href="/services" className="hover:text-green-200">Services</a></li>
                <li><a href="/contact" className="hover:text-green-200">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-2">Contact Us</h4>
              <p className="text-xs">Email: info@medicare.com</p>
              <p className="text-xs">Phone: (987) 654-3210</p>
            </div>
          </div>

          {/* Copyright Section (Always Visible) */}
          <div className="text-center text-xs mt-4  pt-2">
            <p>&copy; {new Date().getFullYear()} MediCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
};

export default Footer;
