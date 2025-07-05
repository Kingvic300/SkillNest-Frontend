import React from 'react';
import {
     FaWhatsapp,
     FaTwitter,
     FaTelegramPlane,
     FaInstagram,
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const ContactUs = ({ darkMode }) => {
     return (
         <section
             id="contact-us"
             className={`min-h-screen flex flex-col items-center justify-center px-4 py-20 transition-colors duration-300 ${
                 darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800'
             }`}
         >
              <div className="max-w-4xl w-full text-center">
                   <h2 className="text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                        Contact Us
                   </h2>
                   <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
                        Reach out instantly through any of these channels. We're here to help and chat with you.
                   </p>

                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                        {/* Contact Button */}
                        {[
                             {
                                  href: "https://wa.me/2349059947055",
                                  icon: <FaWhatsapp className="text-green-500 text-4xl" />,
                                  label: "WhatsApp",
                                  hover: "hover:bg-green-100 dark:hover:bg-green-900",
                             },
                             {
                                  href: "mailto:steerifygroup@gmail.com",
                                  icon: <MdEmail className="text-red-500 text-4xl" />,
                                  label: "Gmail",
                                  hover: "hover:bg-red-100 dark:hover:bg-red-900",
                             },
                             {
                                  href: "https://twitter.com/yourhandle",
                                  icon: <FaTwitter className="text-blue-500 text-4xl" />,
                                  label: "Twitter",
                                  hover: "hover:bg-blue-100 dark:hover:bg-blue-900",
                             },
                             {
                                  href: "https://t.me/yourtelegram",
                                  icon: <FaTelegramPlane className="text-sky-500 text-4xl" />,
                                  label: "Telegram",
                                  hover: "hover:bg-sky-100 dark:hover:bg-sky-900",
                             },
                             {
                                  href: "https://instagram.com/yourhandle",
                                  icon: <FaInstagram className="text-pink-500 text-4xl" />,
                                  label: "Instagram",
                                  hover: "hover:bg-pink-100 dark:hover:bg-pink-900",
                             },
                        ].map(({ href, icon, label, hover }, idx) => (
                            <a
                                key={idx}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className={`flex flex-col items-center justify-center rounded-xl p-5 shadow-md transition duration-300 ${
                                    darkMode ? 'bg-gray-800' : 'bg-white'
                                } ${hover}`}
                            >
                                 {icon}
                                 <span className="mt-2 font-semibold">{label}</span>
                            </a>
                        ))}
                   </div>
              </div>
         </section>
     );
};

export default ContactUs;
