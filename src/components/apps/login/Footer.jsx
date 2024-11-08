import React from 'react'
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">Kepler</h3>
            <p className="text-gray-300 text-sm">
              Empowering your application tracking journey with modern
              solutions.
            </p>
            <div className="flex space-x-4 mt-4">
              <FaFacebook className="h-6 w-6 text-gray-300 hover:text-white transition-colors cursor-pointer" />
              <FaTwitter className="h-6 w-6 text-gray-300 hover:text-white transition-colors cursor-pointer" />
              <FaInstagram className="h-6 w-6 text-gray-300 hover:text-white transition-colors cursor-pointer" />
              <FaLinkedin className="h-6 w-6 text-gray-300 hover:text-white transition-colors cursor-pointer" />
              <FaGithub className="h-6 w-6 text-gray-300 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <div>
              {/* Input */}
              <div className="w-full h-auto text-sm">
                <div class="relative rounded-full overflow-hidden bg-white shadow-xl w-72">
                  <input
                    class="input text-black  bg-transparent outline-none border-none pl-6 pr-10 py-5 w-full font-sans text-lg font-semibold"
                    placeholder="Enter Your Email"
                    name="email"
                    type="email"
                  />
                  <div class="absolute right-2 top-[0.4em]">
                    <button class="w-14 h-14 rounded-full bg-[#1e3a8a] group shadow-xl flex items-center justify-center relative overflow-hidden">
                      <svg
                        class="relative z-10"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 64 64"
                        height="50"
                        width="50"
                      >
                        <path
                          fill-opacity="0.01"
                          fill="white"
                          d="M63.6689 29.0491L34.6198 63.6685L0.00043872 34.6194L29.0496 1.67708e-05L63.6689 29.0491Z"
                        ></path>
                        <path
                          stroke-linejoin="round"
                          stroke-linecap="round"
                          stroke-width="3.76603"
                          stroke="white"
                          d="M42.8496 18.7067L21.0628 44.6712"
                        ></path>
                        <path
                          stroke-linejoin="round"
                          stroke-linecap="round"
                          stroke-width="3.76603"
                          stroke="white"
                          d="M26.9329 20.0992L42.85 18.7067L44.2426 34.6238"
                        ></path>
                      </svg>
                      <div class="w-full h-full rotate-45 absolute left-[32%] top-[32%] bg-black group-hover:-left-[100%] group-hover:-top-[100%] duration-1000"></div>
                      <div class="w-full h-full -rotate-45 absolute -left-[32%] -top-[32%] group-hover:left-[100%] group-hover:top-[100%] bg-black duration-1000"></div>
                    </button>
                  </div>
                </div>
              </div>
              {/* <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button> */}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-300">
              © 2024 Kepler. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
