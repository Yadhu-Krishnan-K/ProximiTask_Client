import * as Yup from 'yup';

const validationSchema = Yup.object({
  fullName: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
  phone: Yup.string().required(),
  profilePhoto: Yup.mixed().required(),
  city: Yup.string().required(),
  district: Yup.string().required(),
  state: Yup.string().required(),
  pincode:Yup.string().required(),
  // latitude_longitude:Yup.array(),
  workCategory: Yup.string().required(),
  experience: Yup.string().required(),
  // documentFile: Yup.mixed().required(),
  // availableDays: Yup.array().min(1),
  // availableTime: Yup.string().required(),
});

export {validationSchema};
