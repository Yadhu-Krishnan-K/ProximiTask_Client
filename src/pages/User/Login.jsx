import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { json, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import instance from "../../helper/axiosInstance";
import { setUserData } from "../../features/User/userSlice";
// import {jwtDecode} from 'jwt-decode'

const Login = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [showError, setShowError] = useState(false);

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
      email: "",
      pass: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Invalid email address"
        )
        .matches(/^\S*$/, "Email must not contain spaces")
        .required("Email is required"),
      pass: Yup.string()
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
    onSubmit: (values) => {
      instance
        .post("/users/login", {
          email: values.email,
          pass: values.pass,
        })
        .then((res) => {
          if (res.data.success) {
            let accessTokens = localStorage.getItem('accessTokens') || []
            let refreshToken = localStorage.getItem('refreshToken')
            if(accessTokens){
              accessTokens = JSON.parse(accessTokens)
              accessTokens.push(res.data.accessToken)
            }

            localStorage.setItem("userData", JSON.stringify(res.data.user));
            localStorage.setItem('accessTokens', JSON.stringify(accessTokens));
            if(!refreshToken) localStorage.setItem('refreshToken', JSON.stringify(res.data.refreshToken));
            dispatch(setUserData(res.data.user));
            nav("/");
          }
        })
        .catch((error) => {
          setShowError(true);
        });
    },
    validateOnBlur: true,
    validateOnChange: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    formik.setTouched({
      email: true,
      pass: true,
    });

    if (formik.errors.email || formik.errors.pass) {
      setShowError(true);
    } else {
      formik.handleSubmit(e);
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    const { credential } = response;
    // console.log('response = ', response)
    // const decoded = jwtDecode(credential)
    // console.log(decoded)
    instance.post('/users/google-login', { token: credential })
      .then(res => {
        if (res.data.success) {
          // localStorage.setItem("userData", JSON.stringify(res.data.user));
          // localStorage.setItem('accessToken', res.data.accessToken);
          // localStorage.setItem('refreshToken', res.data.refreshToken);
          // dispatch(setUserData(res.data.user));
          // nav("/");
          let accessTokens = localStorage.getItem('accessTokens') || []
            let refreshToken = localStorage.getItem('refreshToken')
            if(accessTokens){
              accessTokens = JSON.parse(accessTokens)
              accessTokens.push(res.data.accessToken)
            }

            localStorage.setItem("userData", JSON.stringify(res.data.user));
            localStorage.setItem('accessTokens', JSON.stringify(accessTokens));
            if(!refreshToken) localStorage.setItem('refreshToken', JSON.stringify(res.data.refreshToken));
            dispatch(setUserData(res.data.user));
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
    <div className="w-full h-screen bg-emerald-200 flex justify-center items-center p-4">
      <ToastContainer />
      <div className="max-sm:w-full md:w-1/3 bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-8 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <input
              type="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && showError ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="pass"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Password"
              value={formik.values.pass}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.pass && formik.errors.pass && showError ? (
              <div className="text-red-500 text-sm">{formik.errors.pass}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?
          <span
            className="text-sky-400 underline cursor-pointer ml-1"
            onClick={() => nav("/UserSignUp")}
          >
            Sign Up
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

export default Login;