import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="marble-bg text-white py-8 px-4 md:px-8"
      style={{ backgroundColor: "#800020" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="w-full flex flex-col min-[800px]:flex-row justify-between gap-0 pb-8">
          <div className="">
            <img
              src="/images/vistora-logo.png"
              alt="Vistora Tech"
              className="w-full max-w-[300px] h-auto object-contain mb-8"
            />
            {/** <p className="text-gray-300 text-sm">
              A blockchain solution for healthcare
            </p> */}
          </div>
          <div className="flex flex-wrap gap-12 min-[800px]:pt-4">
            <div className="">
            <Link to="/faq">
  <h3 className="text-sm font-bold mb-4 cursor-pointer hover:text-white transition-colors">
    About Us
  </h3>
</Link>


              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div className="">
              <h3 className="text-sm font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
              </ul>
            </div>
            <div className="">
              <h3 className="text-sm font-bold mb-4">Contact</h3>
              <div className="text-sm text-gray-300 space-y-2">
                <p>123 Blockchain Street</p>
                <p>San Francisco, CA 94103</p>
                <p>contact@vistora.com</p>
              </div>
            </div>
          </div>
          {/** <div className=" hidden grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:pt-4">
              <h3 className="text-sm font-bold mb-4">About Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:pt-4">
              <h3 className="text-sm font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:pt-4">
              <h3 className="text-sm font-bold mb-4">Contact</h3>
              <div className="text-sm text-gray-300 space-y-2">
                <p>123 Blockchain Street</p>
                <p>San Francisco, CA 94103</p>
                <p>contact@vistora.com</p>
              </div>
            </div>
          </div> */}
        </div>

        <div className="border-t border-red-900 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-300 mb-4 md:mb-0">
            © 2025 Vistora. All Rights Reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
              </svg>
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.891h2.54v-2.203c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.891h-2.33v6.988c4.781-.75 8.437-4.887 8.437-9.878z"></path>
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 4.948.072c-4.358.2-6.78 2.618-6.98 6.98C1.94 7.333 1.93 7.741 1.93 12c0 4.259.014 4.668.072 8.052c.2 4.354 2.618 6.78 6.98 6.979C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.979C22.069 16.667 22.07 16.259 22.07 12c0-4.259-.014-4.667-.072-8.052C21.8 1.618 19.382-.799 15.02.072 14.667.014 14.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
