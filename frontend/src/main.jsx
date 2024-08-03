import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import './index.css'
// import { Toaster } from 'react-hot-toast'
// import {ToastContainer} from "react-toastify"
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    {/* <ToastContainer/> */}
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
  </BrowserRouter>
    
 
 
    
)
