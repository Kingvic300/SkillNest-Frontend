import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import { toast } from "sonner";
import JobDetails from "../components/JobDetails";
import {
     Briefcase,
     UserCircle,
     FilePlus,
     Trash2,
     CheckCircle,
     LogOut,
     Settings,
     Bell,
     Search,
     Building2,
     Mail,
     Phone,
     MapPin,
     Edit3,
     Save,
     Plus,
     Filter,
     Calendar,
     DollarSign,
     Users,
     TrendingUp,
     Award,
     Shield,
     Zap,
     Eye
} from "lucide-react";

const EmployerDashboard = ({ user }) => {
     const { darkMode } = useTheme();
     const navigate = useNavigate();
     const [tab, setTab] = useState("profile");
     const [searchQuery, setSearchQuery] = useState("");

     const [profile, setProfile] = useState({
          companyName: "",
          companyEmail: "",
          companyPhoneNumber: "",
          companyLocation: "",
          companyDescription: "",
          profilePicture: null,
          profilePictureUrl: "",
     });

     const [jobs, setJobs] = useState([]);
     const [newJob, setNewJob] = useState({
          title: "",
          description: "",
          location: "",
          salary: "",
          jobType: "Full-time",
          industry: "Technology",
          companySize: "50-200 employees",
          founded: "2020",
          requirements: [],
          benefits: [],
          contactEmail: "",
          contactPhone: "",
          website: ""
     });

     const [selectedJob, setSelectedJob] = useState(null);
     const [showJobDetails, setShowJobDetails] = useState(false);

     const tabs = [
          { key: "profile", label: "My Profile", icon: <UserCircle size={18} /> },
          { key: "posted", label: "Posted Jobs", icon: <Briefcase size={18} /> },
          { key: "create", label: "Post a Job", icon: <FilePlus size={18} /> },
     ];

     useEffect(() => {
          if (!user?.id) return;

          axios
              .get(`http://localhost:8080/employer/${user.id}`)
              .then((res) => {
                   const data = res.data;
                   setProfile((prev) => ({
                        ...prev,
                        companyName: data.companyName,
                        companyEmail: data.companyEmail,
                        companyPhoneNumber: data.companyPhoneNumber,
                        companyLocation: data.companyLocation,
                        companyDescription: data.companyDescription,
                        profilePictureUrl: data.profilePictureUrl,
                   }));
              })
              .catch(console.error);

          axios
              .get(`http://localhost:8080/employer/${user.id}/jobs`)
              .then((res) => setJobs(res.data || []))
              .catch(console.error);
     }, [user?.id]);

     const handleProfileSave = async () => {
          try {
               const form = new FormData();
               form.append("userId", user.id);
               form.append("companyName", profile.companyName);
               form.append("companyEmail", profile.companyEmail);
               form.append("companyPhoneNumber", profile.companyPhoneNumber);
               form.append("companyLocation", profile.companyLocation);
               form.append("companyDescription", profile.companyDescription);
               if (profile.profilePicture) {
                    form.append("profilePictureUrl", profile.profilePicture);
               }

               const res = await axios.post(
                   "http://localhost:8080/employer/complete-profile",
                   form,
                   { headers: { "Content-Type": "multipart/form-data" } }
               );

               setProfile((prev) => ({
                    ...prev,
                    profilePictureUrl: res.data.profilePictureUrl,
               }));
               toast.success("Profile saved successfully!");
          } catch (e) {
               console.error(e);
               toast.error("Failed to save profile.");
          }
     };

     const handlePostJob = async () => {
          try {
               const res = await axios.post("http://localhost:8080/employer/post-job", {
                    userId: user.id,
                    ...newJob,
               });
               setJobs((prev) => [res.data, ...prev]);
               toast.success("Job posted successfully!");
               setTab("posted");
               setNewJob({ 
                    title: "", 
                    description: "", 
                    location: "", 
                    salary: "",
                    jobType: "Full-time",
                    industry: "Technology",
                    companySize: "50-200 employees",
                    founded: "2020",
                    requirements: [],
                    benefits: [],
                    contactEmail: "",
                    contactPhone: "",
                    website: ""
               });
          } catch {
               toast.error("Failed to post job.");
          }
     };

     const handleViewJobDetails = (job) => {
          setSelectedJob(job);
          setShowJobDetails(true);
     };

     const handleCloseJobDetails = () => {
          setShowJobDetails(false);
          setSelectedJob(null);
     };

     const handleDeleteJob = async (id) => {
          try {
               await axios.delete(`http://localhost:8080/employer/delete-job/${id}`);
               setJobs((prev) => prev.filter((j) => j.id !== id));
               toast.success("Job deleted successfully!");
          } catch {
               toast.error("Failed to delete job.");
          }
     };

     const handleVerifyCompletion = async (id) => {
          try {
               await axios.patch("http://localhost:8080/employer/verify-completion", {
                    jobId: id,
               });
               toast.success("Job marked as complete!");
          } catch {
               toast.error("Verification failed.");
          }
     };

     const handleLogout = () => {
          // Clear any stored user data
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          // Navigate to home page
          navigate("/");
          toast.success("Logged out successfully!");
     };

     const filteredJobs = jobs.filter(job =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
     );

     return (
         <div
             className={`min-h-screen font-inter transition-colors duration-300 ${
                 darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
             }`}
         >
              {/* Enhanced Header */}
              <header
                  className={`fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-8 border-b z-10 shadow-lg backdrop-blur-md ${
                      darkMode ? "bg-gray-800/95 border-gray-700" : "bg-white/95 border-gray-200"
                  }`}
              >
                   <div className="flex items-center gap-6">
                        <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                             Employer Dashboard
                        </h1>
                        <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                             <TrendingUp className="w-4 h-4" />
                             <span>Manage your company and job postings</span>
                        </div>
                   </div>
                   
                   <div className="flex items-center gap-4">
                        {/* Search Bar */}
                        <div className="hidden md:flex items-center gap-2">
                             <div className="relative">
                                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                                       darkMode ? "text-gray-400" : "text-gray-500"
                                  }`} />
                                  <input
                                       type="text"
                                       placeholder="Search jobs..."
                                       value={searchQuery}
                                       onChange={(e) => setSearchQuery(e.target.value)}
                                       className={`pl-10 pr-4 py-2 rounded-full text-sm border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                           darkMode
                                               ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                               : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                                       }`}
                                  />
                             </div>
                        </div>

                        {/* Notifications */}
                        <button
                            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                            aria-label="Notifications"
                        >
                             <Bell className={`w-5 h-5 ${
                                 darkMode ? "text-gray-300" : "text-gray-600"
                             }`} />
                        </button>

                        {/* Company Profile */}
                        <div className="flex items-center gap-3">
                             <div className="relative group">
                                  <img
                                      src={profile.profilePictureUrl || "/default-company.png"}
                                      alt="Company"
                                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 shadow-sm transition-all duration-300 group-hover:scale-110"
                                  />
                                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                             </div>
                             <div className="hidden sm:block">
                                  <div className="font-semibold text-sm truncate max-w-[160px]">
                                       {profile.companyName || "Company Name"}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                       Employer
                                  </div>
                             </div>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                                darkMode ? "hover:bg-red-900/50 text-red-400" : "hover:bg-red-100 text-red-600"
                            }`}
                            aria-label="Logout"
                        >
                             <LogOut className="w-5 h-5" />
                        </button>
                   </div>
              </header>

              <div className="pt-16 flex">
                   {/* Enhanced Sidebar */}
                   <aside
                       className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] border-r shadow-lg transition-colors ${
                           darkMode ? "bg-gray-850 border-gray-700" : "bg-white border-gray-200"
                       }`}
                   >
                        <div className="p-6 space-y-3">
                             {tabs.map((t) => (
                                 <button
                                     key={t.key}
                                     onClick={() => setTab(t.key)}
                                     className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                                         tab === t.key
                                             ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                                             : darkMode
                                                 ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                                                 : "text-gray-800 hover:bg-gray-100 hover:text-blue-600"
                                     }`}
                                 >
                                      {t.icon}
                                      <span>{t.label}</span>
                                 </button>
                             ))}
                        </div>

                        {/* Quick Stats */}
                        <div className={`px-6 py-4 border-t ${
                            darkMode ? "border-gray-700" : "border-gray-200"
                        }`}>
                             <h3 className="text-sm font-semibold mb-3 text-gray-500 dark:text-gray-400">
                                  Quick Stats
                             </h3>
                             <div className="space-y-2">
                                  <div className="flex items-center justify-between text-sm">
                                       <span className="text-gray-600 dark:text-gray-400">Active Jobs</span>
                                       <span className="font-semibold text-blue-600">{jobs.length}</span>
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                       <span className="text-gray-600 dark:text-gray-400">Total Views</span>
                                       <span className="font-semibold text-green-600">1,234</span>
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                       <span className="text-gray-600 dark:text-gray-400">Applications</span>
                                       <span className="font-semibold text-purple-600">56</span>
                                  </div>
                             </div>
                        </div>
                   </aside>

                   {/* Main Content */}
                   <main className="ml-64 flex-1 p-8 space-y-8">
                        {tab === "profile" && (
                            <div className="max-w-4xl mx-auto">
                                 <div
                                     className={`p-8 rounded-2xl shadow-xl border ${
                                         darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                                     }`}
                                 >
                                      <div className="flex items-center gap-3 mb-8">
                                           <Building2 className="w-6 h-6 text-blue-600" />
                                           <h2 className="text-2xl font-bold">Company Profile</h2>
                                      </div>
                                      
                                      <div className="flex flex-col lg:flex-row gap-8 mb-8">
                                           <div className="flex flex-col items-center gap-4">
                                                <div className="relative group">
                                                     <img
                                                         src={
                                                             profile.profilePictureUrl ||
                                                             "/default-company.png"
                                                         }
                                                         alt="Company Logo"
                                                         className="w-32 h-32 rounded-2xl object-cover border-4 border-gray-200 dark:border-gray-600 shadow-lg transition-all duration-300 group-hover:scale-105"
                                                     />
                                                     <div className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center text-white text-sm font-medium cursor-pointer">
                                                          <Edit3 className="w-5 h-5 mr-2" />
                                                          Change Logo
                                                     </div>
                                                     <input
                                                         type="file"
                                                         className="absolute inset-0 opacity-0 cursor-pointer"
                                                         onChange={(e) =>
                                                             setProfile((prev) => ({
                                                                  ...prev,
                                                                  profilePicture: e.target.files[0],
                                                             }))
                                                         }
                                                     />
                                                </div>
                                           </div>

                                           <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {[
                                                     { key: "companyName", icon: <Building2 className="w-4 h-4" />, label: "Company Name" },
                                                     { key: "companyEmail", icon: <Mail className="w-4 h-4" />, label: "Email" },
                                                     { key: "companyPhoneNumber", icon: <Phone className="w-4 h-4" />, label: "Phone" },
                                                     { key: "companyLocation", icon: <MapPin className="w-4 h-4" />, label: "Location" },
                                                ].map((field) => (
                                                    <div key={field.key} className="space-y-2">
                                                         <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                              {field.icon}
                                                              {field.label}
                                                         </label>
                                                         <input
                                                             value={profile[field.key]}
                                                             onChange={(e) =>
                                                                 setProfile({ ...profile, [field.key]: e.target.value })
                                                             }
                                                             className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                                                                 darkMode
                                                                     ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                                                     : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                                                             }`}
                                                         />
                                                    </div>
                                                ))}
                                           </div>
                                      </div>
                                      
                                      <div className="mb-6">
                                           <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                <Edit3 className="w-4 h-4" />
                                                Company Description
                                           </label>
                                           <textarea
                                               rows={4}
                                               value={profile.companyDescription}
                                               onChange={(e) =>
                                                   setProfile({
                                                        ...profile,
                                                        companyDescription: e.target.value,
                                                   })
                                               }
                                               placeholder="Tell us about your company..."
                                               className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                                                   darkMode
                                                       ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                                       : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                                               }`}
                                           />
                                      </div>
                                      
                                      <button
                                          onClick={handleProfileSave}
                                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                                      >
                                           <Save className="w-4 h-4" />
                                           Save Profile
                                      </button>
                                 </div>
                            </div>
                        )}

                        {tab === "posted" && (
                            <div>
                                 <div className="flex items-center justify-between mb-8">
                                      <div className="flex items-center gap-3">
                                           <Briefcase className="w-6 h-6 text-blue-600" />
                                           <h2 className="text-2xl font-bold">Posted Jobs</h2>
                                           <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                                                {jobs.length} jobs
                                           </span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                           <Filter className={`w-5 h-5 ${
                                               darkMode ? "text-gray-400" : "text-gray-600"
                                           }`} />
                                           <select className={`px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                               darkMode
                                                   ? "bg-gray-700 border-gray-600 text-white"
                                                   : "bg-white border-gray-300 text-gray-900"
                                           }`}>
                                                <option>All Jobs</option>
                                                <option>Active</option>
                                                <option>Completed</option>
                                           </select>
                                      </div>
                                 </div>
                                 
                                 {filteredJobs.length === 0 ? (
                                     <div
                                         className={`p-12 text-center rounded-2xl border-2 border-dashed ${
                                             darkMode
                                                 ? "bg-gray-800 border-gray-700 text-gray-400"
                                                 : "bg-white border-gray-300 text-gray-500"
                                         }`}
                                     >
                                          <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                          <p className="text-lg font-medium mb-2">No jobs posted yet</p>
                                          <p className="text-sm mb-6">Start by creating your first job posting</p>
                                          <button
                                              onClick={() => setTab("create")}
                                              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 mx-auto"
                                          >
                                               <Plus className="w-4 h-4" />
                                               Post Your First Job
                                          </button>
                                     </div>
                                 ) : (
                                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                          {filteredJobs.map((job) => (
                                              <div
                                                  key={job.id}
                                                  className={`p-6 rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                                                      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                                                  }`}
                                              >
                                                   <div className="flex items-start justify-between mb-4">
                                                        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                                             {job.title}
                                                        </h3>
                                                        <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-medium">
                                                             Active
                                                        </div>
                                                   </div>
                                                   
                                                   <div className="flex items-center gap-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
                                                        <div className="flex items-center gap-1">
                                                             <MapPin className="w-4 h-4" />
                                                             <span>{job.location}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                             <DollarSign className="w-4 h-4" />
                                                             <span>{job.salary}</span>
                                                        </div>
                                                   </div>
                                                   
                                                   <p className="text-sm mb-6 text-gray-600 dark:text-gray-300 line-clamp-3">
                                                        {job.description}
                                                   </p>
                                                   
                                                   <div className="flex gap-3">
                                                        <button
                                                            onClick={() => handleViewJobDetails(job)}
                                                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                                                        >
                                                             <Eye className="w-4 h-4" />
                                                             View Details
                                                        </button>
                                                        <button
                                                            onClick={() => handleVerifyCompletion(job.id)}
                                                            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                                                        >
                                                             <CheckCircle className="w-4 h-4" />
                                                             Verify
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteJob(job.id)}
                                                            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                                                        >
                                                             <Trash2 className="w-4 h-4" />
                                                             Delete
                                                        </button>
                                                   </div>
                                              </div>
                                          ))}
                                     </div>
                                 )}
                            </div>
                        )}

                        {tab === "create" && (
                            <div className="max-w-3xl mx-auto">
                                 <div
                                     className={`p-8 rounded-2xl shadow-xl border ${
                                         darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                                     }`}
                                 >
                                      <div className="flex items-center gap-3 mb-8">
                                           <FilePlus className="w-6 h-6 text-blue-600" />
                                           <h2 className="text-2xl font-bold">Create a New Job</h2>
                                      </div>
                                      
                                      <div className="space-y-6">
                                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {[
                                                     { key: "title", icon: <Briefcase className="w-4 h-4" />, label: "Job Title" },
                                                     { key: "location", icon: <MapPin className="w-4 h-4" />, label: "Location" },
                                                     { key: "salary", icon: <DollarSign className="w-4 h-4" />, label: "Salary" },
                                                ].map((field) => (
                                                    <div key={field.key} className="space-y-2">
                                                         <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                              {field.icon}
                                                              {field.label}
                                                         </label>
                                                         <input
                                                             value={newJob[field.key]}
                                                             onChange={(e) =>
                                                                 setNewJob({ ...newJob, [field.key]: e.target.value })
                                                             }
                                                             placeholder={`Enter ${field.label.toLowerCase()}`}
                                                             className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                                                                 darkMode
                                                                     ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                                                     : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                                                             }`}
                                                         />
                                                    </div>
                                                ))}
                                           </div>
                                           
                                           <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                     <Edit3 className="w-4 h-4" />
                                                     Job Description
                                                </label>
                                                <textarea
                                                    rows={6}
                                                    value={newJob.description}
                                                    onChange={(e) =>
                                                        setNewJob({ ...newJob, description: e.target.value })
                                                    }
                                                    placeholder="Describe the job responsibilities, requirements, and benefits..."
                                                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                                                        darkMode
                                                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                                            : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                                                    }`}
                                                />
                                           </div>
                                           
                                           <button
                                               onClick={handlePostJob}
                                               className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                                           >
                                                <Zap className="w-4 h-4" />
                                                Post Job
                                           </button>
                                      </div>
                                 </div>
                            </div>
                        )}
                   </main>
              </div>

              {/* Job Details Modal */}
              {showJobDetails && selectedJob && (
                   <JobDetails
                        job={selectedJob}
                        onClose={handleCloseJobDetails}
                        darkMode={darkMode}
                        onApply={() => {
                             toast.success("Application submitted!");
                             handleCloseJobDetails();
                        }}
                        onSave={() => {
                             toast.success("Job saved!");
                        }}
                   />
              )}
         </div>
     );
};

export default EmployerDashboard;