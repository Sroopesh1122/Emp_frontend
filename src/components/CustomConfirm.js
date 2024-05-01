import axios from "axios";
import React, { useRef, useState } from "react";
import { baseUrl } from "../utils/baseUrl";
import toast from "react-hot-toast";

const CustomConfirm = ({id,refetch}) => {

    const ref= useRef()

    const [loading,setLoading] = useState(false)

    const handleClose= async()=>{
        try {
            setLoading(true)
            await axios.delete(`${baseUrl}/emp/delete/${id}`)
            refetch()
            setTimeout(() => {
                ref.current.click()
           }, 500);
        } catch (error) {
          const {data} = error.response
          toast.error(data?.message)
        }
        finally{
            setLoading(false)
        }
    }

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box bg-white shadow-lg text-black">
        <h3 className="font-bold text-lg">Confirm Delete</h3>
        <p className="py-4">You want to delete data of ID <span className="font-semibold">{id}</span> </p>
         <p>{loading ? <span className="loading loading-spinner loading-lg"></span>:""}</p>
        <div className="modal-action">
            <button className="btn" disabled={loading} onClick={handleClose}>Confirm</button>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button ref={ref} disabled={loading} className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CustomConfirm;
