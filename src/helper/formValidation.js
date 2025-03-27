import * as Yup from 'yup'

const validationSchema = Yup.object({
    name: Yup.string()
             .matches(/[A-Za-z]/, "Name must contain at least one alphabetic character")
             .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces")
             .required("Name is required"),
    email: Yup.string()
              .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address")
              .matches(/^\S*$/, "Email must not contain spaces")
              .required("Email is required"),
    pass: Yup.string()
             .min(8, "Password must be at least 8 characters")
             .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
             .matches(/[a-z]/, "Password must contain at least one lowercase letter")
             .matches(/\d/, "Password must contain at least one number")
             .matches(/[@$!%*?&]/, "Password must contain at least one special character")
             .matches(/^\S*$/, "Password must not contain spaces")
             .required("Password is required")
})

export default validationSchema

export const passwordSchema = Yup.string()
             .min(8, "Password must be at least 8 characters")
             .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
             .matches(/[a-z]/, "Password must contain at least one lowercase letter")
             .matches(/\d/, "Password must contain at least one number")
             .matches(/[@$!%*?&]/, "Password must contain at least one special character")
             .matches(/^\S*$/, "Password must not contain spaces")
             .required("Password is required")

export const searchTextValidation = Yup.string()
             .required("Enter something")
             .matches(/^\S*$/, "Enter the category only...")
