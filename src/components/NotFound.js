import React from 'react'
import img from '../images/4not-found.avif'
const NotFound = () => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-white'>
       <div className='w-[70%] h-[60%] m-auto object-cover'>
        <img src={img} className='w-full h-full' alt="not-found" />
       </div>
    </div>
  )
}

export default NotFound
