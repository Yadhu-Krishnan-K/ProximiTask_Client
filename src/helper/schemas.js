import * as Yup from "yup";


export const signUpSchema = Yup.object({
    userImg: Yup.mixed().required("Profile image is required")
    .test('fileFormat', "Unsupported file format", (value) =>
            ["image/jpeg", "image/png", "image/gif"].includes(value?.type)
    ),
    croppedImg: Yup.mixed().required("Image needs to be cropped")
    .test('fileFormat', "Unsupported file format", (value) =>
      ["image/jpeg", "image/png", "image/gif"].includes(value?.type)
    ),
    name: Yup.string()
      .matches(/[A-Za-z]/, "Name must contain at least one alphabetic character")
      .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces")
      .required("Name is required"),
    email: Yup.string().email('Enter your Email')
      .required("Email is required"),
    pass: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(/[@$!%*?&]/, "Password must contain at least one special character")
      .matches(/^\S*$/, "Password must not contain spaces")
      .required("Password is required"),
    conPass: Yup.string()
      .oneOf([Yup.ref("pass"), null], "Passwords must match")
      .required("Confirm Password is required"),
  })