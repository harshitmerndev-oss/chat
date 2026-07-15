import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SingUP from './pages/SignUP'
import Getcurrentuser from './customHooks/Getcurrentuser'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import Profile from './pages/Profile'
import GetOtherUser from './customHooks/Getotheruser'
import { useEffect } from 'react'
import {io} from 'socket.io-client'
import { serverUrl } from './main'
import { useDispatch } from "react-redux";
import { setSocket, setonlineusers } from "./redux/userSlice";
const App = () => {
  
  let {user ,socket,onlineusers}=useSelector((state) => state.user);
  let dispatch=useDispatch()
  useEffect(() => {
  if (!user) return;

  const socket = io(serverUrl, {
    query: {
      id: user._id,
    }
  });

  dispatch(setSocket(socket));

 socket.on("getonlineusers", (users) => {
   dispatch(setonlineusers(users));
 })

 return () => {
   socket.close();
 };


  
}, [user]);
  return (
    <>
     <Getcurrentuser/>
     <GetOtherUser/>
     
   <Routes>
    

    <Route path='/signup' element={!user ? <SingUP /> : <Navigate to="/profile" />}/>
    <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />}/>
    <Route path='/' element={user ? <Home /> : <Navigate to="/login" />}/>
    <Route path='/profile' element={user ?<Profile />: <Navigate to="/signup" />}/>
   

   </Routes>
    </>
  )
}

export default App