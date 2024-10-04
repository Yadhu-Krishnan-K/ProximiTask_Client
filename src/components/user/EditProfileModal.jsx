import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X } from 'lucide-react'; // Import the close icon

export const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
  
  // Define validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    address: Yup.string().required('Address is required'),
    contactNumber: Yup.string()
      .required('Contact number is required')
      .matches(/^[0-9]{10}$/, 'Must be a valid 10-digit number'),
  });

  // If modal is not open, don't render the content
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Formik form with validation */}
        <Formik
          initialValues={{
            name: user.name || '',
            email: user.email || '',
            address: user.address || '',
            contactNumber: user.contactNumber || '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log('values = ', values)
            onSave(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1">Name</label>
                  <Field
                    type="text"
                    name="name"
                    className="w-full border-gray-300 rounded-lg py-2 px-3"
                  />
                  <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full border-gray-300 rounded-lg py-2 px-3"
                  />
                  <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                </div>

                {/* Address Field */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1">Address</label>
                  <Field
                    type="text"
                    name="address"
                    className="w-full border-gray-300 rounded-lg py-2 px-3"
                  />
                  <ErrorMessage name="address" component="p" className="text-red-500 text-sm" />
                </div>

                {/* Contact Number Field */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1">Contact Number</label>
                  <Field
                    type="number"
                    name="contactNumber"
                    className="w-full border-gray-300 rounded-lg py-2 px-3"
                  />
                  <ErrorMessage
                    name="contactNumber"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
