import React, { useEffect, useState } from "react";
import { FaUserCircle, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../utils/baseUrl";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [passwordHide, setPasswordHide] = useState(true);

  const navigate = useNavigate();

  const handleHide = () => {
    setPasswordHide((prev) => !prev);
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("username is  required!"),
    password: Yup.string().required("password is required"),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/admin/login`, values);
      if (res.data?.success) {
        localStorage.setItem("login_info", true);
        const { username } = res.data?.user_data;
        console.log(username);
        localStorage.setItem("username", username);
      }
      setLoading(false);
      toast.success("Logged In Successfully !");
      formik.resetForm();
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      const { data } = error.response;
      toast.error(data.message);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (localStorage.getItem("login_info")) {
      navigate("/");
    }
  }, [navigate]);

  if (!localStorage.getItem("login_info")) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-300 to-pink-300">
        <div className="px-5 py-10  bg-white rounded-md shadow-lg text-black">
          <h1 className="uppercase text-2xl md:text-3xl text-center font-semibold mb-4 md:mb-8 py-2 md:py-4 transform translate-y-[-60px] bg-white shadow-lg rounded-lg">
            Admin Login
          </h1>
          <form
            onSubmit={formik.handleSubmit}
            className="transform translate-y-[-50px]"
          >
            <div className="mb-4 text-xs">Sign in to Continue</div>
            <div className="w-full flex items-center gap-2 border border-gray-400 px-3 rounded-md min-h-10 mt-7">
              <FaUserCircle className="" />
              <input
                type="text"
                className="flex-1 h-full min-w-30 md:min-w-60 bg-transparent"
                placeholder="Enter username"
                value={formik.values.username}
                onChange={formik.handleChange("username")}
              />
            </div>
            {formik.errors.username && formik.touched.username ? (
              <div className="error">{formik.errors.username}</div>
            ) : (
              <></>
            )}
            <div className="w-full flex items-center gap-2 border border-gray-400 px-3 rounded-md min-h-10 mt-7">
              <FaKey className="" />
              <input
                type={passwordHide ? "password" : "text"}
                className="flex-1 h-full min-w-30  md:min-w-60  bg-transparent"
                placeholder="Enter Password"
                value={formik.values.password}
                onChange={formik.handleChange("password")}
              />
              {passwordHide ? (
                <FaEye className="cursor-pointer" onClick={handleHide} />
              ) : (
                <FaEyeSlash className="cursor-pointer" onClick={handleHide} />
              )}
            </div>
            {formik.errors.password && formik.touched.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : (
              <></>
            )}
            <div className="flex justify-center items-center mt-5">
              <button
                disabled={loading}
                type="submit"
                className="uppercase flex justify-center gap-1 items-center border px-3 py-1 rounded-md bg-gradient-to-r from-pink-200 to-orange-200 shadow-sm"
              >
                Sign Up{" "}
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  ""
                )}
              </button>
            </div>
          </form>
          <hr />
          <div className="mt-5">
            <p>
              Note:{" "}
              <span className="text-[0.7rem]">
                Default username : admin and password :admin
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default SignIn;
