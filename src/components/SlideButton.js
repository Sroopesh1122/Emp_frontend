import React from 'react'
import { FaArrowAltCircleRight} from "react-icons/fa";

const SlideButton = ({setHide ,hide}) => {
  return (
    <button
    className="hidden md:block"
    onClick={() => {
      setHide((prev) => !prev);
    }}
  >
      <FaArrowAltCircleRight className={hide ? 'back ':'back back-left'}/>
    
  </button>
  )
}

export default SlideButton
