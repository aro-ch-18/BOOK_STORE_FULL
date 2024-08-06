import React, { useState } from 'react'
import { Spinner } from '../Components/Spinner'
import { BackButton } from '../Components/backButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";

// Use import.meta.env to fetch the API_URL from the environment file
console.log(import.meta.env.VITE_API_URL);
console.log("asdasdf")

export const CreateBook = () => {
    const [formData, setFormData] = useState({ title: "", author: "", publishYear: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function changeHandler(event) {
        setFormData(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    function submitHandler(event) {
        event.preventDefault();
        const token = localStorage.getItem('token');
        setLoading(true);
        axios
            .post(`${import.meta.env.VITE_API_URL}/book/createBook`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then((response) => {
                console.log(response);
                setLoading(false);
                toast.success("Created!");
                navigate("/")
            })
            .catch(() => {
                setLoading(false);
                alert("Error in creating. Please check the console")
            })

    }

    return (
        <div className='p-4 min-h-[82vh]'>
            <BackButton />
            <h1 className='text-3xl my-4'> Create Book</h1>
            {
                loading ? (
                    <Spinner />
                ) : (
                    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                        <form>
                            <label className="text-xl mr-4 text-gray-500" htmlFor="title">Title </label>
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
                            <br />
                            <label
                                className="text-xl mr-4 text-gray-500"
                                htmlFor="author">Author: </label>
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
                            <br />
                            <label
                                className="text-xl mr-4 text-gray-500"
                                htmlFor="publishYear">Published Year: </label>
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