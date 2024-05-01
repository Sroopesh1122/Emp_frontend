import React, { useEffect, useState } from "react";
import DashHeader from "../components/DashHeader";
import SlideBar from "../components/SlideBar";
import TopMenu from "../components/TopMenu";
import SlideButton from "../components/SlideButton";
import {Outlet, useNavigate} from 'react-router-dom'



const Dashboard = () => {
  const [hide, setHide] = useState(false);

  const naviget =useNavigate()

  useEffect(()=>{
    if(!localStorage.getItem('login_info')){
       naviget("/signin");
    }
  },[naviget])
  
  if(localStorage.getItem('login_info') && localStorage.getItem('username'))
  {
    return (
      <div className="h-screen w-screen flex flex-col gap-4 bg-gradient-to-r from-orange-200 to-pink-200 p-4">
        <DashHeader />
        <div className="flex-1 bg-white max-h-[90%] overflow-auto  shadow-xl p-2 md:p-5 ">
          <div className="relative w-full h-full md:overflow-hidden md:p-3">
            <SlideBar hide={hide} />
            <main className={hide ? "main main-full" : "main main-active "}>
              <div className="main-header w-full overflow-clip">
                <SlideButton setHide={setHide} hide={hide} />
                <TopMenu />
              </div>
              <div className="w-full h-[75vh] overflow-auto p-2 mt-3">
                 <Outlet/>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  
};

export default Dashboard;
