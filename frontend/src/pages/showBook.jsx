import React from 'react';
import { BackButton } from "../Components/backButton";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Spinner } from '../Components/Spinner';
import { toast } from "react-hot-toast";

export const ShowBook = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_API_URL}/book/getBookId/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setBook(response.data.books);
                setLoading(false);
                toast.success(`${response.data.books.title}`);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Show Book</h1>
            {
                loading ? (
                    <Spinner />
                ) : (
                    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Id</span>
                            <span>{book._id}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Title</span>
                            <span>{book.title}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Author</span>
                            <span>{book.author}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
                            <span>{book.publishYear}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Created Time</span>
                            <span>{new Date(book.createdAt).toString()}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Updated Time</span>
                            <span>{new Date(book.updatedAt).toString()}</span>
                        </div>
                    </div>
                )
            }
        </div>
    );
};