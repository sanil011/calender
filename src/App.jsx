import { useState,useEffect } from 'react'
import Home from "./pages/Home"
import SignUp from './pages/Signup'
import Login from "./pages/Login"
import { auth } from "./firebase"
import Person from "./pages/Person";
import { useDispatch, useSelector } from 'react-redux';
import { profileActions } from './store/profileSlice'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import {  Backdrop, CircularProgress } from "@mui/material";
import { useGlobalContext } from './context/globalContext'
function App() {

 const {email} = useSelector((state)=>state.profile)
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((usr) => {
      dispatch(profileActions.setProfile(usr?.displayName))
      dispatch(profileActions.setEmail(usr?.email))
    })
    return () => {
      unsub();
    }
  }, [])

  const { loading } = useGlobalContext();
  
  const AuthRoute = ({ children }) => {
    if (!email) {
      console.log(email)
      return <Navigate to="/" replace />
    }
    return children;
  }
  const ProtectRoute = ({ children }) => {
    if (email) {
      return <Navigate to="/user" replace />
    }
    return children;
  }

  return (

    <BrowserRouter>
      <div className="App">
        <Backdrop style={{ zIndex: "10000", color: "#fff" }} open={loading}>
          <CircularProgress />
        </Backdrop>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/user" element={<AuthRoute><Person  /></AuthRoute>} />
          <Route path="/login" element={<ProtectRoute><Login /></ProtectRoute>} />
          <Route path="/signup" element={<ProtectRoute><SignUp /></ProtectRoute>} />
        </Routes>
      </div>
      </BrowserRouter>

  )
}

export default App
