import React from "react";
import { 
     X, 
     MapPin, 
     DollarSign, 
     Calendar, 
     Clock, 
     Users, 
     Building2, 
     Mail, 
     Phone, 
     Globe, 
     Bookmark, 
     Share2, 
     Send,
     Star,
     CheckCircle,
     AlertCircle,
     Briefcase,
     GraduationCap,
     Zap,
     Heart
} from "lucide-react";

const JobDetails = ({ job, onClose, darkMode, onApply, onSave, isSaved = false }) => {
     if (!job) return null;

     const handleApply = () => {
          onApply?.(job);
     };

     const handleSave = () => {
          onSave?.(job);
     };

     const handleShare = () => {
          if (navigator.share) {
               navigator.share({
                    title: job.title,
                    text: `Check out this job: ${job.title} at ${job.companyName}`,
                    url: window.location.href,
               });
          } else {
               // Fallback: copy to clipboard
               navigator.clipboard.writeText(window.location.href);
               // You can add a toast notification here
          }
     };

     return (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <div 
                   className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                   onClick={onClose}
              />
              
              {/* Modal */}
              <div className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl transition-all duration-300 ${
                   darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
              }`}>
                   {/* Header */}
                   <div className={`sticky top-0 z-10 flex items-center justify-between p-6 border-b ${
                        darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"
                   }`}>
                        <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                  <Briefcase className="w-6 h-6 text-white" />
                             </div>
                             <div>
                                  <h2 className="text-xl font-bold">{job.title}</h2>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                       {job.companyName || "Company Name"}
                                  </p>
                             </div>
                        </div>
                        <button
                             onClick={onClose}
                             className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                                  darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                             }`}
                        >
                             <X className="w-5 h-5" />
                        </button>
                   </div>

                   {/* Content */}
                   <div className="p-6 space-y-6">
                        {/* Job Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             <div className={`flex items-center gap-3 p-4 rounded-xl ${
                                  darkMode ? "bg-gray-800" : "bg-gray-50"
                             }`}>
                                  <MapPin className="w-5 h-5 text-blue-600" />
                                  <div>
                                       <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                                       <p className="font-medium">{job.location}</p>
                                  </div>
                             </div>
                             
                             <div className={`flex items-center gap-3 p-4 rounded-xl ${
                                  darkMode ? "bg-gray-800" : "bg-gray-50"
                             }`}>
                                  <DollarSign className="w-5 h-5 text-green-600" />
                                  <div>
                                       <p className="text-sm text-gray-500 dark:text-gray-400">Salary</p>
                                       <p className="font-medium">{job.salary}</p>
                                  </div>
                             </div>
                             
                             <div className={`flex items-center gap-3 p-4 rounded-xl ${
                                  darkMode ? "bg-gray-800" : "bg-gray-50"
                             }`}>
                                  <Clock className="w-5 h-5 text-purple-600" />
                                  <div>
                                       <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                                       <p className="font-medium">{job.jobType || "Full-time"}</p>
                                  </div>
                             </div>
                        </div>

                        {/* Company Information */}
                        <div className={`p-6 rounded-xl border ${
                             darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
                        }`}>
                             <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                  <Building2 className="w-5 h-5 text-blue-600" />
                                  About the Company
                             </h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                       <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Company Name</p>
                                       <p className="font-medium">{job.companyName || "Company Name"}</p>
                                  </div>
                                  <div>
                                       <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Industry</p>
                                       <p className="font-medium">{job.industry || "Technology"}</p>
                                  </div>
                                  <div>
                                       <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Company Size</p>
                                       <p className="font-medium">{job.companySize || "50-200 employees"}</p>
                                  </div>
                                  <div>
                                       <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Founded</p>
                                       <p className="font-medium">{job.founded || "2020"}</p>
                                  </div>
                             </div>
                             {job.companyDescription && (
                                  <div className="mt-4">
                                       <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Company Description</p>
                                       <p className="text-sm leading-relaxed">{job.companyDescription}</p>
                                  </div>
                             )}
                        </div>

                        {/* Job Description */}
                        <div>
                             <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                  <GraduationCap className="w-5 h-5 text-green-600" />
                                  Job Description
                             </h3>
                             <div className={`p-6 rounded-xl border ${
                                  darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
                             }`}>
                                  <div className="prose prose-sm max-w-none dark:prose-invert">
                                       <p className="leading-relaxed">{job.description}</p>
                                  </div>
                             </div>
                        </div>

                        {/* Requirements */}
                        {job.requirements && (
                             <div>
                                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                       <CheckCircle className="w-5 h-5 text-green-600" />
                                       Requirements
                                  </h3>
                                  <div className={`p-6 rounded-xl border ${
                                       darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
                                  }`}>
                                       <ul className="space-y-2">
                                            {job.requirements.map((req, index) => (
                                                 <li key={index} className="flex items-start gap-2">
                                                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                      <span className="text-sm">{req}</span>
                                                 </li>
                                            ))}
                                       </ul>
                                  </div>
                             </div>
                        )}

                        {/* Benefits */}
                        {job.benefits && (
                             <div>
                                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                       <Heart className="w-5 h-5 text-red-600" />
                                       Benefits
                                  </h3>
                                  <div className={`p-6 rounded-xl border ${
                                       darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
                                  }`}>
                                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {job.benefits.map((benefit, index) => (
                                                 <div key={index} className="flex items-center gap-2">
                                                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                      <span className="text-sm">{benefit}</span>
                                                 </div>
                                            ))}
                                       </div>
                                  </div>
                             </div>
                        )}

                        {/* Contact Information */}
                        <div className={`p-6 rounded-xl border ${
                             darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
                        }`}>
                             <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                  <Mail className="w-5 h-5 text-blue-600" />
                                  Contact Information
                             </h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="flex items-center gap-3">
                                       <Mail className="w-4 h-4 text-gray-500" />
                                       <span className="text-sm">{job.contactEmail || "hr@company.com"}</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                       <Phone className="w-4 h-4 text-gray-500" />
                                       <span className="text-sm">{job.contactPhone || "+1 (555) 123-4567"}</span>
                                  </div>
                                  {job.website && (
                                       <div className="flex items-center gap-3">
                                            <Globe className="w-4 h-4 text-gray-500" />
                                            <a 
                                                 href={job.website} 
                                                 target="_blank" 
                                                 rel="noopener noreferrer"
                                                 className="text-sm text-blue-600 hover:underline"
                                            >
                                                 {job.website}
                                            </a>
                                       </div>
                                  )}
                             </div>
                        </div>
                   </div>

                   {/* Footer Actions */}
                   <div className={`sticky bottom-0 p-6 border-t ${
                        darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"
                   }`}>
                        <div className="flex items-center justify-between gap-4">
                             <div className="flex items-center gap-3">
                                  <button
                                       onClick={handleSave}
                                       className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                                            isSaved 
                                                 ? "bg-red-100 text-red-600 dark:bg-red-900/20" 
                                                 : darkMode 
                                                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700" 
                                                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                       }`}
                                  >
                                       <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                                       {isSaved ? "Saved" : "Save Job"}
                                  </button>
                                  
                                  <button
                                       onClick={handleShare}
                                       className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                                            darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                       }`}
                                  >
                                       <Share2 className="w-4 h-4" />
                                       Share
                                  </button>
                             </div>
                             
                             <button
                                  onClick={handleApply}
                                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                             >
                                  <Send className="w-4 h-4" />
                                  Apply Now
                             </button>
                        </div>
                   </div>
              </div>
         </div>
     );
};

export default JobDetails; 