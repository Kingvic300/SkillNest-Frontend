import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Loader } from "../components/Loader.jsx";
import EmployerDashboard from "../pages/EmployerDashBoard.jsx";

const DashBoard = React.lazy(() => import("../pages/DashBoard.jsx"));
const AuthPageWrapper = React.lazy(() => import("../pages/wrapper/AuthPageWrapper.jsx"));
const JobSeekerDashboard = React.lazy(() => import("../pages/JobSeekerDashBoard.jsx"));

const createRoutes = ({ darkMode, setDarkMode }) =>
    createBrowserRouter([
         {
              path: "/",
              element: (
                  <React.Suspense fallback={<Loader />}>
                       <DashBoard
                           darkMode={darkMode}
                           toggleTheme={() => setDarkMode((prev) => !prev)}
                       />
                  </React.Suspense>
              ),
         },
         {
              path: "/auth",
              element: (
                  <React.Suspense fallback={<Loader />}>
                       <AuthPageWrapper darkMode={darkMode} />
                  </React.Suspense>
              ),
         },
         {
              path: "/jobseeker/dashboard",
              element: (
                  <React.Suspense fallback={<Loader />}>
                       <JobSeekerDashboard darkMode={darkMode} />
                  </React.Suspense>
              ),
         },
         {
              path: "/employer/dashboard",
              element: (
                  <React.Suspense fallback={<Loader />}>
                       <EmployerDashboard darkMode={darkMode} />
                  </React.Suspense>
              ),
         },
    ]);

export default createRoutes;
