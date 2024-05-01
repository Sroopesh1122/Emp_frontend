import React from 'react'
import Profile from './Profile'
import logo from '../images/logo.jpg'

const DashHeader = () => {
  return (
    <div className="flex justify-between px-4 bg-white shadow-md rounded-md ">
    <img
      src={logo}
      alt="logo"
      className="h-7 w-7 md:h-20 md:w-20 rounded-full"
    />
    <Profile/>
  </div>
  )
}

export default DashHeader
