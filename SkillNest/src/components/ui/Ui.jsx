import React from "react";
import clsx from "clsx";

export const Textarea = ({ className = "", ...props }) => {
     return (
         <textarea
             {...props}
             className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none ${className}`}
         />
     );
};
export const Input = ({ className = "", ...props }) => {
     return (
         <input
             {...props}
             className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${className}`}
         />
     );
};
export const Card = ({ children, className = "" }) => (
    <div className={`rounded-xl bg-white p-4 shadow-md ${className}`}>{children}</div>
);

export const CardHeader = ({ children, className = "" }) => (
    <div className={`mb-2 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = "" }) => (
    <h2 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h2>
);

export const CardContent = ({ children, className = "" }) => (
    <div className={className}>{children}</div>
);
export const Button = ({ children, className = "", variant = "default", ...props }) => {
     const base = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none";

     const variants = {
          default: "bg-blue-600 text-white hover:bg-blue-700",
          outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
     };

     return (
         <button className={clsx(base, variants[variant], className)} {...props}>
              {children}
         </button>
     );
};

export const Badge = ({ children, className = "" }) => (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
    {children}
  </span>
);