import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import ImgCropper from "../../helper/ImageCropper";

import "react-toastify/dist/ReactToastify.css";
import LoginComponent from "../../components/worker/LoginComponent";
import CreateAccountForm from "../../components/worker/SignUpCredentials";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";

const WSignUp = () => {
  const location = useLocation()
  const [successMessage, setSuccessMessage] = useState(location.state?.message)
  console.log('success = ',successMessage)
  const fileRef = useRef(null)
  const passRef = useRef(null)
  const [showPass, setShowPass] = useState(false)
  const [originalImg, setOriginalImg] = useState(null)
  const [croppedImg, setCroppedImg] = useState(null)
  const [cropped, setCropped] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [visibleErrors, setVisibleErrors] = useState({});
  const [showCropper, setShowCropper] = useState(false);
  const [formData, setFormData] = useState({
    originalImg: "",
    croppedImg: "",
    fullName: "",
    email: "",
    password: ""
  });
  useEffect(() => {
    if (successMessage) {
      
      setTimeout(() => {
        setSuccessMessage(undefined)
      }, 7000)
    }
  }, [successMessage])

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };

  const form = useFormik({
    initialValues: {
      originalImg: "",
      croppedImg: "",
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      originalImg: Yup.mixed()
        .required('Profile image required'),
      croppedImg: Yup.mixed()
        .required('Profile image required'),
      fullName: Yup.string()
        .matches(
          /[A-Za-z]/,
          "Name must contain at least one alphabetic character"
        )
        .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces")
        .required("Name is required"),
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Invalid email address"
        )
        .matches(/^\S*$/, "Email must not contain spaces")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(
          /[@$!%*?&]/,
          "Password must contain at least one special character"
        )
        .matches(/^\S*$/, "Password must not contain spaces")
        .required("Password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Form values:", values);
      setFormData(values);
      resetForm();
      openPopup();
    },
    validateOnBlur: true,
    validateOnChange: true,
  });

  useEffect(() => {
    if (Object.keys(form.errors).length > 0) {
      const touchedErrors = Object.keys(form.errors).reduce((acc, field) => {
        if (form.touched[field]) {
          acc[field] = form.errors[field];
        }
        return acc;
      }, {});

      setVisibleErrors(touchedErrors);

      const timer = setTimeout(() => {
        setVisibleErrors({});
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [form.errors, form.touched]);

  const notifySuccess = () => {
    toast.success("Your form is submitted, please wait until admin approves.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
       

      {(originalImg && !cropped)
        ? (<ImgCropper
          imageURL={URL.createObjectURL(originalImg)}
          cropInit={{ x: 0, y: 0 }}
          zoomInit={1}
          setImage={setOriginalImg}
          setCropped={setCropped}
          setCroppedFile={(croppedImage) => {
            setCroppedImg(croppedImage);
            form.setFieldValue("croppedImg", croppedImage);
            console.log("Cropped Image Set: ", croppedImage);
            setShowCropper(false)
          }}
        />)
        : (<div className="flex w-full h-screen relative">
          {successMessage && (
            <div className="w-auto max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 fixed top-0 right-0">
              <div className="text-green-600 text-center mb-4">
                {successMessage}
              </div>
            </div>
          )}
          {/* Background Section */}
          <div
            className="hidden md:flex md:w-1/2 bg-cover"
            style={{ backgroundImage: "url('/Polygon 1.png')" }}
          >
            <div className="w-full h-full flex p-8">
              <div>
                <h2 className="text-white text-3xl font-bold mb-2">PROXIMITASK</h2>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <h1 className="text-2xl font-bold mb-6">Create Account</h1>
              <form onSubmit={form.handleSubmit} noValidate >
                <div className="flex flex-col w-full h-20 items-center mb-4">
                  {(cropped && croppedImg) ? (
                    <img
                      src={URL.createObjectURL(croppedImg)}
                      alt="img"
                      width={70}
                      className="border rounded-full cursor-pointer"
                      onClick={() => {
                        setShowCropper(true); // Show cropper again when clicked
                      }}
                    />
                  ) : (
                    <label htmlFor="img">
                      <FaRegUserCircle size={70} className="cursor-pointer" />
                    </label>
                  )}

                  <input
                    type="file"
                    ref={fileRef}
                    name="originalImg"
                    id="img"
                    className="hidden"
                    onChange={(e) => {
                      // form.setFieldValue('originalImg', e.target.files[0])
                      // setOriginalImg(e.target.files[0])
                      // console.log(originalImg)
                      const file = e.target.files[0];
                      if (file) {
                        form.setFieldValue('originalImg', file);
                        setOriginalImg(file);
                        form.setFieldTouched('originalImg', true);  // Add this line
                      }
                    }}
                  />
                  {form.touched.originalImg && form.errors.originalImg && (
                    <div className="text-red-500 text-sm mt-1">
                      {form.errors.originalImg}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    value={form.values.fullName}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  {form.touched.fullName && visibleErrors.fullName && (
                    <div className="text-red-500 text-sm mt-1">
                      {visibleErrors.fullName}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={form.values.email}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  {form.touched.email && visibleErrors.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {visibleErrors.email}
                    </div>
                  )}
                </div>
                <div className="mb-6 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 flex justify-between">
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    ref={passRef}
                    placeholder="Password"
                    value={form.values.password}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className="w-full px-3 py-2  focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((prev) => !prev)} // Toggle password visibility
                    className="flex items-center justify-center p-2"
                  >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {form.touched.password && visibleErrors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {visibleErrors.password}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300"
                >
                  Create Account
                </button>
              </form>
              <p className="mt-4 text-sm text-center">
                Already have an account?{" "}
                <span
                  className="text-purple-600 hover:underline cursor-pointer"
                  onClick={toggleLoginPopup}
                >
                  Log In
                </span>
              </p>
            </div>
          </div>

          {/* Login Popup */}
          {showLoginPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <LoginComponent onClose={toggleLoginPopup} />
              </div>
            </div>
          )}

          {/* Create Account Popup */}
          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg">
                <div className="flex justify-end p-2">
                  <button
                    onClick={closePopup}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <IoMdCloseCircleOutline />
                  </button>
                </div>
                <CreateAccountForm
                  setOriginalImg={setOriginalImg}
                  setCroppedImg={setCroppedImg}
                  setCropped={setCropped}
                  onClose={closePopup}
                  onSuccess={notifySuccess}
                  data={formData}
                />
              </div>
            </div>
          )}
        </div>)
      }
    </>
  );
};

export default WSignUp;
