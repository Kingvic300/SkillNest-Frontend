import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, LogOut, User, Menu } from "lucide-react";

const DashboardHeader = ({ onTabChange = () => {}, user = {} }) => {
     const { darkMode, toggleTheme } = useTheme();
     const [dropdownOpen, setDropdownOpen] = useState(false);
     const dropdownRef = useRef(null);

     useEffect(() => {
          const handleClickOutside = (event) => {
               if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setDropdownOpen(false);
               }
          };
          document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside);
     }, []);

     // desktop tab labels
     const tabs = [
          { key: "browse", label: "Browse Jobs" },
          { key: "applied", label: "Applied Jobs" },
          { key: "saved", label: "Saved Jobs" },
          { key: "profile", label: "My Profile" },
     ];

     return (
         <header
             className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 shadow-md transition-colors duration-300 ${
                 darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-900"
             }`}
         >
              {/* Left: Logo / title and mobile menu toggle */}
              <div className="flex items-center gap-4">
                   <button
                       className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                       onClick={() => onTabChange("browse")}
                   >
                        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                   </button>
                   <h1 className="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
                        SkillNest
                   </h1>
              </div>

              {/* Center: desktop nav tabs */}
              <nav className="hidden md:flex gap-4">
                   {tabs.map((tab) => (
                       <button
                           key={tab.key}
                           onClick={() => onTabChange(tab.key)}
                           className="px-3 py-1 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                       >
                            {tab.label}
                       </button>
                   ))}
              </nav>

              {/* Right: theme toggle and user dropdown */}
              <div className="flex items-center gap-4 relative" ref={dropdownRef}>
                   {/* Theme Toggle */}
                   <button
                       onClick={toggleTheme}
                       className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                   >
                        {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
                   </button>

                   {/* User Profile / Dropdown */}
                   <button
                       onClick={() => setDropdownOpen((prev) => !prev)}
                       className="flex items-center gap-2 focus:outline-none hover:bg-gray-100 dark:hover:bg-slate-800 p-2 rounded-lg transition"
                   >
                        {user.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-slate-600"
                            />
                        ) : (
                            <div className="w-10 h-10 bg-gray-300 rounded-full" />
                        )}
                        <span className="hidden sm:inline text-sm font-medium">
            {user.fullName || "Guest"}
          </span>
                   </button>

                   {dropdownOpen && (
                       <div
                           className={`absolute right-0 mt-2 w-56 rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5 transition-all ${
                               darkMode ? "bg-slate-800 text-white" : "bg-white text-gray-900"
                           }`}
                       >
                            <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-700">
                                 <p className="font-semibold text-lg">{user.fullName || "Guest"}</p>
                                 <p className="text-sm text-gray-500 dark:text-gray-400">
                                      {user.email || "noemail@domain.com"}
                                 </p>
                            </div>
                            <ul className="divide-y divide-gray-200 dark:divide-slate-700">
                                 <li>
                                      <button
                                          onClick={toggleTheme}
                                          className="flex items-center gap-2 w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-700 transition text-sm"
                                      >
                                           {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} Toggle {darkMode ? "Light" : "Dark"}
                                      </button>
                                 </li>
                                 <li>
                                      <button
                                          onClick={() => { onTabChange("profile"); setDropdownOpen(false); }}
                                          className="flex items-center gap-2 w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-700 transition text-sm"
                                      >
                                           <User className="w-4 h-4" /> Complete Profile
                                      </button>
                                 </li>
                                 <li>
                                      <button
                                          onClick={() => { alert("Logging out..."); setDropdownOpen(false); }}
                                          className="flex items-center gap-2 w-full px-4 py-3 text-red-600 hover:bg-red-100 dark:hover:bg-red-800 transition text-sm"
                                      >
                                           <LogOut className="w-4 h-4" /> Logout
                                      </button>
                                 </li>
                            </ul>
                       </div>
                   )}
              </div>
         </header>
     );
};

export default DashboardHeader;
