import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import instance from "../../helper/axiosInstance";
import { ToastContainer } from "react-toastify";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  area: Yup.string().required("Area is required"),
  category: Yup.string().required("Category is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  idType: Yup.string().required("ID type is required"),
  idNumber: Yup.string()
    .matches(/^\d+$/, "ID number must contain only digits and no spaces or special characters")
    .required("ID number is required"),
  isSoleProprietor: Yup.boolean(),
  agreeTerms: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions"
  ),
});

function CreateAccountForm({ setOriginalImg, setCroppedImg, setCropped, onClose, onSuccess, data }) {
  const [showErrors, setShowErrors] = useState({});
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  // Timeout to hide errors
  useEffect(() => {
    const timers = Object.keys(showErrors).map((field) =>
      setTimeout(() => {
        setShowErrors((prev) => ({ ...prev, [field]: false }));
      }, 3000)
    );
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [showErrors]);

  // Fetch categories and locations
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await instance.get("/category");
        console.log('res from signupcredenials ==== ',res);
        setCategories([...res.data.cateList]);
        console.log('categories from signupcredenials ==== ',categories);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    const getLocations = async () => {
      try {
        const res = await instance.get('/location');
        if (res.data.success) {
          setLocations([...res.data.placeData]);
        }
      } catch (error) {
        console.error("Failed to fetch locations", error);
      }
    };

    getCategory();
    getLocations();
  }, []);

  const initialValues = {
    area: "",
    lat: null,
    long: null,
    category: "",
    phone: "",
    idType: "",
    idNumber: "",
    isSoleProprietor: false,
    agreeTerms: false,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = {
        ...data,
        area: values.area,
        category: values.category,
        lat: values.lat,
        long: values.long,
        phone: values.phone,
        idType: values.idType,
        idNumber: values.idNumber,
        isSoleProprietor: values.isSoleProprietor,
        agreeTerms: values.agreeTerms,
      };

      const response = await instance.post("/workers/signup", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 201) {
        console.log("Signup successful:", response.data);
        onSuccess();
        onClose();
      } else {
        console.error("Signup failed:", response.data);
      }
    } catch (error) {
      console.error("An error occurred during signup:", error);
    } finally {
      setCropped(false);
      setOriginalImg(null);
      setCroppedImg(null);
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldTouched, values, isValid, setFieldValue }) => {
          // Check if all required fields are filled
          useEffect(() => {
            const requiredFields = ["area", "category", "phone", "idType", "idNumber"];
            const allFieldsFilled = requiredFields.every((field) => values[field] !== "");
            setIsFormFilled(allFieldsFilled && values.agreeTerms);
          }, [values]);

          // Handle area change to set lat and long
          const handleAreaChange = (event) => {
            const selectedArea = event.target.value;
            const selectedLocation = locations.find(location => location.name === selectedArea);

            if (selectedLocation) {
              setFieldValue('area', selectedArea);
              setFieldValue('lat', selectedLocation.lat);
              setFieldValue('long', selectedLocation.lng);
            }
          };

          return (
            <Form className="space-y-4" noValidate>
              <ToastContainer />

              {/* Area Selection */}
              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                  Available Area
                </label>
                <Field
                  as="select"
                  id="area"
                  name="area"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleAreaChange}
                  value={values.area}
                >
                  <option value="">Select Area</option>
                  {locations.map((location) => (
                    <option key={location._id} value={location.name}>
                      {location.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="area" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Category Selection */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <Field
                  as="select"
                  id="category"
                  name="category"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={values.category}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Phone Input */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* ID Type Input */}
              <div>
                <label htmlFor="idType" className="block text-sm font-medium text-gray-700 mb-1">
                  ID Type
                </label>
                <Field
                  as="select"
                  id="idType"
                  name="idType"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select ID Type</option>
                  <option value="Aadhaar">Aadhaar</option>
                  <option value="PAN">PAN</option>
                </Field>
                <ErrorMessage name="idType" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* ID Number Input */}
              <div>
                <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  ID Number
                </label>
                <Field
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ErrorMessage name="idNumber" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Sole Proprietor Checkbox */}
              <div>
                <label className="flex items-center">
                  <Field type="checkbox" name="isSoleProprietor" className="mr-2" />
                  <span className="text-sm text-gray-700">Are you a sole proprietor?</span>
                </label>
              </div>

              {/* Agree to Terms */}
              <div>
                <label className="flex items-center">
                  <Field type="checkbox" name="agreeTerms" className="mr-2" />
                  <span className="text-sm text-gray-700">I agree to the terms and conditions</span>
                </label>
                <ErrorMessage name="agreeTerms" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className={`w-full p-2 text-white font-semibold rounded-md ${isFormFilled ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"}`}
                  disabled={!isFormFilled}
                >
                  Create Account
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default CreateAccountForm;