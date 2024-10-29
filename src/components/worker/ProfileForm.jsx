import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import instance from '../../helper/axiosInstance';
import { setWorkerData } from '../../redux/features/Worker/workerSlice';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/[A-Za-z]/, "Name must contain at least one alphabetic character")
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
    category: Yup.string().required('Category is required'),
  });
  
  const ProfileForm = () => {
  const worker = useSelector((state) => state.workerReducer.workerData);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocations();
    getCategories();
  }, []);

  const getLocations = async () => {
    try {
      const res = await instance.get("/location");
      setLocations(res.data.placeData);
    } catch (error) {
      console.log('Error fetching locations:', error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await instance.get("/category");
      setCategories(res.data.cateList);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  
  const initialValues = {
    name: worker.name || '',
    category: worker.category || '',
    email: worker.email || '',
    phoneNumber: worker.phoneNumber || '',
    location: worker.area || '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await instance.put(`/workers/worker/${worker._id}`, values);
      if (response.status === 200) {
        dispatch(setWorkerData(response.data.data));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 w-full">
      <div className="w-full max-w-2xl mx-4">
        <div className="bg-white rounded-lg shadow-lg">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values }) => (
              <Form className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Name
                    </label>
                    <Field
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      name="name"
                      type="text"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Email
                    </label>
                    <Field
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      name="email"
                      type="email"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Phone Number Field */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Phone Number
                    </label>
                    <Field
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      name="phoneNumber"
                      type="text"
                    />
                    <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Category Field */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Category
                    </label>
                    <Field
                      as="select"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
                      name="category"
                      value={worker.category_id}
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </Field>
                    {/* <div className="mt-1">
                      {values.category && (
                        <span className="text-gray-600">
                          Selected: {categories.find(cat => cat._id === values.category)?.categoryName}
                        </span>
                      )}
                    </div> */}
                    <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Location Field */}
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Location
                    </label>
                    <Field
                      as="select"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
                      name="location"
                      value={worker.area}
                    >
                      <option value="">Select location</option>
                      {locations.map((location) => (
                        <option key={location._id} value={location.name}>
                          {location.name}
                        </option>
                      ))}
                    </Field>
                    {/* <div className="mt-1">
                      {values.location && (
                        <span className="text-gray-600">
                          Selected: {values.location}
                        </span>
                      )}
                    </div> */}
                    <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-cyan-500 text-white font-semibold rounded-lg 
                             hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 
                             disabled:opacity-50 transition-all duration-200"
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
