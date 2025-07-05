import React from "react";
import { Sun, Moon, Menu, User } from "lucide-react";
import { ProfilePeek } from "./ProfilePeek";

const Header = ({ darkMode, toggleTheme, handleLogin, handleSignup }) => {
     return (
         <header className="fixed top-0 left-0 w-full z-50">
              <nav
                  className={`relative px-6 py-4 shadow-md flex items-center justify-between transition-all duration-700
                      ${darkMode
                      ? "bg-black text-white bg-[url('/dark-bg.jpg')]"
                      : "bg-white text-black bg-[url('/light-bg.jpg')]"}
                      bg-cover bg-center`}
              >
                   <div className="flex justify-between items-center w-full">
                        {/* Logo */}
                        <div
                            className={`text-2xl font-extrabold tracking-tight ${
                                darkMode ? "text-white" : "text-blue-600"
                            }`}
                        >
                             SkillNest
                        </div>

                        {/* Navigation links */}
                        <div className="hidden md:flex space-x-6">
                             {["About Us", "What We Offer", "Contact Us"].map((label, idx) => (
                                 <a
                                     key={idx}
                                     href={`#${label.toLowerCase().replace(/\s/g, "-")}`}
                                     className={`text-sm font-medium transition duration-200 ${
                                         darkMode
                                             ? "text-gray-300 hover:text-white"
                                             : "text-gray-700 hover:text-blue-600"
                                     }`}
                                 >
                                      {label}
                                 </a>
                             ))}
                        </div>

                        {/* Right side: theme toggle and user menu */}
                        <div className="flex items-center gap-4">
                             {/* Theme toggle */}
                             <button
                                 onClick={toggleTheme}
                                 aria-label="Toggle Theme"
                                 className="p-2 rounded-lg transition hover:bg-gray-200 dark:hover:bg-gray-700"
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
                                          className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                                          aria-label="User Menu"
                                      >
                                           <User
                                               className={`w-5 h-5 ${
                                                   darkMode
                                                       ? "text-white"
                                                       : "text-gray-700"
                                               }`}
                                           />
                                      </div>
                                 }
                                 content={
                                      <div className="text-sm space-y-3">
                                           <div className="text-center font-semibold text-black dark:text-white">
                                                Welcome to SkillNest
                                           </div>
                                           <button
                                               onClick={handleLogin}
                                               className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                                           >
                                                Login
                                           </button>
                                           <button
                                               onClick={handleSignup}
                                               className="w-full py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 transition"
                                           >
                                                Signup
                                           </button>
                                      </div>
                                 }
                             />

                             {/* Mobile Menu Icon */}
                             <div className="md:hidden cursor-pointer">
                                  <Menu
                                      className={`w-6 h-6 ${
                                          darkMode ? "text-white" : "text-gray-700"
                                      }`}
                                  />
                             </div>
                        </div>
                   </div>
              </nav>
         </header>
     );
};

export default Header;
