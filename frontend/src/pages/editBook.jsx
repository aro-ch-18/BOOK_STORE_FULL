import React, { useState,useEffect } from 'react'
import {Spinner} from '../Components/Spinner'
import { BackButton } from '../Components/backButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {toast} from "react-hot-toast"
export const EditBook = () => {
    const[formData,setFormData]=useState({title:"",author:"",publishYear:""});
    const[loading,setLoading]=useState(false);
    const {id}=useParams();
    const token=localStorage.getItem("token");
    const navigate=useNavigate();
    useEffect(()=>{
      setLoading(true);
      
      axios
      .get(`http://localhost:5555/api/v1/book/getBookId/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response)=>{
        setFormData({
          title:response.data.books.title,
          author:response.data.books.author,
          publishYear:response.data.books.publishYear
        })
        setLoading(false);
      })
      .catch(()=>{
        alert("Error!")
        setLoading(false);
      })

      
    },[])
    function changeHandler(event) {
        setFormData(prevState=>{
            return {
                ...prevState,
                [event.target.name]:event.target.value
            }
        })
    }
    function submitHandler(event){
        event.preventDefault();
       
            setLoading(true);
            axios
            .put(`${import.meta.env.VITE_API_URL}/book/updateBook/${id}`,formData,{
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then((response)=>{
                console.log(response);
                setLoading(false);
                toast.success("Updated!")
                navigate("/")
            })
            .catch(()=>{
                setLoading(false);
                alert("Error in updating! Please check the console")
            })
        
    }
  return (
    <div className='p-4'>
        <BackButton/>
        <h1 className='text-3xl my-4'> Edit Book</h1>
        {
            loading?(
                <Spinner/>

            ):(
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <form>
            <label className="text-xl mr-4 text-gray-500" for="title">Title </label>
            <input 
            id="title"
            type="text"
            placeholder='Enter'
            value={formData.title}
            name="title"
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-lg'
            onChange={changeHandler}
            >

            </input>
            <br/>
            <label 
            className="text-xl mr-4 text-gray-500"
            for="author">Author: </label>
            <input 
            id="author"
            name="author"
            type="text"
            placeholder='Enter'
            value={formData.author}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-lg'
            onChange={changeHandler}
            >

            </input>
            <br/>
            <label 
            className="text-xl mr-4 text-gray-500"
            for="publishYear">Published Year: </label>
            <input 
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-lg'
            id="publishYear"
            type="text"
            name="publishYear"
            placeholder='Enter'
            value={formData.publishYear}
            onChange={changeHandler}
            >

            </input>
            <button onClick={submitHandler} className='p-2 bg-sky-300 rounded-lg mt-4 w-full'>Save</button>

        </form>

                </div>

            )

        }
        
    </div>
  )
}
