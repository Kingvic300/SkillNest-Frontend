import React from "react";

const Footer = ({ darkMode }) => {
     return (
         <footer className={`${darkMode ? "bg-gray-900 text-gray-300" : "bg-white text-gray-700"} border-t px-6 py-10`}>
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div>
                        <h2 className="text-2xl font-bold mb-2 text-blue-600">SkillNest</h2>
                        <p className="text-sm">
                             Empowering talents, connecting employers. Join our community to find the perfect fit.
                        </p>
                   </div>

                   <div>
                        <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                             <li>
                                  <a href="#about-us" className="hover:text-blue-600 transition">About Us</a>
                             </li>
                             <li>
                                  <a href="#what-we-offer" className="hover:text-blue-600 transition">What We Offer</a>
                             </li>
                             <li>
                                  <a href="#contact-us" className="hover:text-blue-600 transition">Contact Us</a>
                             </li>
                        </ul>
                   </div>

                   <div>
                        <h3 className="text-lg font-semibold mb-2">Contact</h3>
                        <p className="text-sm">Email: support@skillnest.com</p>
                        <p className="text-sm">Phone: +234 800 000 0000</p>
                        <p className="text-sm">Lagos, Nigeria</p>
                   </div>
              </div>

              <div className="mt-10 text-center text-xs text-gray-400">
                   &copy; {new Date().getFullYear()} SkillNest. All rights reserved.
              </div>
         </footer>
     );
};

export default Footer;
