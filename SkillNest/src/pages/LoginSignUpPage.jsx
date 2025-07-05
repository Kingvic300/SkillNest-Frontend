import React, { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../components/InputOtp.jsx";

const LoginSignUpPage = ({ darkMode, onLogin, onRequestOtp, onVerifyOtp }) => {
     const [isSignup, setIsSignup] = useState(false);
     const [showOtp, setShowOtp] = useState(false);
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [otp, setOtp] = useState("");

     const handleLoginSubmit = (e) => {
          e.preventDefault();
          onLogin(email, password);
     };

     const handleSignupStep1 = (e) => {
          e.preventDefault();
          onRequestOtp(email, password);
          setShowOtp(true); // Move to OTP step
     };

     const handleOtpSubmit = (e) => {
          e.preventDefault();
          onVerifyOtp(email, password, otp);
     };

     return (
         <div
             className={`min-h-screen flex items-center justify-center px-4 ${
                 darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
             }`}
         >
              <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                   <h2 className="text-3xl font-bold text-center mb-6">
                        {isSignup ? "Create an Account" : "Welcome Back"}
                   </h2>

                   <form
                       onSubmit={
                            isSignup
                                ? showOtp
                                    ? handleOtpSubmit
                                    : handleSignupStep1
                                : handleLoginSubmit
                       }
                       className="space-y-5"
                   >
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {/* OTP input field */}
                        {isSignup && showOtp && (
                            <div className="flex flex-col items-center gap-3">
                                 <label className="text-center text-sm">Enter the 6-digit OTP sent to your email</label>
                                 <InputOTP
                                     maxLength={6}
                                     value={otp}
                                     onChange={(val) => setOtp(val)}
                                     containerClassName="justify-center gap-3"
                                 >
                                      <InputOTPGroup>
                                           {[...Array(6)].map((_, idx) => (
                                               <InputOTPSlot
                                                   key={idx}
                                                   index={idx}
                                                   className="w-10 h-10 rounded-full border border-gray-400 dark:border-gray-500 bg-transparent text-center text-lg"
                                               />
                                           ))}
                                      </InputOTPGroup>
                                 </InputOTP>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                        >
                             {isSignup ? (showOtp ? "Verify OTP" : "Get OTP") : "Login"}
                        </button>
                   </form>

                   {/* Toggle login/signup */}
                   <div className="text-center mt-4 text-sm">
                        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button
                            className="text-blue-500 hover:underline"
                            onClick={() => {
                                 setIsSignup(!isSignup);
                                 setShowOtp(false);
                                 setOtp("");
                            }}
                        >
                             {isSignup ? "Login" : "Sign Up"}
                        </button>
                   </div>
              </div>
         </div>
     );
};

export default LoginSignUpPage;
