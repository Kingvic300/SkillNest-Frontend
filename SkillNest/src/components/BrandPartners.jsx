import React from 'react';
import {
     FaBitbucket,
     FaDiscord,
     FaFigma,
     FaGithub,
     FaSlack,
     FaTrello,
     FaTwitter,
     FaWordpress
} from "react-icons/fa";

const BrandPartners = ({ darkMode }) => {
     const brands = [
          { icon: <FaSlack />, name: "Slack", color: "#E01E5A" },
          { icon: <FaTwitter />, name: "Twitter", color: "#1DA1F2" },
          { icon: <FaWordpress />, name: "WordPress", color: "#21759B" },
          { icon: <FaGithub />, name: "GitHub", color: "#181717" },
          { icon: <FaFigma />, name: "Figma", color: "#F24E1E" },
          { icon: <FaTrello />, name: "Trello", color: "#0079BF" },
          { icon: <FaBitbucket />, name: "Bitbucket", color: "#0052CC" },
          { icon: <FaDiscord />, name: "Discord", color: "#5865F2" },
     ];

     return (
         <section
             id="brand-partners"
             className={`py-20 transition-colors duration-300 ${
                 darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-700"
             }`}
         >
              <div className="max-w-6xl mx-auto px-4 text-center">
                   <h2 className="text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                        Brands That Support Us
                   </h2>
                   <p className="mb-12 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
                        We’re proud to be supported by some of the most respected platforms and tools in the tech ecosystem.
                   </p>

                   <div className="flex flex-wrap justify-center items-center gap-6">
                        {brands.map((brand, idx) => (
                            <div
                                key={idx}
                                aria-label={brand.name}
                                title={brand.name}
                                className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
                                style={{ backgroundColor: brand.color }}
                            >
                                 {React.cloneElement(brand.icon, {
                                      className: "text-white w-7 h-7"
                                 })}
                            </div>
                        ))}
                   </div>
              </div>
         </section>
     );
};

export default BrandPartners;
