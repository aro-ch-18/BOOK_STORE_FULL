import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton } from '../Components/backButton';
import { Spinner } from '../Components/Spinner';
import axios from 'axios';
import {toast} from  "react-hot-toast"
export const DeleteBook = () => {
  const navigate=useNavigate();
  const[loading,setLoading]=useState(false);
  const {id}=useParams();
  function deleteHandler(){
    setLoading(true);
    const token=localStorage.getItem("token");
    axios
    .delete(`${import.meta.env.VITE_API_URL}/book/deleteBook/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response)=>{
      console.log(response);
      setLoading(false);
      toast.success("Deleted!")
      navigate("/");

    })
    .catch(()=>{
      setLoading(false);
      alert("Error deleting book");
      
    })
  }

  return (
    <div className='p-4'>
        <BackButton/>
        <h1 className='text-3xl my-4'> Delete Book</h1>
        {
            loading?(
                <Spinner/>

            ):(
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                  <h3 className="text-2xl text-center">Are you sure you want to delete the book?</h3>
                  <button className='p-4 bg-red-600 text-white mt-8 w-full rounded-xl' onClick={deleteHandler}>Yes, Delete It</button>
                  <button className='p-4 bg-green-600 text-white mt-8 w-full rounded-xl' onClick={()=>navigate("/")}>No</button>
 
                </div>

            )

        }
        
    </div>
  )
}
