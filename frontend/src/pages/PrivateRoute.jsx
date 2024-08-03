import React from "react";
import toast from "react-hot-toast";
import {Navigate} from "react-router-dom"
const PrivateRoute=({isLoggedIn,children})=>{
    if(isLoggedIn===true){
        return children;
    }
    else{
        toast.error("You must be logged in to perform this action!")
        
        return(
            <Navigate to="/login"/>
        )
    }
}
export default PrivateRoute;
