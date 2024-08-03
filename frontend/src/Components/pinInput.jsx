import React, { useEffect, useRef } from 'react'
import { useState } from 'react';

export const PinInput = ({length,pinSubmit}) => {
    const [pin, setPin] = useState(new Array(length).fill(""));
    const inputRefs=useRef([]);
    
    useEffect(()=>{
        if(inputRefs.current[0]){
            inputRefs.current[0].focus();
        }
    },[])
    const changeHandler=(index,e)=>{
        const v = e.target.value;

        // Check if value is not a number
        if (isNaN(v)) {
          alert("Enter a number");
          return;
        }
        const value=v;
     
        console.log(value);
        const newPin=[...pin]
        newPin[index]=value.substring(value.length-1)
        setPin(newPin);
        const combPin=newPin.join("");
        if(combPin.length==length){
            pinSubmit(combPin);

        }
        if(value&&index<length-1 &&inputRefs.current[index+1]){
            inputRefs.current[index+1].focus();
        }

        
    }
    const handleClick=(index)=>{
        inputRefs.current[index].setSelectionRange(1,1)

    }
    const handleKeyDown=(index,e)=>{
        if(e.key==="Backspace"&&index>0&&inputRefs.current[index-1]){
            inputRefs.current[index-1].focus();
        }
    }

  return (
    <div className='flex justify-center items-center p-4 border   h-80   rounded-lg shadow-lg w-80 bg-white  '>
        <div>
        <div className=' flex items-center justify-center'>
        <h1 className=' '>Enter the OTP sent to your email:</h1>

        </div>
       <div className=' flex items-center justify-center pt-6'>
       {

pin.map((value,index)=>{
    return (
        <input
        className={`border border-black w-10 h-10 px-3 py-2 ${index!=0&&'border-l-0'}`}
        key={index}
        type="text"
        value={value}  // Uncomment this if you want to bind a value from props or state
        placeholder="0"
        onChange={(e)=>changeHandler(index,e)}
        onClick={()=>handleClick(index)}
        onKeyDown={(e)=>handleKeyDown(index,e)}
        ref={(input) => (inputRefs.current[index] = input)}
      />
      

        
    )
})
}

       </div>

        </div>
       
     
      

    </div>
  )
}
