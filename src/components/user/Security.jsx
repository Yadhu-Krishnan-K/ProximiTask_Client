import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { passwordSchema } from '../../helper/formValidation'
import instance from '../../helper/axiosInstance';
import { Success } from '../../helper/popup';
import { useSelector } from 'react-redux';

function Security() {
    const user = useSelector((state) => state.userReducer.userData);

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            reEnteredPassWord: ""
        },
        validationSchema: Yup.object({
            oldPassword: passwordSchema,
            newPassword: passwordSchema,
            reEnteredPassWord: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                .required('Please confirm your new password')
        }),
        onSubmit: values => {
            console.log("Form Data:", values)
            changePassword(values.oldPassword, values.newPassword, user.email)
        }
    })
    const changePassword = async (oldPassword,newPassword, email) => {
        try {
            const res = await instance.put('/users/security',{
                oldPassword,newPassword,email
            })
            if(res.data.success){
                Success("Password changed successfully!")
                formik.resetForm()
            }
        } catch (error) {
            console.log('error = ',error.message)
        }
    }

    return (
        <div className="bg-white shadow-md rounded px-4 sm:px-8 mt-20 pt-6 pb-8 mb-4">
            <h1 className="text-2xl font-bold mb-6">Security</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-6 flex flex-col ">
                    <div className="w-full mb-4 ">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Old Password
                        </label>
                        <input
                            id='oldPassword'
                            type='password'
                            name="oldPassword"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="old password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.oldPassword}
                        />
                        {formik.touched.oldPassword && formik.errors.oldPassword ? (<span className='text-red-600'>{formik.errors.oldPassword}</span>) : null}
                    </div>

                    <div className="w-full mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            New Password
                        </label>
                        <input
                            id='newPassword'
                            type='password'  // Changed to 'password' for input type consistency
                            name="newPassword" // Corrected the name attribute
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="new password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.newPassword}
                        />
                        {formik.touched.newPassword && formik.errors.newPassword ? (<span className='text-red-600'>{formik.errors.newPassword}</span>) : null}
                    </div>

                    <div className="w-full mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Confirm Password
                        </label>
                        <input
                            id='reEnteredPassWord'
                            type='password'
                            name="reEnteredPassWord"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="confirm password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.reEnteredPassWord}
                        />
                        {formik.touched.reEnteredPassWord && formik.errors.reEnteredPassWord ? (<span className='text-red-600'>{formik.errors.reEnteredPassWord}</span>) : null}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <button onClick={() => formik.resetForm()} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-4 sm:mb-0" type="button">
                        Cancel
                    </button>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Security
