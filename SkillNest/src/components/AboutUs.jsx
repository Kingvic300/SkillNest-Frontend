import React from "react";

const AboutUs = ({ darkMode }) => {
     const values = [
          {
               title: "Our Vision",
               text: "To become Nigeria’s most trusted platform for connecting talent with opportunity.",
          },
          {
               title: "Our Mission",
               text: "To empower individuals and businesses with tools to find, connect, and grow together.",
          },
          {
               title: "Our Values",
               text: "Integrity, Innovation, Inclusivity, and Impact in everything we do.",
          },
     ];

     return (
         <section
             id="about-us"
             className={`py-20 px-6 min-h-screen transition-colors duration-300 ${
                 darkMode ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"
             }`}
         >
              <div className="max-w-5xl mx-auto text-center">
                   {/* Heading */}
                   <h2 className="text-4xl font-extrabold mb-6 text-blue-600 dark:text-blue-400">
                        About Us
                   </h2>

                   {/* Intro */}
                   <p className="text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
                        At <span className="font-semibold text-blue-600 dark:text-blue-400">SkillNest</span>, we believe in the power of talent.
                        Our mission is to simplify hiring by building a trusted community where professionals and employers can connect, grow, and thrive together.
                        <br /><br />
                        Whether you're a job seeker pursuing the next big opportunity or a recruiter searching for top talent,
                        SkillNest is your go-to platform — built with purpose, designed for success.
                   </p>

                   {/* Vision / Mission / Values */}
                   <div className="grid gap-8 md:grid-cols-3 text-left mt-10">
                        {values.map((item, idx) => (
                            <div
                                key={idx}
                                className={`p-6 rounded-xl border shadow-md hover:shadow-lg transition-all duration-300 ${
                                    darkMode
                                        ? "bg-gray-800 border-gray-700"
                                        : "bg-gray-100 border-gray-200"
                                }`}
                            >
                                 <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                                      {item.title}
                                 </h3>
                                 <p className="text-gray-700 dark:text-gray-300">{item.text}</p>
                            </div>
                        ))}
                   </div>
              </div>
         </section>
     );
};

export default AboutUs;
