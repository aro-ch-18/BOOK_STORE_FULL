import React from 'react';
import backgroundImage from '../assets/404.jpg'; // Importing the image

export const NotFound = () => {
  return (
    <div
      className="min-h-[82vh]  bg-no-repeat bg-center flex justify-center items-center"
      // style={{ backgroundImage: `url(${backgroundImage})` }} // Inline style for background image
    >
            <h1 className='m-14 text-4xl'><span className='font-bold'>404!</span> Page Not Found<span className='text-5xl'>☹️</span></h1>
      
    </div>
  );
}
