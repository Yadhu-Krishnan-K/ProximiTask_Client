import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";
import instance from "../../helper/axiosInstance";
import { FaEye, FaEyeSlash, FaCamera, FaEdit } from "react-icons/fa";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { setUserData } from "../../redux/features/User/userSlice";
import ImgCropper from "../../helper/ImageCropper";


const SignUp = () => {
  const nav = useNavigate();
  const userData = useSelector((state) => state.userReducer.userData);
  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [original, setOriginal] = useState(''); // Image URL for cropping
  const [croppedImage, setCroppedImage] = useState(''); // Final cropped image URL
  const [cropped, setCropped] = useState(false); // Whether cropping is done
  const [originalFile, setOriginalFile] = useState(null); // Store original image file
  const [croppedFile, setCroppedFile] = useState(null); // Store cropped image file
  const fileInputRef = useRef(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;


  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  const formik = useFormik({
    initialValues: {
      userImg: null,
      name: "",
      email: "",
      pass: "",
      conPass: "",
    },
    validationSchema: Yup.object({
      userImg: Yup.mixed().required("Profile image is required"),
      name: Yup.string()
        .matches(/[A-Za-z]/, "Name must contain at least one alphabetic character")
        .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces")
        .required("Name is required"),
      email: Yup.string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address")
        .matches(/^\S*$/, "Email must not contain spaces")
        .required("Email is required"),
      pass: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character")
        .matches(/^\S*$/, "Password must not contain spaces")
        .required("Password is required"),
      conPass: Yup.string()
        .oneOf([Yup.ref("pass"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("pass", values.pass);
      formData.append("userImg", values.userImg);

      instance
        .post("/users/initiateSignup", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res?.data?.success) {
            nav("/user/Otp");
          } else {
            console.error("Signup failed: unexpected response structure", res);
          }
        })
        .catch((error) => {
          console.error("Signup failed:", error);
        });
    },
    validateOnBlur: true,
    validateOnChange: true,
  });

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setOriginal(fileUrl); // Set image for cropping
      setOriginalFile(file); // Store original file
      setCropped(false); // Reset cropped state
    }
  };

  const handleImageEdit = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.setTouched({
      userImg: true,
      name: true,
      email: true,
      pass: true,
      conPass: true,
    });
    setShowError(true);
    formik.handleSubmit(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  useEffect(()=>{
    console.log('cropped file = ',croppedFile)
    // const fileUrl = URL.createObjectURL(croppedFile)
    // setCropped(fileUrl)
  },[cropped])
  const handleGoogleLoginSuccess = (response) => {
    const { credential } = response;

    instance.post('/users/google-login', { token: credential })
      .then(res => {
        if (res?.data?.success) {
          console.log('res.data = ',res?.data)

            let accessTokens = localStorage.getItem('accessTokens')
            let refreshToken = localStorage.getItem('refreshToken')
            if(accessTokens){
              accessTokens = JSON.parse(accessTokens)
            }else{
              accessTokens = []
            }
            accessTokens.push(res?.data?.accessToken)

            localStorage.setItem("userData", JSON.stringify(res?.data?.user));
            localStorage.setItem('accessTokens', JSON.stringify(accessTokens));
            if(!refreshToken) localStorage.setItem('refreshToken', JSON.stringify(res?.data?.refreshToken));
            dispatch(setUserData(res?.data?.user));
            nav("/");
        }
      })
      .catch(error => {
        console.error("Google Login error:", error);
        setShowError(true);
      });
  };


  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="w-full min-h-screen bg-emerald-200 flex justify-center items-center p-4 overflow-y-auto">
        <ToastContainer />
        <div className="w-full max-w-md bg-[#F6FBF9] rounded-2xl shadow-lg p-8 my-8">
          <h1 className="text-2xl font-bold text-center mb-6">Create An Account</h1>
          
          {!cropped && original && (
            // <div className="w-full h-full bg-white">
              <ImgCropper
                imageURL={original}
                setImage={setCroppedImage} // Set cropped image URL
                setCropped={setCropped} // Mark cropping as done
                setCroppedFile={setCroppedFile} // Store cropped file
              />
            // </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center mb-4">
              <div className="relative mb-4">
                {cropped ? (
                  <img
                    src={croppedFile}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover"
                    onClick={() => {
                      setOriginal(croppedImage);
                      setCropped(false);
                    }}
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                    <FaCamera size={32} color="#9CA3AF" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleImageEdit}
                  className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md"
                >
                  <FaEdit size={16} color="#4B5563" />
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                name="userImg"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {formik.touched.userImg && formik.errors.userImg && showError && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.userImg}</div>
              )}
            </div>
            <div>
              <input
                type="text"
                name="name"
                className="w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && showError && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                className="w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && showError && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="pass"
                className="w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
                placeholder="Password"
                value={formik.values.pass}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {formik.touched.pass && formik.errors.pass && showError && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.pass}</div>
              )}
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="conPass"
                className="w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
                placeholder="Confirm Password"
                value={formik.values.conPass}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-3"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {formik.touched.conPass && formik.errors.conPass && showError && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.conPass}</div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-[#84C7AE] text-white py-3 rounded-md mt-6 hover:bg-emerald-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <span
              className="text-sky-400 underline cursor-pointer"
              onClick={() => nav("/user/login")}
            >
              Sign In
            </span>
          </p>
          <p className="text-center mt-2">or</p>
          <div className="w-full flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => console.error('Google Login Failed')}
            buttonText="Login with Google"
            className=" bg-white text-gray-700 py-3 px-4 rounded-md mt-2 border border-gray-300 hover:bg-gray-100 transition duration-300 flex items-center justify-center cursor-pointer"
          />
        </div>
        </div>
      </div>
    </GoogleOAuthProvider>

  );
};

export default SignUp;