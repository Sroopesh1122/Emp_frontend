import React, { useState } from "react";
import { CiUser, CiMail, CiMobile3 } from "react-icons/ci";
import { PiUserList } from "react-icons/pi";
import { FaTransgender, FaUserGraduate } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { baseUrl, courseData, designationData } from "../../utils/baseUrl";
import toast from "react-hot-toast";

const CreateEmp = () => {
  const [filePath, setFilePath] = useState("");

  const [uploadPercentage, setUploadPercentage] = useState(0);

  const [uploadLoading, setUploadLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    designation: Yup.string().required("Required !"),
    gender: Yup.string().required("Required !"),
    course: Yup.array()
      .of(Yup.string().required("Required"))
      .min(1, "At least one email is required"),
    profile: Yup.string().required("Required !"),
  });

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    profile: "",
  };

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      await axios.post(`${baseUrl}/emp/create`, values);
      setLoading(false);
      toast.success("Created Successfully !");
      formik.resetForm()
      setFilePath("");
      uploadPercentage(0);
      setUploadLoading(false);
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

  const handleFileChange = async (event) => {
    setFilePath("");
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const formData = new FormData();
      formData.append("images", file);
      try {
        setUploadLoading(true);
        const res = await axios.post(`${baseUrl}/emp/images/upload`, formData, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadPercentage(percentCompleted);
          },
        });
        formik.setValues({ ...formik.values, profile: res.data });
        console.log(res.data);
        setFilePath(res.data);
      } catch (error) {
        const { data } = error.response;
        toast.error(data.message);
      } finally {
        setUploadLoading(false);
      }
    } else {
      setFilePath("");
      alert("Please select a JPEG or PNG image file!");
    }
  };

  const handleDesignation = (e) => {
    formik.setValues({ ...formik.values, designation: e.target.value });
  };

  const handleGender = (e) => {
    formik.setValues({ ...formik.values, gender: e.target.value });
  };

  const handleCourse = (e) => {
    if (formik.values.course.includes(e.target.value)) {
      const temp = formik.values.course;
      formik.setValues({
        ...formik.values,
        course: temp.filter((data) => data !== e.target.value),
      });
    } else {
      formik.setValues({
        ...formik.values,
        course: [...formik.values.course, e.target.value],
      });
    }
  };

  return (
    <>
      <div className="w-full min-h-full  p-1 flex flex-col">
        <h1 className="text-xl md:text-2xl text-black font-semibold">
          Create Employee
        </h1>
        <form
          className=" flex flex-col md:flex-row flex-1 text-black"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex justify-center items-center w-full md:w-[50%] p-0 sm:p-1 md:p-5">
            <div className="w-[70%]">
              <div className="w-full flex items-center justify-center gap-2 bg-white p-1 border border-black rounded-md">
                <CiUser className="h-5 w-5" />
                <input
                  type="text"
                  className="bg-transparent flex-1"
                  placeholder="Employee Name"
                  onChange={formik.handleChange("name")}
                  value={formik.values.name}
                />
              </div>
              {formik.errors.name && formik.touched.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : (
                <></>
              )}
              <div className="w-full flex items-center justify-center gap-2 bg-white p-1 border border-black rounded-md mt-10">
                <CiMail className="h-5 w-5" />
                <input
                  type="email"
                  className="bg-transparent flex-1"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                />
              </div>
              {formik.errors.email && formik.touched.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : (
                <></>
              )}
              <div className="w-full flex items-center justify-center gap-2 bg-white p-1 border border-black rounded-md mt-10">
                <CiMobile3 className="h-5 w-5" />
                <input
                  type="text"
                  className="bg-transparent flex-1"
                  placeholder="Phone"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                />
              </div>
              {formik.errors.mobile && formik.touched.mobile ? (
                <div className="error">{formik.errors.mobile}</div>
              ) : (
                <></>
              )}
              <div className="w-full flex items-center justify-center gap-2 bg-white p-1 border border-black rounded-md mt-10">
                <PiUserList className="h-5 w-5" />
                <select
                  className="bg-transparent flex-1 outline-none"
                  placeholder="sr"
                  onChange={handleDesignation}
                >
                  <option value="" disabled selected hidden>
                    Designation
                  </option>
                  {designationData.map((data) => (
                    <option
                      className="uppercase"
                      value={data}
                      selected={data === formik.values.designation}
                    >
                      {data}
                    </option>
                  ))}
                </select>
              </div>
              {formik.errors.designation && formik.touched.designation ? (
                <div className="error">{formik.errors.designation}</div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className=" w-full md:w-[50%] border-s flex justify-center items-center border-gray-200 p-0 sm:p-1 md:p-5">
            <div className="w-[70%]">
              <div className="w-full flex items-center justify-center gap-2 mt-10 border border-black p-1 rounded-md">
                <div className="flex gap-1 items-center justify-center">
                  <span>Gender</span>
                  <FaTransgender /> {" :"}
                </div>
                <div className="flex-1 flex items-center justify-evenly">
                  <div className="flex items-center gap-2">
                    <span>Male</span>
                    <input
                      type="radio"
                      value={"male"}
                      onChange={handleGender}
                      checked={formik.values.gender === "male"}
                      className="bg-orange-500"
                      id="gender"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Female</span>
                    <input
                      type="radio"
                      value={"female"}
                      onChange={handleGender}
                      checked={formik.values.gender === "female"}
                      className="bg-orange-500"
                      id="gender"
                    />
                  </div>
                </div>
              </div>

              {formik.errors.gender && formik.touched.gender ? (
                <div className="error">{formik.errors.gender}</div>
              ) : (
                <></>
              )}

              <div className="w-full flex items-center justify-center gap-2 bg-white p-1 border border-black rounded-md mt-10">
                <div className="flex items-center justify-center gap-1">
                  <span>Course </span>
                  <FaUserGraduate className="h-5 w-5" />
                </div>
                <div className="flex-1 flex justify-center items-center gap-2">
                  {courseData.map((data) => (
                    <>
                      <div className="flex items-center gap-1 justify-center">
                        <span className="uppercase">{data}</span>
                        <input
                          type="checkbox"
                          value={data}
                          checked={formik.values.course.includes(data)}
                          onChange={handleCourse}
                          className="bg-transparent"
                        />
                      </div>
                    </>
                  ))}
                </div>
              </div>
              {formik.errors.course && formik.touched.course ? (
                <div className="error">{formik.errors.course}</div>
              ) : (
                <></>
              )}
              <div className="w-full p-1 border border-black rounded-md mt-10 ">
                <input
                  type="file"
                  className="w-full max-w-xs  bg-transparent"
                  onChange={handleFileChange}
                />
              </div>
              {formik.errors.profile && formik.touched.profile ? (
                <div className="error">{formik.errors.profile}</div>
              ) : (
                <></>
              )}
              {uploadPercentage !== 0 && (
                <progress
                  className="progress progress-info w-full mt-1"
                  value={uploadPercentage}
                  max="100"
                ></progress>
              )}
              {uploadLoading ? (
                <span className="loading loading-ring loading-lg"></span>
              ) : (
                <></>
              )}
              {filePath && (
                <div className="w-full flex justify-start pl-3 mt-3">
                  <div className="w-20 h-20 object-cover ">
                    {formik.values.profile !== "" && (
                      <img
                        src={filePath}
                        className="h-full w-full object-cover "
                        alt="profile"
                      />
                    )}
                  </div>
                </div>
              )}
              <div className="flex items-center justify-center mt-11">
                <button
                  type="submit"
                  disabled={loading || uploadLoading}
                  // onClick={()=>{alert(JSON.stringify(formik.values))}}
                  className="p-2 px-5 rounded-lg bg-orange-600 border-transparent text-white"
                >
                  Create{" "}
                  {loading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <></>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateEmp;
