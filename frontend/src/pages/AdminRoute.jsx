import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("role") === "admin";

  useEffect(() => {
    if (!isAdmin) {
      toast.error("You must be an ADMINISTRATOR to perform this action!");
    }
  }, [isAdmin]);

  if (isAdmin) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default AdminRoute;



// The warning you're seeing is due to the fact that toast.error is being called during the render phase of the AdminRoute component. React does not allow state updates (like showing a toast notification) during the render phase.

// To fix this, you can use the useEffect hook to show the toast notification after the component has rendered. Here's how you can modify the AdminRoute component:

// Updated AdminRoute.jsx