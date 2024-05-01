import React from "react";
import menuData from '../utils/MenuData'
import { useLocation, useNavigate } from "react-router-dom";

const TopMenu = () => {

  const navigate =useNavigate()

  const location = useLocation()

  const handleMenuClick = (path) =>{
    navigate(path)
  }

  return (
    <ul className="flex gap-3 md:hidden pl-3">
      {menuData.map((data) => (
        <li className={location.pathname === data.path ? 'top-menu-item top-menu-active': 'top-menu-item'} onClick={()=>handleMenuClick(data.path)}>{data.title}</li>
      ))}
    </ul>
  );
};

export default TopMenu;
