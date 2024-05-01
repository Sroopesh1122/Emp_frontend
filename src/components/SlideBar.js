import React from "react";
import menuData from "../utils/MenuData.js";
import { useLocation, useNavigate } from "react-router-dom";
const SlideBar = ({ hide }) => {

  const navigate = useNavigate()

  const location = useLocation()

  const handleMenuClick = (path) => {
     navigate(path)
  };

  return (
    <ul
      className={hide ? "slideBar slideBar-hide" : "slideBar slideBar-active"}
    >
      {menuData.map((data) => (
        <li
          className={location.pathname === data.path ? 'menu-item menu-active' : 'menu-item'}
          onClick={() => handleMenuClick(data.path)}
        >
          {data.title}
        </li>
      ))}
    </ul>
  );
};

export default SlideBar;
