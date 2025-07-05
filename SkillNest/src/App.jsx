import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import createRoutes from "./router/routes";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
     const [darkMode, setDarkMode] = useState(true);

     const routes = createRoutes({ darkMode, setDarkMode });

     return (
         <>
              <ToastContainer position="top-right" autoClose={3000} />
              <RouterProvider router={routes} />
         </>
     );
}

export default App;
