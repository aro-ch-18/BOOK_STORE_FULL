import React, { useEffect } from 'react'
import {Routes,Route} from "react-router-dom"
import {Home} from "./pages/home"
import { DeleteBook } from './pages/deleteBook'
import { EditBook } from './pages/editBook'
import { CreateBook } from './pages/createBook'
import { ShowBook } from './pages/showBook'
// import {Spinner} from './Components/Spinner'
import Login from "./pages/Login"
import Signup from './pages/Signup'
import { useState } from 'react'
import  NavBar  from './Components/NavBar'
import PrivateRoute from './pages/PrivateRoute'
export const App = () => {
  const [isloggedIn,setIsLoggedIn]=useState(false);
  // console.log(process.env.API_URL)
  // const api=process.env.REACT_APP_API_URL;
  useEffect(() => {
    const token = localStorage.getItem('token'); // Use the same key as when you store the token
    if (token) {
      // Optionally validate the token here, e.g., by making an API call
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
 console.log("app",isloggedIn)
  return (
    <div className='h-screen'>
    <NavBar isloggedIn={isloggedIn} setIsLoggedIn={setIsLoggedIn}></NavBar>
    {/* <Login/>
    <Signup/> */}
  
    <Routes>
      
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
      <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn}/>}/>
      
    
      <Route path="/book/delete/:id" element={<PrivateRoute isLoggedIn={isloggedIn}>
        <DeleteBook/>
      </PrivateRoute>}/>
      <Route path="/book/edit/:id" element={<PrivateRoute isLoggedIn={isloggedIn}>
        <EditBook/>
      </PrivateRoute>}/>
      <Route path="/book/details/:id" element={<ShowBook/>}/>
      <Route path="/book/create" element={<PrivateRoute isLoggedIn={isloggedIn}>
        <CreateBook/>
      </PrivateRoute>}/>
    </Routes>

  
    
    </div>
    
  )
}
