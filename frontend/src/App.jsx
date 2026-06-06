import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Signup from './pages/signup';
import Signin from './pages/signin';
import Landing from './pages/landing/landing';
import Mainpage from './pages/main/mainpage';
import PrivateRoute from "./routes/PrivateRoute";

import './App.css'

/* --- Actual app with different pages --- */
function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // If user is already sigined redirect them to main app
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      if (location.pathname === "/signin" || location.pathname === "/signup")
      {
        console.log("Already Signed-up or signed-in")
        navigate("/AniTV", {replace: true})
      }
    }

  }, [])

  return (
    <>
      <Routes>
        <Route index element={<Landing/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/*" element={
          <PrivateRoute>
            <Mainpage/>
          </PrivateRoute>
          } />
      </Routes>
    </>
  )
}
 
export default App