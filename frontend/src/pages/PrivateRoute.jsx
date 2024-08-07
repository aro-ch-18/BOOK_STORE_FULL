import React, { useEffect } from "react";
import toast from "react-hot-toast";
import {Navigate} from "react-router-dom"
const PrivateRoute=({isLoggedIn,children})=>{
    const loggedIn=isLoggedIn;
    // console.log("isloggedin",isLoggedIn);


    //HERE WE HAVE TO USE USEEFFECT becaue if not used will cause a problem because if use effect is not used, the toast will be printed in the rendering process. The Toast must be printed after render hence useEffect is used
    useEffect(()=>{
        if(!isLoggedIn){
            toast.error("You must be logged in to perform this action!");
        }

    },[loggedIn])
    if(isLoggedIn===true){
        return children;
    }
    else{
        // console.log(isLoggedIn);
        // useEffect()
        // console.log("DIRECTING TO LOGIN!")
        return(<>
        {
            localStorage.getItem("token")?
            (<Navigate to="/"/>):
            (<Navigate to="/login"/>)
        }
        </>
            
           
            
        )
    }
}
export default PrivateRoute;
