import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import instance from "../../helper/axiosInstance";
import { useNavigate } from 'react-router-dom';
import LocationMapModal from "./LocationMapModal";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Paper,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  sliderClasses
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import MapIcon from '@mui/icons-material/Map';

const validationSchema = Yup.object().shape({
  lat: Yup.number().required("Location is required"),
  long: Yup.number().required("Location is required"),
  category: Yup.string().required("Category is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  idType: Yup.string().required("ID type is required"),
  idNumber: Yup.string()
    .matches(/^\d+$/, "ID number must contain only digits")
    .required("ID number is required"),
  isSoleProprietor: Yup.boolean(),
  agreeTerms: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions"
  ),
});

function CreateAccountForm({ setOriginalImg, setCroppedImg, setCropped, onClose, onSuccess, data }) {
  const nav = useNavigate();
  const [showErrors, setShowErrors] = useState({});
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [locationDetails, setLocationDetails] = useState(null);

  const [locationError, setLocationError] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);


  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await instance.get("/category");
        setCategories([...res.data.cateList]);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    getCategory();
  }, []);

  const initialValues = {
    location: {
      coords: {
        lat: null,
        long: null,
      },
      name: "",
      city: "",
      state: "",
      nation: "",
      pincode: "",
    },
    category: "",
    phone: "",
    idType: "",
    idNumber: "",
    isSoleProprietor: false,
    agreeTerms: false,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = {
        ...data,
        location: {
          coords: {
            lat: values.location.coords.lat,
            long: values.location.coords.long,
          },
          name: values.location.name,
          city: values.location.city,
          state: values.location.state,
          nation: values.location.nation,
          pincode: values.location.pincode,
        },
        category: values.category,
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
        setCropped(false);
        setOriginalImg(null);
        setCroppedImg(null);
        resetForm();

        if (onSuccess) {
          onSuccess();
        }

        if (onClose) {
          onClose();
        }

        setTimeout(() => {
          nav('/worker/otp', { replace: true });
        }, 100);
      }
    } catch (error) {
      console.error("An error occurred during signup:", error);
    } finally {
      setSubmitting(false);
    }
  };

  
  



  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', position: 'sticky', top: 0, zIndex: 1100 }}>
        <Typography variant="h5" align="center">
          Create Account
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', p: 2, bgcolor: '#f5f5f5' }}>
        <Container maxWidth="md" sx={{ py: 2 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue, values, isValid }) => {
                const handleLocationSelect = async(location) => {
                  setFieldValue('location.coords.lat', location.lat);
                  setFieldValue('location.coords.long', location.lng);
                  try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`);
                    console.log('response when selecting from map = ',response)
                    const data = await response.json();
                    console.log('data when selecting from map = ',data)
                    setLocationDetails({
                      displayName: data.display_name,
                      city: data.address.city || data.address.town || data.address.village,
                      state: data.address.state,
                      country: data.address.country,
                      postcode: data.address.postcode,
                    });
                    12.3679
                    console.log('location details = ', locationDetails)
                  } catch (error) {
                    console.error("Error fetching location details:", error);
                  }
                };
                const getCurrentLocation = (setFieldValue) => {
                  navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('location lat, lng = ',latitude,longitude)

                    // Set latitude and longitude in form values
                    setFieldValue("location.coords.lat", latitude); 
                    setFieldValue("location.coords.long", longitude);
                
                    // Fetch additional location details using Nominatim API
                    try {
                      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                      console.log('response = ',response)
                      const data = await response.json();
                      console.log('data = ',data)
                      setLocationDetails({
                        displayName: data.display_name,
                        city: data.address.city || data.address.town || data.address.village,
                        state: data.address.state,
                        country: data.address.country,
                        postcode: data.address.postcode,
                      });

                      console.log('location details = ', locationDetails)
                    } catch (error) {
                      console.error("Error fetching location details:", error);
                    }
                  }, 
                  async (error)=>{console.log(error)},
                  {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                  });
                };
                const handleMapSelection = () => {
                  setIsMapModalOpen(true);
                };
              
                useEffect(() => {
                  const requiredFields = [
                    "location.coords.lat",
                    "location.coords.long",
                    "category",
                    "phone",
                    "idType",
                    "idNumber",
                  ];
                  
                  const allFieldsFilled = requiredFields.every((field) => {
                    const fieldParts = field.split('.');
                    return fieldParts.reduce((acc, part) => acc && acc[part], values) !== null && 
                           fieldParts.reduce((acc, part) => acc && acc[part], values) !== "";
                  });
                
                  setIsFormFilled(allFieldsFilled && values.agreeTerms);
                }, [values]);
                

              return (
                <Form>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Location Section */}
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Location Details
                      </Typography>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button
                          variant="outlined"
                          startIcon={<MyLocationIcon />}
                          onClick={() => getCurrentLocation(setFieldValue)}
                          disabled={isLoadingLocation}
                        >
                          {isLoadingLocation ? 'Getting location...' : 'Use current location'}
                        </Button>

                        <Button
                          variant="outlined"
                          startIcon={<MapIcon />}
                          onClick={handleMapSelection}
                        >
                          Select from Map
                        </Button>

                        {locationError && (
                          <Typography color="error" variant="body2">
                            {locationError}
                          </Typography>
                        )}

                        {values.location.coords.lat && values.location.coords.long && (
                          <Typography variant="body2" color="text.secondary">
                            Selected location: {values.location.coords.lat.toFixed(4)}, {values.location.coords.long.toFixed(4)}, 
                            {locationDetails?.city}
                          </Typography>
                        )}
                      </Box>
                    </Paper>

                    {/* Rest of the form sections remain the same */}
                    {/* Personal Details Section */}
                    
                      {/* Personal Details Section */}
                      <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                          Personal Details
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                          {/* Category Selection */}
                          <Field name="category">
                            {({ field }) => (
                              <TextField
                                {...field}
                                select
                                label="Category"
                                fullWidth
                                error={touched.category && errors.category}
                                helperText={touched.category && errors.category}
                              >
                                {categories.map((category) => (
                                  <MenuItem key={category._id} value={category._id}>
                                    {category.categoryName}
                                  </MenuItem>
                                ))}
                              </TextField>
                            )}
                          </Field>

                          {/* Phone Input */}
                          <Field name="phone">
                            {({ field }) => (
                              <TextField
                                {...field}
                                label="Phone"
                                fullWidth
                                error={touched.phone && errors.phone}
                                helperText={touched.phone && errors.phone}
                              />
                            )}
                          </Field>
                        </Box>
                      </Paper>
                    

                    {/* ID Details Section */}
                    <Paper sx={{ p: 3 }}>
                      {/* ID Details Section */}
                      <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                          ID Details
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                          {/* ID Type Selection */}
                          <Field name="idType">
                            {({ field }) => (
                              <TextField
                                {...field}
                                select
                                label="ID Type"
                                fullWidth
                                error={touched.idType && errors.idType}
                                helperText={touched.idType && errors.idType}
                              >
                                <MenuItem value="Aadhaar">Aadhaar</MenuItem>
                                <MenuItem value="PAN">PAN</MenuItem>
                              </TextField>
                            )}
                          </Field>

                          {/* ID Number Input */}
                          <Field name="idNumber">
                            {({ field }) => (
                              <TextField
                                {...field}
                                label="ID Number"
                                fullWidth
                                error={touched.idNumber && errors.idNumber}
                                helperText={touched.idNumber && errors.idNumber}
                              />
                            )}
                          </Field>
                        </Box>
                      </Paper>
                    </Paper>

                    {/* Terms Section */}
                    <Paper sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControlLabel
                          control={
                            <Field
                              as={Checkbox}
                              name="isSoleProprietor"
                              color="primary"
                            />
                          }
                          label="Are you a sole proprietor?"
                        />

                        <FormControlLabel
                          control={
                            <Field
                              as={Checkbox}
                              name="agreeTerms"
                              color="primary"
                            />
                          }
                          label="I agree to the terms and conditions"
                        />
                        {touched.agreeTerms && errors.agreeTerms && (
                          <Typography color="error" variant="caption">
                            {errors.agreeTerms}
                          </Typography>
                        )}
                      </Box>
                    </Paper>
                    {/* <Paper sx={{ p: 3 }}> */}
                    {/* ... Terms content ... */}
                    {/* </Paper> */}
                  </Box>

                  {/* Submit Button */}
                  <Paper elevation={3} sx={{ position: 'sticky', bottom: 16, p: 2, mt: 3, bgcolor: 'background.paper' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      disabled={!isFormFilled}
                    >
                      Create Account
                    </Button>
                  </Paper>
                  <LocationMapModal
                    open={isMapModalOpen}
                    onClose={() => setIsMapModalOpen(false)}
                    onSelectLocation={handleLocationSelect}
                    initialLocation={values.location.coords.lat && values.location.coords.long ? { lat: values.location.coords.lat, lng: values.location.coords.long } : null}
                  />
                </Form>
              );
            }}
          </Formik>
        </Container>
      </Box>
    </Box>
  );
}

export default CreateAccountForm; 