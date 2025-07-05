import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthPage from "../LoginSignUpPage.jsx";

const AuthPageWrapper = () => {
     const [darkMode, setDarkMode] = useState(true);
     const navigate = useNavigate();

     const handleLogin = (email, password) => {
          console.log("Logging in:", email, password);
          navigate("/"); // go home
     };

     const handleRequestOtp = (email, password) => {
          console.log("Send OTP to:", email);
          // Call API to send OTP to user
     };

     const handleVerifyOtp = (email, password, otp) => {
          console.log("Verify OTP:", email, password, otp);
          // If OTP is valid:
          navigate("/");
     };

     return (
         <AuthPage
             darkMode={darkMode}
             onLogin={handleLogin}
             onRequestOtp={handleRequestOtp}
             onVerifyOtp={handleVerifyOtp}
         />
     );
};

export default AuthPageWrapper;
