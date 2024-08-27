import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import instance from "../../helper/axiosInstance";
import { ToastContainer } from "react-toastify";
import { FaLocationCrosshairs } from "react-icons/fa6";
import cordsToCity from "../../helper/openCage";

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

function CreateAccountForm({ onClose, onSuccess, data }) {
  const [showErrors, setShowErrors] = useState({});
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [location, setLocation] = useState(null)
  const [cords, setCords] = useState(null)

  useEffect(() => {
    const timers = Object.keys(showErrors).map((field) =>
      setTimeout(() => {
        setShowErrors((prev) => ({ ...prev, [field]: false }));
      }, 3000)
    );

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [showErrors]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await instance.get("/category");
        setCategories(res.data.cateList);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    getCategory();
  }, []);

  async function checkLocation(setFieldValue) {
    navigator.geolocation.getCurrentPosition(async (res) => {
      console.log('current Location test = ', res)
      setCords({
        lat:res.coords.latitude,
        long:res.coords.longitude
      })
      setFieldValue('lat', res.coords.latitude)
      setFieldValue('long', res.coords.longitude)
      const city = await cordsToCity(res.coords.latitude, res.coords.longitude)
      console.log('city type == ', city)
      setFieldValue('area', city) // Set the Formik field value
    }, async (err) => {
      console.log(err)
    })
  }

  const initialValues ={
    area: "",
    lat:"",
    long:"",
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

      const response = await instance.post("/workers/signup", formData);

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
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto  p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">Create Account</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldTouched, values, isValid, setFieldValue }) => {
          useEffect(() => {
            const requiredFields = [
              "area",
              "category",
              "phone",
              "idType",
              "idNumber",
            ];
            const allFieldsFilled = requiredFields.every(
              (field) => values[field] !== ""
            );
            setIsFormFilled(allFieldsFilled);
          }, [values]);

          return (
            <Form>
              <ToastContainer />
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area
                </label>
                <div className="flex items-center">
                  <Field
                    type="text"
                    name="area"
                    className="flex-grow p-2 border border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter area or use current location"
                  />
                  <button
                    type="button"
                    className="flex items-center justify-center p-2 border border-gray-300 rounded-r-md hover:bg-gray-50"
                    onClick={() => checkLocation(setFieldValue)}
                  >
                    <FaLocationCrosshairs className="mr-2" />
                    Use Location
                  </button>
                </div>
                <ErrorMessage name="area" component="div" className="text-red-500 text-sm mt-1" />
              </div>


              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose a Category
                </label>
                <Field
                  as="select"
                  name="category"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  onFocus={() => {
                    setFieldTouched("category", true);
                    setShowErrors((prev) => ({ ...prev, category: true }));
                  }}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))}
                </Field>
                {errors.category && touched.category && showErrors.category && (
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    +91
                  </span>
                  <Field
                    type="tel"
                    name="phone"
                    className="flex-1 p-2 border border-gray-300 rounded-r-md focus:ring-indigo-500 focus:border-indigo-500"
                    onFocus={() => {
                      setFieldTouched("phone", true);
                      setShowErrors((prev) => ({ ...prev, phone: true }));
                    }}
                  />
                </div>
                {errors.phone && touched.phone && showErrors.phone && (
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select ID
                </label>
                <Field
                  as="select"
                  name="idType"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  onFocus={() => {
                    setFieldTouched("idType", true);
                    setShowErrors((prev) => ({ ...prev, idType: true }));
                  }}
                >
                  <option value="">Select</option>
                  <option value="aadhar">Aadhar Card</option>
                  <option value="pan">PAN Card</option>
                  <option value="drivingLicense">Driving License</option>
                  <option value="voterID">Voter ID</option>
                  <option value="passport">Passport</option>
                  <option value="rationCard">Ration Card</option>
                </Field>
                {errors.idType && touched.idType && showErrors.idType && (
                  <ErrorMessage
                    name="idType"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Number
                </label>
                <Field
                  type="text"
                  name="idNumber"
                  placeholder="Enter ID Number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  onFocus={() => {
                    setFieldTouched("idNumber", true);
                    setShowErrors((prev) => ({ ...prev, idNumber: true }));
                  }}
                />
                {errors.idNumber && touched.idNumber && showErrors.idNumber && (
                  <ErrorMessage
                    name="idNumber"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                )}
              </div>

              <div className="mb-4">
                <label className="flex items-center">
                  <Field
                    type="checkbox"
                    name="isSoleProprietor"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    I acknowledge I am a sole proprietor.
                  </span>
                </label>
              </div>

              <div className="mb-6">
                <label className="flex items-center">
                  <Field
                    type="checkbox"
                    name="agreeTerms"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    disabled={!isFormFilled}
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    I agree to TaskRabbit's{" "}
                    <a href="#" className="text-indigo-600 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-indigo-600 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
                {errors.agreeTerms && touched.agreeTerms && (
                  <ErrorMessage
                    name="agreeTerms"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                )}
              </div>

              <button
                type="submit"
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isValid && values.agreeTerms
                    ? "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!isValid || !values.agreeTerms}
              >
                Create Account
              </button>
            </Form>
          );
        }}
      </Formik>
      
    </div>
  );
}

export default CreateAccountForm;