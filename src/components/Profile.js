import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [hide, setHide] = useState(true);

  const navigate = useNavigate()

  const handleHide =()=>{
    setHide((prev)=>!prev)
  }

  const handleLogout = () =>{
    localStorage.removeItem('login_info')
    localStorage.removeItem('username')

    setTimeout(()=>{
      toast.success("Logged Out succesfully!")
      navigate("/signin")
    },500)
  } 


  return (
    <div className="flex justify-center items-center gap-4 relative">
      <span className="text-black  text-xs md:text-sm max-w-28 overflow-hidden text-ellipsis capitalize">
        {localStorage.getItem('login_info') ? localStorage.getItem('username'):'unknown'}
      </span>
      <div className="avatar cursor-pointer" onClick={handleHide}>
        <div className="w-4 h-4 md:w-10 md:h-10 rounded-full ring ring-slate-500 ring-offset-base-100 ring-offset-2">
          <img
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt="profile"
          />
        </div>
      </div>
      {!hide ? (
        <ul className="absolute top-[calc(100%+5px)] bg-white shadow-xl w-full border z-50">
          <li className="w-full text-black text-xs md:text-sm  pl-2 cursor-pointer border-b p-2 mb-1 hover:bg-orange-50" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Profile;
