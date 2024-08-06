import React from "react";
import axios from "axios";
import { Spinner } from "../Components/Spinner";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { BookTable } from "../Components/Home/BookTable";
import { BookCard } from "../Components/Home/BookCard";

export const Home = () => {
  const [showType, setShowType] = useState("table");
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  // The below code is added to ensure if a particular showType is selected then, on refreshing also the showType data will not change
  const updateData = (newValue) => {
    // Save the data to local storage
    localStorage.setItem('myData', newValue);
  };

  useEffect(() => {
    const showTypeData = localStorage.getItem('myData');
    if (showTypeData) {
      setShowType(showTypeData);
    }

    const token = localStorage.getItem('token');
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/book/getBook`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setBooks(response.data.books);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 min-h-[82vh]">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded lg"
          onClick={() => {
            setShowType("table");
            updateData("table");
          }}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded lg"
          onClick={() => {
            setShowType("card");
            updateData("card");
          }}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8 ">Book List</h1>
        <Link to="/book/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? <Spinner /> : showType === "table" ? (<BookTable books={books} />) : (<BookCard books={books} />)}
    </div>
  );
};