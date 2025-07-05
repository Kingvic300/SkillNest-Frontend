import React, { useState, useEffect } from "react";
import {
     Badge,
     Button,
     Card,
     CardContent,
     CardHeader,
     CardTitle,
     Input,
     Textarea,
} from "../components/ui/Ui.jsx";
import {
     Search,
     MapPin,
     DollarSign,
     User,
     Heart,
     Clock,
     CheckCircle,
     Eye,
} from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";
import JobDetails from "../components/JobDetails";
import { toast } from "sonner";

const JobSeekerDashboard = ({ user }) => {
     // Improved dark mode state management
     const [darkMode, setDarkMode] = useState(() => {
          // Check localStorage first, then system preference
          const localStorageDark = localStorage.getItem("darkMode");
          if (localStorageDark !== null) {
               return localStorageDark === "true";
          }
          return window.matchMedia("(prefers-color-scheme: dark)").matches;
     });

     // Apply dark mode class to document root
     useEffect(() => {
          localStorage.setItem("darkMode", darkMode);
          if (darkMode) {
               document.documentElement.classList.add("dark");
          } else {
               document.documentElement.classList.remove("dark");
          }
     }, [darkMode]);

     const [activeTab, setActiveTab] = useState("browse");
     const [searchTerm, setSearchTerm] = useState("");

     const [availableJobs] = useState([
          {
               id: 1,
               title: "Senior Frontend Developer",
               companyName: "TechCorp Inc",
               location: "San Francisco, CA",
               salary: "$100,000 - $130,000",
               description: "We're looking for a skilled frontend developer to join our team.",
               type: "Full-time",
               posted: "2 days ago",
          },
          {
               id: 2,
               title: "Product Manager",
               companyName: "StartupXYZ",
               location: "Remote",
               salary: "$90,000 - $120,000",
               description: "Lead product development and strategy for our growing platform.",
               type: "Full-time",
               posted: "1 week ago",
          },
     ]);

     const [appliedJobs, setAppliedJobs] = useState([]);
     const [savedJobs, setSavedJobs] = useState([]);
     const [selectedJob, setSelectedJob] = useState(null);
     const [showJobDetails, setShowJobDetails] = useState(false);
     const [profile, setProfile] = useState({
          fullName: user?.fullName || "John Doe",
          email: user?.email || "john.doe@email.com",
          phone: "+1 (555) 987-6543",
          resumeLink: "https://example.com/resume.pdf",
          skills: "React, JavaScript, Node.js",
          experience: "3+ years in software development",
          profilePicture:
              user?.profilePicture || "https://ui-avatars.com/api/?name=John+Doe",
     });

     const handleApply = (job) => {
          if (appliedJobs.some((j) => j.id === job.id)) {
               toast.error("Already applied to this job.");
               return;
          }
          setAppliedJobs((prev) => [...prev, { ...job, appliedAt: new Date().toISOString() }]);
          toast.success(`Applied to ${job.title}`);
     };

     const handleSaveJob = (job) => {
          if (savedJobs.some((j) => j.id === job.id)) {
               setSavedJobs((prev) => prev.filter((j) => j.id !== job.id));
               toast.success("Removed from saved jobs");
          } else {
               setSavedJobs((prev) => [...prev, job]);
               toast.success("Job saved!");
          }
     };

     const handleProfileUpdate = (field, value) => {
          setProfile((prev) => ({ ...prev, [field]: value }));
     };

     const handleProfilePictureUpload = (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onloadend = () => {
               setProfile((prev) => ({ ...prev, profilePicture: reader.result }));
          };
          reader.readAsDataURL(file);
     };

     const handleProfileSave = () => toast.success("Profile updated successfully!");
     const toggleDarkMode = () => setDarkMode((prev) => !prev);

     const handleViewJobDetails = (job) => {
          setSelectedJob(job);
          setShowJobDetails(true);
     };

     const handleCloseJobDetails = () => {
          setShowJobDetails(false);
          setSelectedJob(null);
     };

     const filteredJobs = availableJobs.filter((job) =>
         [job.title, job.companyName, job.location].some((text) =>
             text.toLowerCase().includes(searchTerm.toLowerCase())
         )
     );

     const tabs = [
          { key: "browse", label: "Browse Jobs", icon: <Search className="w-4 h-4" /> },
          { key: "applied", label: "Applied Jobs", icon: <CheckCircle className="w-4 h-4" /> },
          { key: "saved", label: "Saved Jobs", icon: <Heart className="w-4 h-4" /> },
          { key: "profile", label: "My Profile", icon: <User className="w-4 h-4" /> },
     ];

     // Consolidated dark mode classes
     const bgClass = darkMode ? "dark:bg-slate-900 bg-gray-50" : "bg-white";
     const textClass = darkMode ? "dark:text-white text-gray-900" : "text-gray-900";
     const borderClass = darkMode ? "dark:border-slate-700 border-gray-200" : "border-gray-200";
     const cardClass = darkMode ? "dark:bg-slate-800 bg-white" : "bg-white";

     return (
         <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark:bg-slate-900" : "bg-gray-50"}`}>
              <DashboardHeader
                  user={user}
                  onTabChange={setActiveTab}
                  onDarkModeToggle={toggleDarkMode}
                  darkMode={darkMode}
              />

              <div className="pt-20 flex">
                   {/* Sidebar */}
                   <aside
                       className={`fixed top-20 left-0 w-72 h-full border-r backdrop-blur-sm shadow-lg transition-colors duration-300 px-0
            ${darkMode ? "dark:bg-slate-800/90 dark:border-slate-700" : "bg-white/80 border-gray-200"}`}
                   >
                        <div className="p-6 space-y-6">
                             <div className="flex items-center gap-3">
                                  <img
                                      src={profile.profilePicture}
                                      alt="Profile"
                                      className="w-10 h-10 rounded-full border object-cover"
                                  />
                                  <div>
                                       <p className={`font-semibold ${darkMode ? "dark:text-white" : "text-gray-800"}`}>
                                            {profile.fullName}
                                       </p>
                                       <p className={`text-sm ${darkMode ? "dark:text-gray-400" : "text-gray-500"}`}>Job Seeker</p>
                                  </div>
                             </div>

                             <div className="space-y-2">
                                  {tabs.map((tab) => (
                                      <button
                                          key={tab.key}
                                          onClick={() => setActiveTab(tab.key)}
                                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                                              activeTab === tab.key
                                                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                                                  : darkMode
                                                      ? "dark:text-gray-300 dark:hover:bg-slate-700"
                                                      : "text-gray-600 hover:bg-gray-100"
                                          }`}
                                      >
                                           {tab.icon}
                                           {tab.label}
                                           {tab.key === "applied" && appliedJobs.length > 0 && (
                                               <Badge className={`ml-auto ${darkMode ? "dark:bg-slate-700 dark:text-blue-400" : "bg-white text-blue-600"} text-xs`}>
                                                    {appliedJobs.length}
                                               </Badge>
                                           )}
                                           {tab.key === "saved" && savedJobs.length > 0 && (
                                               <Badge className={`ml-auto ${darkMode ? "dark:bg-slate-700 dark:text-blue-400" : "bg-white text-blue-600"} text-xs`}>
                                                    {savedJobs.length}
                                               </Badge>
                                           )}
                                      </button>
                                  ))}

                                  {/* Dark Mode Toggle */}
                                  <button
                                      onClick={toggleDarkMode}
                                      className={`w-full mt-4 flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                                          darkMode
                                              ? "dark:text-gray-300 dark:hover:bg-slate-700"
                                              : "text-gray-600 hover:bg-gray-100"
                                      }`}
                                  >
                                       {darkMode ? (
                                           <>
                                                <span>☀️</span> Light Mode
                                           </>
                                       ) : (
                                           <>
                                                <span>🌙</span> Dark Mode
                                           </>
                                       )}
                                  </button>
                             </div>
                        </div>
                   </aside>

                   {/* Main Content */}
                   <main className={`ml-72 flex-1 p-8 space-y-6 ${darkMode ? "dark:bg-transparent" : ""}`}>
                        {/* Browse Jobs */}
                        {activeTab === "browse" && (
                            <section>
                                 <h2 className={`text-3xl font-bold mb-6 ${darkMode ? "dark:text-white" : "text-gray-900"}`}>
                                      Browse Jobs
                                 </h2>
                                 <Input
                                     value={searchTerm}
                                     onChange={(e) => setSearchTerm(e.target.value)}
                                     placeholder="Search by title, company, or location"
                                     className={`mb-6 max-w-lg ${borderClass} ${textClass} ${
                                         darkMode ? "dark:bg-slate-700 dark:placeholder-gray-500" : "bg-white placeholder-gray-400"
                                     }`}
                                 />
                                 <div className="grid md:grid-cols-2 gap-6">
                                      {filteredJobs.length === 0 ? (
                                          <p className={darkMode ? "dark:text-gray-400" : "text-gray-500"}>No jobs found.</p>
                                      ) : (
                                          filteredJobs.map((job) => (
                                              <Card
                                                  key={job.id}
                                                  className={`shadow-md ${borderClass} ${cardClass}`}
                                              >
                                                   <CardHeader>
                                                        <CardTitle className={`text-xl flex justify-between ${textClass}`}>
                                                             {job.title}
                                                             <Badge className={`${darkMode ? "dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800" : "bg-blue-100 text-blue-700 border-blue-200"}`}>
                                                                  {job.type}
                                                             </Badge>
                                                        </CardTitle>
                                                        <p className={`text-sm ${darkMode ? "dark:text-gray-400" : "text-gray-500"}`}>{job.companyName}</p>
                                                   </CardHeader>
                                                   <CardContent className="space-y-4">
                                                        <p className={`text-sm ${darkMode ? "dark:text-gray-300" : "text-gray-700"}`}>{job.description}</p>
                                                        <div className={`flex gap-4 text-sm ${darkMode ? "dark:text-gray-400" : "text-gray-500"}`}>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                               {job.location}
                          </span>
                                                             <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                                                                  {job.salary}
                          </span>
                                                             <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                                                                  {job.posted}
                          </span>
                                                        </div>
                                                        <div className="flex gap-2">
                                                             <Button
                                                                 onClick={() => handleViewJobDetails(job)}
                                                                 variant="outline"
                                                                 className={`flex-1 ${
                                                                     darkMode
                                                                         ? "dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700"
                                                                         : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                                                 }`}
                                                             >
                                                                  <Eye className="w-4 h-4 mr-2" />
                                                                  View Details
                                                             </Button>
                                                             <Button
                                                                 onClick={() => handleApply(job)}
                                                                 disabled={appliedJobs.some((j) => j.id === job.id)}
                                                                 className={`flex-1 text-white ${
                                                                     darkMode
                                                                         ? "dark:bg-blue-600 dark:hover:bg-blue-700"
                                                                         : "bg-blue-500 hover:bg-blue-600"
                                                                 }`}
                                                             >
                                                                  {appliedJobs.some((j) => j.id === job.id)
                                                                      ? "Applied"
                                                                      : "Apply"}
                                                             </Button>
                                                             <Button
                                                                 onClick={() => handleSaveJob(job)}
                                                                 variant="outline"
                                                                 className={`flex-1 ${
                                                                     darkMode
                                                                         ? "dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700"
                                                                         : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                                                 }`}
                                                             >
                                                                  {savedJobs.some((j) => j.id === job.id)
                                                                      ? "Unsave"
                                                                      : "Save"}
                                                             </Button>
                                                        </div>
                                                   </CardContent>
                                              </Card>
                                          ))
                                      )}
                                 </div>
                            </section>
                        )}

                        {/* Applied Jobs */}
                        {activeTab === "applied" && (
                            <section>
                                 <h2 className={`text-3xl font-bold mb-6 ${darkMode ? "dark:text-white" : "text-gray-900"}`}>
                                      Applied Jobs
                                 </h2>
                                 <div className="grid md:grid-cols-2 gap-6">
                                      {appliedJobs.length === 0 ? (
                                          <p className={darkMode ? "dark:text-gray-400" : "text-gray-500"}>
                                               You haven't applied to any jobs yet.
                                          </p>
                                      ) : (
                                          appliedJobs.map((job) => (
                                              <Card
                                                  key={job.id}
                                                  className={`shadow-md ${borderClass} ${cardClass}`}
                                              >
                                                   <CardHeader>
                                                        <CardTitle className={`text-xl flex justify-between ${textClass}`}>
                                                             {job.title}
                                                             <Badge className={`${darkMode ? "dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800" : "bg-blue-100 text-blue-700 border-blue-200"}`}>
                                                                  {job.type}
                                                             </Badge>
                                                        </CardTitle>
                                                        <p className={`text-sm ${darkMode ? "dark:text-gray-400" : "text-gray-500"}`}>{job.companyName}</p>
                                                   </CardHeader>
                                                   <CardContent className="space-y-4">
                                                        <p className={`text-sm ${darkMode ? "dark:text-gray-300" : "text-gray-700"}`}>{job.description}</p>
                                                        <div className={`flex gap-4 text-sm ${darkMode ? "dark:text-gray-400" : "text-gray-500"}`}>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                               {job.location}
                          </span>
                                                             <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                                                                  {job.salary}
                          </span>
                                                             <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Applied on {new Date(job.appliedAt).toLocaleDateString()}
                          </span>
                                                        </div>
                                                   </CardContent>
                                              </Card>
                                          ))
                                      )}
                                 </div>
                            </section>
                        )}

                        {/* Saved Jobs */}
                        {activeTab === "saved" && (
                            <section>
                                 <h2 className={`text-3xl font-bold mb-6 ${darkMode ? "dark:text-white" : "text-gray-900"}`}>
                                      Saved Jobs
                                 </h2>
                                 <div className="grid md:grid-cols-2 gap-6">
                                      {savedJobs.length === 0 ? (
                                          <p className={darkMode ? "dark:text-gray-400" : "text-gray-500"}>
                                               You haven't saved any jobs yet.
                                          </p>
                                      ) : (
                                          savedJobs.map((job) => (
                                              <Card
                                                  key={job.id}
                                                  className={`shadow-md ${borderClass} ${cardClass}`}
                                              >
                                                   <CardHeader>
                                                        <CardTitle className={`text-xl flex justify-between ${textClass}`}>
                                                             {job.title}
                                                             <Badge className={`${darkMode ? "dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800" : "bg-blue-100 text-blue-700 border-blue-200"}`}>
                                                                  {job.type}
                                                             </Badge>
                                                        </CardTitle>
                                                        <p className={`text-sm ${darkMode ? "dark:text-gray-400" : "text-gray-500"}`}>{job.companyName}</p>
                                                   </CardHeader>
                                                   <CardContent className="space-y-4">
                                                        <p className={`text-sm ${darkMode ? "dark:text-gray-300" : "text-gray-700"}`}>{job.description}</p>
                                                        <div className={`flex gap-4 text-sm ${darkMode ? "dark:text-gray-400" : "text-gray-500"}`}>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                               {job.location}
                          </span>
                                                             <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                                                                  {job.salary}
                          </span>
                                                             <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                                                                  {job.posted}
                          </span>
                                                        </div>
                                                        <div className="flex gap-2">
                                                             <Button
                                                                 onClick={() => handleApply(job)}
                                                                 disabled={appliedJobs.some((j) => j.id === job.id)}
                                                                 className={`w-full text-white ${
                                                                     darkMode
                                                                         ? "dark:bg-blue-600 dark:hover:bg-blue-700"
                                                                         : "bg-blue-500 hover:bg-blue-600"
                                                                 }`}
                                                             >
                                                                  {appliedJobs.some((j) => j.id === job.id)
                                                                      ? "Applied"
                                                                      : "Apply"}
                                                             </Button>
                                                             <Button
                                                                 onClick={() => handleSaveJob(job)}
                                                                 variant="outline"
                                                                 className={`w-full ${
                                                                     darkMode
                                                                         ? "dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700"
                                                                         : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                                                 }`}
                                                             >
                                                                  Unsave
                                                             </Button>
                                                        </div>
                                                   </CardContent>
                                              </Card>
                                          ))
                                      )}
                                 </div>
                            </section>
                        )}

                        {/* Profile */}
                        {activeTab === "profile" && (
                            <section className="max-w-3xl mx-auto space-y-6">
                                 <h2 className={`text-3xl font-bold ${darkMode ? "dark:text-white" : "text-gray-900"}`}>
                                      My Profile
                                 </h2>
                                 <Card className={`shadow-lg ${borderClass} ${cardClass}`}>
                                      <CardContent className="p-8 space-y-6">
                                           <div className="flex items-center gap-6">
                                                <img
                                                    src={profile.profilePicture}
                                                    alt="Preview"
                                                    className="w-20 h-20 rounded-full object-cover border"
                                                />
                                                <div className="flex-1">
                                                     <label className={`block text-sm font-medium mb-1 ${darkMode ? "dark:text-gray-300" : "text-gray-700"}`}>
                                                          Upload Profile Picture
                                                     </label>
                                                     <Input
                                                         type="file"
                                                         accept="image/*"
                                                         onChange={handleProfilePictureUpload}
                                                         className={`${borderClass} ${textClass} ${
                                                             darkMode ? "dark:bg-slate-700" : "bg-white"
                                                         }`}
                                                     />
                                                </div>
                                           </div>
                                           {/* Profile fields */}
                                           <div>
                                                <label className={`block text-sm font-medium mb-1 ${darkMode ? "dark:text-gray-300" : "text-gray-700"}`}>
                                                     Full Name
                                                </label>
                                                <Input
                                                    value={profile.fullName}
                                                    onChange={(e) => handleProfileUpdate("fullName", e.target.value)}
                                                    className={`${borderClass} ${textClass} ${
                                                        darkMode ? "dark:bg-slate-700" : "bg-white"
                                                    }`}
                                                />
                                           </div>
                                           <div>
                                                <label className={`block text-sm font-medium mb-1 ${darkMode ? "dark:text-gray-300" : "text-gray-700"}`}>
                                                     Email
                                                </label>
                                                <Input
                                                    value={profile.email}
                                                    onChange={(e) => handleProfileUpdate("email", e.target.value)}
                                                    className={`${borderClass} ${textClass} ${
                                                        darkMode ? "dark:bg-slate-700" : "bg-white"
                                                    }`}
                                                />
                                           </div>
                                           <div>
                                                <label className={`block text-sm font-medium mb-1 ${darkMode ? "dark:text-gray-300" : "text-gray-700"}`}>
                                                     Phone Number
                                                </label>
                                                <Input
                                                    value={profile.phone}
                                                    onChange={(e) => handleProfileUpdate("phone", e.target.value)}
                                                    className={`${borderClass} ${textClass} ${
                                                        darkMode ? "dark:bg-slate-700" : "bg-white"
                                                    }`}
                                                />
                                           </div>
                                           <div>
                                                <label className={`block text-sm font-medium mb-1 ${darkMode ? "dark:text-gray-300" : "text-gray-700"}`}>
                                                     Resume Link
                                                </label>
                                                <Input
                                                    value={profile.resumeLink}
                                                    onChange={(e) => handleProfileUpdate("resumeLink", e.target.value)}
                                                    className={`${borderClass} ${textClass} ${
                                                        darkMode ? "dark:bg-slate-700" : "bg-white"
                                                    }`}
                                                />
                                           </div>
                                           <div>
                                                <label className={`block text-sm font-medium mb-1 ${darkMode ? "dark:text-gray-300" : "text-gray-700"}`}>
                                                     Skills
                                                </label>
                                                <Textarea
                                                    value={profile.skills}
                                                    onChange={(e) => handleProfileUpdate("skills", e.target.value)}
                                                    rows={3}
                                                    className={`${borderClass} ${textClass} ${
                                                        darkMode ? "dark:bg-slate-700" : "bg-white"
                                                    }`}
                                                />
                                           </div>
                                           <div>
                                                <label className={`block text-sm font-medium mb-1 ${darkMode ? "dark:text-gray-300" : "text-gray-700"}`}>
                                                     Experience
                                                </label>
                                                <Textarea
                                                    value={profile.experience}
                                                    onChange={(e) => handleProfileUpdate("experience", e.target.value)}
                                                    rows={4}
                                                    className={`${borderClass} ${textClass} ${
                                                        darkMode ? "dark:bg-slate-700" : "bg-white"
                                                    }`}
                                                />
                                           </div>
                                           <Button
                                               onClick={handleProfileSave}
                                               className={`w-full text-white ${
                                                   darkMode
                                                       ? "dark:bg-blue-600 dark:hover:bg-blue-700"
                                                       : "bg-blue-500 hover:bg-blue-600"
                                               }`}
                                           >
                                                <User className="w-4 h-4 mr-2" />
                                                Save Profile
                                           </Button>
                                      </CardContent>
                                 </Card>
                            </section>
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
                             handleApply(selectedJob);
                             handleCloseJobDetails();
                        }}
                        onSave={() => {
                             handleSaveJob(selectedJob);
                        }}
                        isSaved={savedJobs.some((j) => j.id === selectedJob.id)}
                   />
              )}
         </div>
     );
};

export default JobSeekerDashboard;