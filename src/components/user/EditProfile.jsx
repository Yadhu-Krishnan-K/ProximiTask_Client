// import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import validationSchema from "../../helper/formValidation";
import { useEffect } from "react";


const EditProfile = () => {
  // const navigate = useNavigate();



  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      contactNumber: ""
    },

    validationSchema: validationSchema,

    onSubmit: (values => {
      console.log('values = ', values)
    }),

  })

  return (
    <div className="bg-white shadow-md rounded px-4 sm:px-8 mt-20 pt-6 pb-8 mb-4">
      <h1 className="text-2xl font-bold mb-6">Edit profile</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-6 flex flex-col ">
          <div className="w-full mb-4 ">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              id='name'
              type='text'
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Mehrab"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (<span>{formik.errors.name}</span>) : null}
          </div>

          <div className="w-full mb-4 sm:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              id='email'
              type='text'
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Mehrab"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (<span>{formik.errors.email}</span>) : null}
          </div>

          <div className="w-full mb-4 sm:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
              Address
            </label>
            <input
              id='address'
              type='text'
              name="address"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Mehrab"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
            {formik.touched.address && formik.errors.address ? (<span>{formik.errors.address}</span>) : null}
          </div>

        </div>
        <div className="w-full mb-4 ">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Contact Number
          </label>
          <input
            id='contact'
            type='number'
            name="contactNumber"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Mehrab"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contactNumber}
          />
          {formik.touched.contactNumber && formik.errors.contactNumber ? (<span>{formik.errors.contactNumber}</span>) : null}
        </div>
        {/* ... (other form fields remain the same) ... */}
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <button onClick={() => 1} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-4 sm:mb-0" type="button">
            Cancel
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Save
          </button>
        </div>
      </form>
    </div >
  );
};

export default EditProfile