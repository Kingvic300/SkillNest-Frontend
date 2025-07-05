import React, { useState, useRef, useEffect } from "react";
import { Sun, Moon, Menu, User, LogOut, Settings, Bell, Search } from "lucide-react";
import { ProfilePeek } from "./ProfilePeek";
import { useNavigate } from "react-router-dom";

const Header = ({ darkMode, toggleTheme, handleLogin, handleSignup }) => {
     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
     const [searchQuery, setSearchQuery] = useState("");
     const mobileMenuRef = useRef(null);
     const navigate = useNavigate();

     // Close mobile menu when clicking outside
     useEffect(() => {
          const handleClickOutside = (e) => {
               if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
                    setMobileMenuOpen(false);
               }
          };
          document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside);
     }, []);

     const handleLogout = () => {
          // Clear any stored user data
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          // Navigate to home page
          navigate("/");
          // You can add toast notification here if needed
     };

     const navigationItems = [
          { label: "About Us", href: "#about-us" },
          { label: "What We Offer", href: "#what-we-offer" },
          { label: "Contact Us", href: "#contact-us" },
     ];

     return (
         <header className="fixed top-0 left-0 w-full z-50">
              <nav
                  className={`relative px-6 py-4 shadow-lg backdrop-blur-md border-b transition-all duration-700
                      ${darkMode
                      ? "bg-black/90 text-white border-gray-800"
                      : "bg-white/90 text-black border-gray-200"}
                      `}
              >
                   <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
                        {/* Logo */}
                        <div className="flex items-center gap-8">
                             <div
                                 className={`text-2xl font-extrabold tracking-tight cursor-pointer transition-all duration-300 hover:scale-105 ${
                                     darkMode ? "text-white" : "text-blue-600"
                                 }`}
                                 onClick={() => navigate("/")}
                             >
                                  SkillNest
                             </div>

                             {/* Desktop Navigation */}
                             <div className="hidden lg:flex space-x-8">
                                  {navigationItems.map((item, idx) => (
                                       <a
                                           key={idx}
                                           href={item.href}
                                           className={`text-sm font-medium transition duration-300 hover:scale-105 ${
                                               darkMode
                                                   ? "text-gray-300 hover:text-white"
                                                   : "text-gray-700 hover:text-blue-600"
                                           }`}
                                       >
                                            {item.label}
                                       </a>
                                  ))}
                             </div>
                        </div>

                        {/* Search Bar - Desktop */}
                        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
                             <div className="relative w-full">
                                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                                       darkMode ? "text-gray-400" : "text-gray-500"
                                  }`} />
                                  <input
                                       type="text"
                                       placeholder="Search jobs, skills..."
                                       value={searchQuery}
                                       onChange={(e) => setSearchQuery(e.target.value)}
                                       className={`w-full pl-10 pr-4 py-2 rounded-full text-sm border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                           darkMode
                                               ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                                               : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                                       }`}
                                  />
                             </div>
                        </div>

                        {/* Right side: Actions and Profile */}
                        <div className="flex items-center gap-4">
                             {/* Notifications */}
                             <button
                                 className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                                     darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                                 }`}
                                 aria-label="Notifications"
                             >
                                  <Bell className={`w-5 h-5 ${
                                       darkMode ? "text-gray-300" : "text-gray-600"
                                  }`} />
                             </button>

                             {/* Theme toggle */}
                             <button
                                 onClick={toggleTheme}
                                 aria-label="Toggle Theme"
                                 className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                                     darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                                 }`}
                             >
                                  {darkMode ? (
                                       <Sun className="w-5 h-5 text-yellow-400" />
                                  ) : (
                                       <Moon className="w-5 h-5 text-gray-800" />
                                  )}
                             </button>

                             {/* Profile dropdown */}
                             <ProfilePeek
                                 trigger={
                                      <div
                                          className={`cursor-pointer flex items-center gap-2 p-2 rounded-full transition-all duration-300 hover:scale-105 ${
                                               darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                                          }`}
                                          aria-label="User Menu"
                                      >
                                           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                                <User className="w-4 h-4 text-white" />
                                           </div>
                                           <span className="hidden sm:block text-sm font-medium">
                                                Welcome
                                           </span>
                                      </div>
                                 }
                                 content={
                                      <div className="text-sm space-y-3">
                                           <div className="text-center pb-3 border-b border-gray-200 dark:border-gray-700">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-2">
                                                     <User className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="font-semibold text-black dark:text-white">
                                                     Welcome to SkillNest
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                     Your career journey starts here
                                                </div>
                                           </div>
                                           
                                           <button
                                               onClick={handleLogin}
                                               className="w-full py-2.5 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium"
                                           >
                                                Login
                                           </button>
                                           
                                           <button
                                               onClick={handleSignup}
                                               className="w-full py-2.5 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 font-medium"
                                           >
                                                Sign Up
                                           </button>

                                           <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                                                >
                                                     <LogOut className="w-4 h-4" />
                                                     Logout
                                                </button>
                                           </div>
                                      </div>
                                 }
                             />

                             {/* Mobile Menu Icon */}
                             <button
                                 className="lg:hidden p-2 rounded-lg transition-all duration-300 hover:scale-110"
                                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                 aria-label="Toggle mobile menu"
                             >
                                  <Menu className={`w-6 h-6 ${
                                       darkMode ? "text-white" : "text-gray-700"
                                  }`} />
                             </button>
                        </div>
                   </div>

                   {/* Mobile Menu */}
                   {mobileMenuOpen && (
                        <div
                             ref={mobileMenuRef}
                             className={`lg:hidden absolute top-full left-0 w-full border-t transition-all duration-300 ${
                                  darkMode ? "bg-black/95 border-gray-800" : "bg-white/95 border-gray-200"
                             }`}
                        >
                             <div className="px-6 py-4 space-y-4">
                                  {/* Mobile Search */}
                                  <div className="relative">
                                       <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                                            darkMode ? "text-gray-400" : "text-gray-500"
                                       }`} />
                                       <input
                                            type="text"
                                            placeholder="Search jobs, skills..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                 darkMode
                                                     ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                                                     : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                                            }`}
                                       />
                                  </div>

                                  {/* Mobile Navigation */}
                                  <div className="space-y-2">
                                       {navigationItems.map((item, idx) => (
                                            <a
                                                 key={idx}
                                                 href={item.href}
                                                 className={`block py-2 px-3 rounded-lg text-sm font-medium transition duration-300 ${
                                                      darkMode
                                                          ? "text-gray-300 hover:text-white hover:bg-gray-800"
                                                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                                                 }`}
                                                 onClick={() => setMobileMenuOpen(false)}
                                            >
                                                 {item.label}
                                            </a>
                                       ))}
                                  </div>

                                  {/* Mobile Auth Buttons */}
                                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                                       <button
                                            onClick={() => { handleLogin(); setMobileMenuOpen(false); }}
                                            className="w-full py-2.5 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium"
                                       >
                                            Login
                                       </button>
                                       <button
                                            onClick={() => { handleSignup(); setMobileMenuOpen(false); }}
                                            className="w-full py-2.5 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 font-medium"
                                       >
                                            Sign Up
                                       </button>
                                  </div>
                             </div>
                        </div>
                   )}
              </nav>
         </header>
     );
};

export default Header;
