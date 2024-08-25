import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import instance from '../../helper/axiosInstance';
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { setAdmin } from '../../redux/features/Admin/adminSlice';

const AdminLoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const AdminLogin = () => {
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: AdminLoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log('Form submitted with values:', values);
      try {
        const res = await instance.post('/admin/login', values);
        console.log('API response:', res);
        if (res.data.success) {
          localStorage.setItem('adminLogedIn', 'true');
          let accessTokens = JSON.parse(localStorage.getItem("accessTokens") || "[]");
          let refreshToken = localStorage.getItem("refreshToken");

          accessTokens.push(res.data.accessToken);

          localStorage.setItem("accessTokens", JSON.stringify(accessTokens));

          if (!refreshToken) {
            localStorage.setItem("refreshToken", JSON.stringify(res.data.refreshToken));
          }
          // nav('/AdminPanel');
          window.location.href = '/AdminPanel'
        }
      } catch (error) {
        console.error('Login error:', error);
        toast.error("Login failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  function handleSubmit(e){
    e.preventDefault(); // Prevent the form from refreshing the page
    formik.setTouched({
      email: true,
      password: true,
    });

    if (formik.errors.email || formik.errors.password) {
      setShowError(true);
    } else {
      formik.handleSubmit(e);
    }
  }

  return (
    <div className="bg-emerald-200 min-h-screen flex items-center justify-center p-4">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <div className="text-emerald-400 text-2xl font-bold mb-6">ProximiTask</div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="mb-6">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            ) : null}
          </div>

          <button 
            type="submit" 
            disabled={formik.isSubmitting}
            className="w-full bg-emerald-400 text-white py-3 rounded-md hover:bg-emerald-500 transition duration-300 disabled:opacity-50"
          >
            {formik.isSubmitting ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>
        <a href="#" className="block text-center mt-4 text-emerald-400 hover:underline">
          Forgot password?
        </a>
      </div>
    </div>
  );
};

export default AdminLogin;