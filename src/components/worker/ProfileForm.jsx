import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import instance from '../../helper/axiosInstance';

const validationSchema = Yup.object().shape({
  name: Yup.string()
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
  phoneNumber: Yup.string()
  .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  location: Yup.string().required('Location is required'),
});

const ProfileForm = () => {
  const [categories, setCategories] = useState([]);

  useEffect(()=>{

    getChatergories()

  },[])

  const getChatergories = async () => {
    try {
      const res = await instance.get("/category");
      setCategories(res.data.cateList);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const dispatcch = useDispatch()
  const worker = useSelector((state)=>state.workerReducer.workerData)
  const initialValues = {
    name:worker.name,
    category: worker.category,
    email: worker.email,
    phoneNumber: worker.phoneNumber,
    location: worker.area,
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission here
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mt-10 mb-4">
          {['name', 'email', 'category', 'phoneNumber', 'location'].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={field}
                name={field}
                type={field === 'email' ? 'email' : field === 'phoneNumber' ? 'tel' : 'text'}
              />
              <ErrorMessage name={field} component="div" className="text-red-500 text-xs italic" />
            </div>
          ))}
          
          <div className="flex items-center justify-between mt-6">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isSubmitting}
            >
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ProfileForm;