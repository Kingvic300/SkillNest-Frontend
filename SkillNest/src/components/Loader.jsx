import React from 'react';

export const Loader = () => (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
         <div className="flex flex-col items-center space-y-3">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Loading, please wait...</p>
         </div>
    </div>
);