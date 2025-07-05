import React from "react";

const WhatWeOffer = ({ darkMode }) => {
     const offerings = [
          {
               title: "Smart Job Matching",
               desc: "We use intelligent algorithms to pair you with roles that match your skills and interests.",
          },
          {
               title: "Verified Employers",
               desc: "Every employer on our platform is vetted for authenticity and compliance.",
          },
          {
               title: "Career Resources",
               desc: "Access resume templates, interview guides, and expert advice to boost your career.",
          },
          {
               title: "Application Tracking",
               desc: "Monitor your application status in real-time and receive instant feedback from employers.",
          },
          {
               title: "Secure Messaging",
               desc: "Communicate directly with employers in a secure and professional environment.",
          },
          {
               title: "Mobile Friendly",
               desc: "Our responsive platform works seamlessly across devices so you can apply anytime, anywhere.",
          },
     ];

     return (
         <section
             id="what-we-offer"
             className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
                 darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
             }`}
         >
              <div className="max-w-7xl mx-auto">
                   <h2 className="text-4xl font-bold text-center mb-14 text-blue-600 dark:text-blue-400">
                        What We Offer
                   </h2>

                   <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {offerings.map((item, index) => (
                            <div
                                key={index}
                                className={`rounded-xl p-6 shadow-sm border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                                    darkMode
                                        ? "bg-gray-800 border-gray-700 text-gray-300"
                                        : "bg-gray-50 border-gray-200 text-gray-700"
                                }`}
                            >
                                 <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">
                                      {item.title}
                                 </h3>
                                 <p className="text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                   </div>
              </div>
         </section>
     );
};

export default WhatWeOffer;
