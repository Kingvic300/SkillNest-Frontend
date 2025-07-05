import React from "react";

const HeroSection = ({ darkMode, handleSignup, handleLogin }) => {
     return (
         <section
             className={`min-h-screen flex flex-col justify-center items-center px-6 text-center ${
                 darkMode ? "bg-black text-white" : "bg-white text-gray-800"
             }`}
         >
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                   Empowering Careers. Connecting Talent.
              </h1>

              <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-500 dark:text-gray-400 mb-8">
                   SkillNest helps job seekers and employers find each other faster and smarter.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                   <button
                       onClick={handleSignup}
                       className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                   >
                        Get Started
                   </button>
                   <button
                       onClick={handleLogin}
                       className="px-6 py-3 rounded-lg border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                   >
                        Login
                   </button>
              </div>
         </section>
     );
};

export default HeroSection;
