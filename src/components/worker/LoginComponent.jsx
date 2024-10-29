import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PiEyeBold } from "react-icons/pi";
import { PiEyeClosedBold } from "react-icons/pi";
import instance from "../../helper/axiosInstance";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setWorkerData } from "../../redux/features/Worker/workerSlice";

function LoginComponent({ onClose }) {
  const [showPass, setShowPass] = useState(false)
  const dispatch = useDispatch()
  const nav = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
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
      instance.post('/workers/signin', { email: values.email, password: values.password })
        .then((res) => {
          console.log('res = ', res)
          localStorage.setItem('workerData', JSON.stringify(res.data.worker))
          let accessTokens = JSON.parse(localStorage.getItem("accessTokens") || "[]");
          let refreshToken = localStorage.getItem("refreshToken");

          accessTokens.push(res.data.accessToken);

          localStorage.setItem("accessTokens", JSON.stringify(accessTokens));

          if (!refreshToken) {
            localStorage.setItem("refreshToken", JSON.stringify(res.data.refreshToken));
          }
          // nav('/AdminPanel');

          dispatch(setWorkerData(res.data.worker))
          nav('/worker/profile')
          resetForm()
        })
        .catch((error) => {
          console.log(error)
        })

    },
  });

  return (
    <div className="p-5 flex flex-col">
      <button onClick={onClose} className="self-end text-2xl">
        &times;
      </button>
      <h3 className="md:text-2xl lg:text-3xl mb-4">Log In</h3>
      <form onSubmit={formik.handleSubmit} className="flex flex-col" noValidate>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className={`mb-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${formik.touched.email && formik.errors.email
              ? "border-red-500 focus:ring-red-600"
              : "focus:ring-blue-600"
            }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null}

        <div
          className={`flex items-center mb-4 w-full px-3 py-2 border rounded-md focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600 ${formik.touched.password && formik.errors.password
              ? 'border-red-500 focus-within:border-red-600 focus-within:ring-red-600'
              : 'border-gray-300'
            }`}
        >
          <input
            type={showPass ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            className="flex-1 px-0 py-0 border-0 focus:outline-none"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <button
            type="button"
            className="ml-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => {
              setShowPass((prev) => !prev);
            }}
          >
            {showPass ? <PiEyeClosedBold /> : <PiEyeBold />}
          </button>
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        ) : null}

        <button
          type="submit"
          className="bg-[#3F7AEE] text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Log in
        </button>
      </form>
    </div>
  );
}

export default LoginComponent;
