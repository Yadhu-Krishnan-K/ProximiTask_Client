import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import instance from "../../helper/axiosInstance";
import { FaEye, FaEyeSlash, FaCamera, FaEdit } from "react-icons/fa";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { setUserData } from "../../redux/features/User/userSlice";
import ImgCropper from "../../helper/ImageCropper";
import "react-toastify/dist/ReactToastify.css";
import { signUpSchema } from "../../helper/schemas";
import showErrorPopup from "../../Common/ShowErrorPopup";

const SignUp = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      name: "",
      email: "",
      pass: "",
      conPass: "",
    },
    validationSchema:signUpSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("pass", values.pass);
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
            toast.error("Signup failed, try again.");
            console.error("Signup failed: unexpected response structure", res);
          }
        })
        .catch((error) => {
          console.error("Signup failed:", error);
          toast.error("Signup error. Please try again.");
        });
    },
    validateOnBlur: true,
    validateOnChange: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowError(true);
    formik.handleSubmit(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleGoogleLoginSuccess = (response) => {
    const { credential } = response;
    console.log('res = ',response,' cred = ',credential)

    instance.post("/users/google-login", { token: credential })
      .then((res) => {
        if (res?.data?.success) {
          let accessTokens = localStorage.getItem("accessTokens");
          let refreshToken = localStorage.getItem("refreshToken");

          if (accessTokens) {
            accessTokens = JSON.parse(accessTokens);
          } else {
            accessTokens = [];
          }
          accessTokens.push(res?.data?.accessToken);

          localStorage.setItem("userData", JSON.stringify(res?.data?.user));
          localStorage.setItem("accessTokens", JSON.stringify(accessTokens));
          if (!refreshToken) {
            localStorage.setItem("refreshToken", JSON.stringify(res?.data?.refreshToken));
          }

          dispatch(setUserData(res?.data?.user));
          nav("/");
        } else {
          toast.error("Google login failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Google Login error:", error);
        toast.error("Google login error. Please try again.");
      });
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      
      <div className="w-full min-h-screen bg-emerald-200 flex justify-center items-center p-4 overflow-y-auto">
         
        <div className="w-full max-w-md bg-[#F6FBF9] rounded-2xl shadow-lg p-8 my-8">
          <h1 className="text-2xl font-bold text-center mb-6">Create An Account</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name Input */}
            <div>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              )}
            </div>

            {/* Email Input */}
            <div>
              <input
                id="email"
                type="text"
                name="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                id="pass"
                type={showPassword ? "text" : "password"}
                name="pass"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                value={formik.values.pass}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                className="absolute right-2 top-2 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {formik.touched.pass && formik.errors.pass && (
                <div className="text-red-500 text-sm">{formik.errors.pass}</div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <input
                id="conPass"
                type={showConfirmPassword ? "text" : "password"}
                name="conPass"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                value={formik.values.conPass}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                className="absolute right-2 top-2 focus:outline-none"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {formik.touched.conPass && formik.errors.conPass && (
                <div className="text-red-500 text-sm">{formik.errors.conPass}</div>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700">
              Create Account
            </button>

            <div className="mt-4 text-center text-gray-600">or</div>

            {/* Google Login Button */}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => {
                  console.log("Login Failed");
                  toast.error("Google login failed.");
                }}
                text="signup_with"
                useOneTap
              />
            </div>
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
        </div>
      </div>
      
    </GoogleOAuthProvider>
  );
};

export default SignUp;

