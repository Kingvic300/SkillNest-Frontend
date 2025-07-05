import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import Footer from "../components/Footer.jsx";
import Testimonials from "../components/Testimonials.jsx";
import BrandPartners from "../components/BrandPartners.jsx";
import ContactUs from "../components/ContactUs.jsx";
import AboutUs from "../components/AboutUs.jsx";
import WhatWeOffer from "../components/WhatWeOffer.jsx";
import HeroSection from "../components/HeroSection.jsx";
import Header from "../components/Header.jsx";

const DashBoard = () => {
     const { darkMode, toggleTheme } = useTheme(); // ✅ using global theme
     const navigate = useNavigate();

     const handleLogin = () => navigate("/auth");
     const handleSignup = () => navigate("/auth");

     return (
         <div
             className={`${
                 darkMode ? "bg-black text-white" : "bg-white text-black-800"
             } min-h-screen flex flex-col justify-between transition-colors duration-300`}
         >
              <Header
                  darkMode={darkMode}
                  toggleTheme={toggleTheme}
                  handleLogin={handleLogin}
                  handleSignup={handleSignup}
              />

              <main className="flex-grow px-4 pt-20 pb-8 max-w-6xl mx-auto space-y-20">
                   <HeroSection
                       darkMode={darkMode}
                       handleSignup={handleSignup}
                       handleLogin={handleLogin}
                   />
                   <WhatWeOffer darkMode={darkMode} />
                   <AboutUs darkMode={darkMode} />
                   <ContactUs darkMode={darkMode} />
                   <Testimonials darkMode={darkMode} />
                   <BrandPartners darkMode={darkMode} />
              </main>

              <Footer darkMode={darkMode} />
         </div>
     );
};

export default DashBoard;
