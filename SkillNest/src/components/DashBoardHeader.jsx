import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { toast } from "sonner";
import { 
     Sun, 
     Moon, 
     LogOut, 
     User, 
     Menu, 
     Search, 
     Bell, 
     Settings, 
     Bookmark,
     Briefcase,
     TrendingUp,
     Award,
     Zap
} from "lucide-react";

const DashboardHeader = ({ onTabChange = () => {}, user = {} }) => {
     const { darkMode, toggleTheme } = useTheme();
     const [dropdownOpen, setDropdownOpen] = useState(false);
     const [searchQuery, setSearchQuery] = useState("");
     const dropdownRef = useRef(null);
     const navigate = useNavigate();

     useEffect(() => {
          const handleClickOutside = (event) => {
               if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setDropdownOpen(false);
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
          toast.success("Logged out successfully!");
     };

     // desktop tab labels
     const tabs = [
          { key: "browse", label: "Browse Jobs", icon: <Briefcase size={18} /> },
          { key: "applied", label: "Applied Jobs", icon: <TrendingUp size={18} /> },
          { key: "saved", label: "Saved Jobs", icon: <Bookmark size={18} /> },
          { key: "profile", label: "My Profile", icon: <User size={18} /> },
     ];

     return (
         <header
             className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 shadow-lg backdrop-blur-md border-b transition-all duration-300 ${
                 darkMode ? "bg-slate-900/95 text-white border-gray-800" : "bg-white/95 text-gray-900 border-gray-200"
             }`}
         >
              {/* Left: Logo / title and mobile menu toggle */}
              <div className="flex items-center gap-6">
                   <button
                       className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-110"
                       onClick={() => onTabChange("browse")}
                   >
                        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                   </button>
                   <div 
                        className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer transition-all duration-300 hover:scale-105"
                        onClick={() => navigate("/")}
                   >
                        SkillNest
                   </div>
              </div>

              {/* Center: Search Bar */}
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

              {/* Center: desktop nav tabs */}
              <nav className="hidden lg:flex gap-2">
                   {tabs.map((tab) => (
                       <button
                           key={tab.key}
                           onClick={() => onTabChange(tab.key)}
                           className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-105"
                       >
                            {tab.icon}
                            {tab.label}
                       </button>
                   ))}
              </nav>

              {/* Right: theme toggle and user dropdown */}
              <div className="flex items-center gap-4 relative" ref={dropdownRef}>
                   {/* Notifications */}
                   <button
                       className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                           darkMode ? "hover:bg-slate-800" : "hover:bg-gray-100"
                       }`}
                       aria-label="Notifications"
                   >
                        <Bell className={`w-5 h-5 ${
                             darkMode ? "text-gray-300" : "text-gray-600"
                        }`} />
                   </button>

                   {/* Theme Toggle */}
                   <button
                       onClick={toggleTheme}
                       className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                           darkMode ? "hover:bg-slate-800" : "hover:bg-gray-100"
                       }`}
                   >
                        {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
                   </button>

                   {/* User Profile / Dropdown */}
                   <button
                       onClick={() => setDropdownOpen((prev) => !prev)}
                       className="flex items-center gap-3 focus:outline-none hover:bg-gray-100 dark:hover:bg-slate-800 p-2 rounded-xl transition-all duration-300 hover:scale-105"
                   >
                        {user.profilePicture ? (
                            <div className="relative">
                                 <img
                                     src={user.profilePicture}
                                     alt="User Avatar"
                                     className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 dark:border-slate-600 shadow-sm"
                                 />
                                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                            </div>
                        ) : (
                            <div className="relative">
                                 <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                      <User className="w-5 h-5 text-white" />
                                 </div>
                                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                            </div>
                        )}
                        <div className="hidden sm:block text-left">
                             <div className="text-sm font-semibold">
                                  {user.fullName || "Guest"}
                             </div>
                             <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Job Seeker
                             </div>
                        </div>
                   </button>

                   {dropdownOpen && (
                       <div
                           className={`absolute right-0 mt-3 w-72 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 transition-all duration-300 ${
                               darkMode ? "bg-slate-800 text-white" : "bg-white text-gray-900"
                           }`}
                           style={{
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                           }}
                       >
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
                                 <div className="flex items-center gap-3">
                                      {user.profilePicture ? (
                                           <img
                                                src={user.profilePicture}
                                                alt="User Avatar"
                                                className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 dark:border-slate-600"
                                           />
                                      ) : (
                                           <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                <User className="w-6 h-6 text-white" />
                                           </div>
                                      )}
                                      <div>
                                           <p className="font-semibold text-lg">{user.fullName || "Guest"}</p>
                                           <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {user.email || "noemail@domain.com"}
                                           </p>
                                      </div>
                                 </div>
                            </div>
                            <ul className="divide-y divide-gray-200 dark:divide-slate-700">
                                 <li>
                                      <button
                                           onClick={toggleTheme}
                                           className="flex items-center gap-3 w-full px-6 py-3 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300 text-sm"
                                      >
                                           {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} 
                                           Toggle {darkMode ? "Light" : "Dark"} Mode
                                      </button>
                                 </li>
                                 <li>
                                      <button
                                           onClick={() => { onTabChange("profile"); setDropdownOpen(false); }}
                                           className="flex items-center gap-3 w-full px-6 py-3 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300 text-sm"
                                      >
                                           <User className="w-4 h-4" /> 
                                           Complete Profile
                                      </button>
                                 </li>
                                 <li>
                                      <button
                                           onClick={() => { onTabChange("saved"); setDropdownOpen(false); }}
                                           className="flex items-center gap-3 w-full px-6 py-3 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300 text-sm"
                                      >
                                           <Bookmark className="w-4 h-4" /> 
                                           Saved Jobs
                                      </button>
                                 </li>
                                 <li>
                                      <button
                                           onClick={() => { onTabChange("applied"); setDropdownOpen(false); }}
                                           className="flex items-center gap-3 w-full px-6 py-3 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300 text-sm"
                                      >
                                           <TrendingUp className="w-4 h-4" /> 
                                           Applied Jobs
                                      </button>
                                 </li>
                                 <li>
                                      <button
                                           onClick={() => { setDropdownOpen(false); }}
                                           className="flex items-center gap-3 w-full px-6 py-3 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300 text-sm"
                                      >
                                           <Settings className="w-4 h-4" /> 
                                           Settings
                                      </button>
                                 </li>
                                 <li>
                                      <button
                                           onClick={() => { handleLogout(); setDropdownOpen(false); }}
                                           className="flex items-center gap-3 w-full px-6 py-3 text-red-600 hover:bg-red-100 dark:hover:bg-red-800/20 transition-all duration-300 text-sm"
                                      >
                                           <LogOut className="w-4 h-4" /> 
                                           Logout
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
