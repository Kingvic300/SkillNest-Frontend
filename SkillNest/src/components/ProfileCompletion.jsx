import React from "react";

const ProfileCompletion = ({ profile, onUpdate, onSave, onFileChange }) => {
     const totalSections = 4;
     const completedSections = [
          profile.fullName,
          profile.email,
          profile.phone,
          profile.resumeLink,
     ].filter(Boolean).length;

     const completionPercent = Math.round((completedSections / totalSections) * 100);

     return (
         <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold">Complete Your Profile</h2>

              {/* Profile Picture Upload */}
              <div className="flex items-center gap-4">
                   {profile.profilePicturePreview ? (
                       <img
                           src={profile.profilePicturePreview}
                           alt="Profile"
                           className="w-16 h-16 rounded-full object-cover border"
                       />
                   ) : (
                       <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-600" />
                   )}
                   <label className="cursor-pointer text-sm font-medium text-blue-600 hover:underline">
                        Upload Profile Picture
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => onFileChange(e.target.files[0])}
                        />
                   </label>
              </div>

              {/* Progress Bar */}
              <div>
                   <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Profile Completion</span>
                        <span className="text-sm text-blue-600">{completionPercent}%</span>
                   </div>
                   <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${completionPercent}%` }}
                        />
                   </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                   <ProfileField
                       label="Full Name"
                       value={profile.fullName}
                       name="fullName"
                       onChange={onUpdate}
                   />
                   <ProfileField
                       label="Email"
                       value={profile.email}
                       name="email"
                       onChange={onUpdate}
                   />
                   <ProfileField
                       label="Phone Number"
                       value={profile.phone}
                       name="phone"
                       onChange={onUpdate}
                   />
                   <ProfileField
                       label="Resume Link"
                       value={profile.resumeLink}
                       name="resumeLink"
                       onChange={onUpdate}
                   />
              </div>

              <button
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={onSave}
              >
                   Save All
              </button>
         </div>
     );
};

const ProfileField = ({ label, value, name, onChange }) => (
    <div className="space-y-1">
         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
         </label>
         <input
             type="text"
             name={name}
             value={value}
             onChange={onChange}
             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
         />
         <p className="text-xs text-gray-400">
              {value ? "✔️ Completed" : "⚠️ Incomplete"}
         </p>
    </div>
);

export default ProfileCompletion;
