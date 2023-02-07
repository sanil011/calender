import { useState,useEffect } from 'react'
import Home from "./pages/Home"
import SignUp from './pages/Signup'
import Login from "./pages/Login"
import { auth } from "./firebase"
import Person from "./pages/Person";
import { useDispatch, useSelector } from 'react-redux';
import { profileActions } from './store/profileSlice'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
function App() {
 const {user} = useSelector((state)=>state.profile)
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
  
  const AuthRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/" replace />
    }
    return children;
  }
  const ProtectRoute = ({ children }) => {
    if (user) {
      return <Navigate to="/user" replace />
    }
    return children;
  }

  return (

    <BrowserRouter>
      <div className="App">
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
