import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import { toast } from "sonner";
import {
     Briefcase,
     UserCircle,
     FilePlus,
     Trash2,
     CheckCircle,
     LogOut,
} from "lucide-react";

const EmployerDashboard = ({ user }) => {
     const { darkMode } = useTheme();
     const [tab, setTab] = useState("profile");

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
     });

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
               toast.success("Profile saved.");
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
               toast.success("Job posted.");
               setTab("posted");
               setNewJob({ title: "", description: "", location: "", salary: "" });
          } catch {
               toast.error("Failed to post job.");
          }
     };

     const handleDeleteJob = async (id) => {
          try {
               await axios.delete(`http://localhost:8080/employer/delete-job/${id}`);
               setJobs((prev) => prev.filter((j) => j.id !== id));
               toast.success("Job deleted.");
          } catch {
               toast.error("Failed to delete job.");
          }
     };

     const handleVerifyCompletion = async (id) => {
          try {
               await axios.patch("http://localhost:8080/employer/verify-completion", {
                    jobId: id,
               });
               toast.success("Job marked complete.");
          } catch {
               toast.error("Verification failed.");
          }
     };

     return (
         <div
             className={`min-h-screen font-inter transition-colors duration-300 ${
                 darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
             }`}
         >
              <header
                  className={`fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-8 border-b z-10 shadow-sm ${
                      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                  }`}
              >
                   <h1 className="text-xl font-semibold tracking-wide">Employer Dashboard</h1>
                   <div className="flex items-center gap-4">
                        <img
                            src={profile.profilePictureUrl || "/default-company.png"}
                            alt="Company"
                            className="w-9 h-9 rounded-full object-cover border"
                        />
                        <span className="font-medium text-sm truncate max-w-[160px]">
                        {profile.companyName}
                    </span>
                        <button
                            className={`p-2 rounded-full ${
                                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                        >
                             <LogOut size={18} />
                        </button>
                   </div>
              </header>

              <div className="pt-16 flex">
                   <aside
                       className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] border-r shadow-sm transition-colors ${
                           darkMode ? "bg-gray-850 border-gray-700" : "bg-white border-gray-200"
                       }`}
                   >
                        <div className="p-6 space-y-2">
                             {tabs.map((t) => (
                                 <button
                                     key={t.key}
                                     onClick={() => setTab(t.key)}
                                     className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md font-medium text-sm transition ${
                                         tab === t.key
                                             ? "bg-blue-600 text-white shadow-sm"
                                             : darkMode
                                                 ? "text-gray-300 hover:bg-gray-700"
                                                 : "text-gray-800 hover:bg-gray-100"
                                     }`}
                                 >
                                      {t.icon}
                                      <span>{t.label}</span>
                                 </button>
                             ))}
                        </div>
                   </aside>

                   <main className="ml-64 flex-1 p-10 space-y-10">
                        {tab === "profile" && (
                            <div className="max-w-4xl mx-auto">
                                 <div
                                     className={`p-8 rounded-xl shadow-lg ${
                                         darkMode ? "bg-gray-800" : "bg-white"
                                     }`}
                                 >
                                      <h2 className="text-2xl font-semibold mb-6">Company Profile</h2>
                                      <div className="flex flex-col md:flex-row gap-8 mb-8">
                                           <div className="flex flex-col items-center gap-3">
                                                <div className="relative group">
                                                     <img
                                                         src={
                                                             profile.profilePictureUrl ||
                                                             "/default-company.png"
                                                         }
                                                         alt="Company Logo"
                                                         className="w-32 h-32 rounded-full object-cover border-2 border-gray-400 shadow-sm"
                                                     />
                                                     <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-medium cursor-pointer">
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
                                                     "companyName",
                                                     "companyEmail",
                                                     "companyPhoneNumber",
                                                     "companyLocation",
                                                ].map((field) => (
                                                    <div key={field}>
                                                         <label className="block mb-1 text-sm font-medium capitalize">
                                                              {field.replace(/([A-Z])/g, " $1")}
                                                         </label>
                                                         <input
                                                             value={profile[field]}
                                                             onChange={(e) =>
                                                                 setProfile({ ...profile, [field]: e.target.value })
                                                             }
                                                             className={`w-full px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                                 darkMode
                                                                     ? "bg-gray-700 border-gray-600 text-white"
                                                                     : "bg-white border-gray-300 text-gray-900"
                                                             }`}
                                                         />
                                                    </div>
                                                ))}
                                           </div>
                                      </div>
                                      <div className="mb-6">
                                           <label className="block mb-1 text-sm font-medium">
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
                                               className={`w-full px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                   darkMode
                                                       ? "bg-gray-700 border-gray-600 text-white"
                                                       : "bg-white border-gray-300 text-gray-900"
                                               }`}
                                           />
                                      </div>
                                      <button
                                          onClick={handleProfileSave}
                                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-sm font-medium"
                                      >
                                           Save Profile
                                      </button>
                                 </div>
                            </div>
                        )}

                        {tab === "posted" && (
                            <div>
                                 <h2 className="text-2xl font-semibold mb-6">Posted Jobs</h2>
                                 {jobs.length === 0 ? (
                                     <div
                                         className={`p-10 text-center rounded-xl ${
                                             darkMode
                                                 ? "bg-gray-800 text-gray-400"
                                                 : "bg-white text-gray-500"
                                         }`}
                                     >
                                          <p className="text-base">You haven’t posted any jobs yet.</p>
                                     </div>
                                 ) : (
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                          {jobs.map((job) => (
                                              <div
                                                  key={job.id}
                                                  className={`p-6 rounded-xl shadow ${
                                                      darkMode ? "bg-gray-800" : "bg-white"
                                                  }`}
                                              >
                                                   <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                                                   <div className="flex items-center space-x-4 mb-2 text-sm text-gray-500">
                                                        <span>{job.location}</span>
                                                        <span className="text-blue-600">{job.salary}</span>
                                                   </div>
                                                   <p className="text-sm mb-4 text-gray-400">
                                                        {job.description}
                                                   </p>
                                                   <div className="flex gap-3">
                                                        <button
                                                            onClick={() => handleVerifyCompletion(job.id)}
                                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium"
                                                        >
                                                             <CheckCircle size={16} className="inline-block mr-1" />
                                                             Verify
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteJob(job.id)}
                                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium"
                                                        >
                                                             <Trash2 size={16} className="inline-block mr-1" />
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
                                     className={`p-8 rounded-xl shadow ${
                                         darkMode ? "bg-gray-800" : "bg-white"
                                     }`}
                                 >
                                      <h2 className="text-2xl font-semibold mb-6">Create a New Job</h2>
                                      <div className="space-y-6">
                                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {["title", "location", "salary"].map((field) => (
                                                    <div key={field}>
                                                         <label className="block mb-1 text-sm font-medium capitalize">
                                                              {field}
                                                         </label>
                                                         <input
                                                             value={newJob[field]}
                                                             onChange={(e) =>
                                                                 setNewJob({ ...newJob, [field]: e.target.value })
                                                             }
                                                             placeholder={`Enter ${field}`}
                                                             className={`w-full px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                                 darkMode
                                                                     ? "bg-gray-700 border-gray-600 text-white"
                                                                     : "bg-white border-gray-300 text-gray-900"
                                                             }`}
                                                         />
                                                    </div>
                                                ))}
                                           </div>
                                           <div>
                                                <label className="block mb-1 text-sm font-medium">Description</label>
                                                <textarea
                                                    rows={5}
                                                    value={newJob.description}
                                                    onChange={(e) =>
                                                        setNewJob({ ...newJob, description: e.target.value })
                                                    }
                                                    placeholder="Enter job description"
                                                    className={`w-full px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                        darkMode
                                                            ? "bg-gray-700 border-gray-600 text-white"
                                                            : "bg-white border-gray-300 text-gray-900"
                                                    }`}
                                                />
                                           </div>
                                           <button
                                               onClick={handlePostJob}
                                               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium text-sm"
                                           >
                                                Post Job
                                           </button>
                                      </div>
                                 </div>
                            </div>
                        )}
                   </main>
              </div>
         </div>
     );
};

export default EmployerDashboard;