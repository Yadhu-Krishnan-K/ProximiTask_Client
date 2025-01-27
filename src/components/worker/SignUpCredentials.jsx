import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
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
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import MapIcon from '@mui/icons-material/Map';

// Validation schema
const validationSchema = Yup.object().shape({
  location: Yup.object().shape({
    coords: Yup.object().shape({
      lat: Yup.number().required("Latitude is required"),
      long: Yup.number().required("Longitude is required"),
    }),
    name: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    nation: Yup.string(),
    pincode: Yup.string(),
  }),
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
  const [categories, setCategories] = useState([]);
  const [locationDetails, setLocationDetails] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);

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

  // Location handling functions
  const getCurrentLocation = async (setFieldValue) => {
    setIsLoadingLocation(true);
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          // timeout: 5000,
          // maximumAge: 10000
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Set coordinates
      setFieldValue("location.coords.lat", latitude);
      setFieldValue("location.coords.long", longitude);

      // Fetch location details
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      
      // Update location details
      setLocationDetails({
        displayName: data.display_name,
        city: data.address.city || data.address.town || data.address.village,
        state: data.address.state,
        country: data.address.country,
        postcode: data.address.postcode,
      });

      // Update form values
      setFieldValue('location.city', data.address.city || data.address.town || data.address.village || '');
      setFieldValue('location.state', data.address.state || '');
      setFieldValue('location.nation', data.address.country || '');
      setFieldValue('location.pincode', data.address.postcode || '');
      setFieldValue('location.name', data.display_name || '');
      
    } catch (error) {
      console.error("Error getting location:", error);
      setLocationError("Failed to get current location");
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleLocationSelect = async (location, setFieldValue) => {
    try {
      setFieldValue('location.coords.lat', location.lat);
      setFieldValue('location.coords.long', location.lng);
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`
      );
      const data = await response.json();
      
      setLocationDetails({
        displayName: data.display_name,
        city: data.address.city || data.address.town || data.address.village,
        state: data.address.state,
        country: data.address.country,
        postcode: data.address.postcode,
      });

      setFieldValue('location.city', data.address.city || data.address.town || data.address.village || '');
      setFieldValue('location.state', data.address.state || '');
      setFieldValue('location.nation', data.address.country || '');
      setFieldValue('location.pincode', data.address.postcode || '');
      setFieldValue('location.name', data.display_name || '');
    } catch (error) {
      console.error("Error fetching location details:", error);
      setLocationError("Failed to fetch location details");
    }
  };

  // Form submission handler
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log('Form values before submission:', values);
      
      // Create FormData object
      const formData = new FormData();
      
      // Construct the submission data
      const submissionData = {
        ...values,
        ...data  // Include additional data passed as prop
      };

      // Append each field to FormData
      Object.entries(submissionData).forEach(([key, value]) => {
        if (key === 'location') {
          formData.append('location', JSON.stringify(value));
        } else if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
        }
      });

      console.log('Submitting form...');
      const response = await instance.post("/workers/signup", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log('Response:', response);

      if (response.status === 201) {
        // Reset states
        setCropped(false);
        setOriginalImg(null);
        setCroppedImg(null);
        resetForm();

        // Call callbacks
        if (onSuccess) onSuccess();
        if (onClose) onClose();

        // Navigate to OTP page
        setTimeout(() => {
          nav('/worker/otp', { replace: true });
        }, 100);
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
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
              // Check if form is filled whenever values change
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
                          onClick={() => setIsMapModalOpen(true)}
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
                            Selected location: {values.location.coords.lat.toFixed(4)}, {values.location.coords.long.toFixed(4)}
                            {locationDetails?.city && `, ${locationDetails.city}`}
                          </Typography>
                        )}
                      </Box>
                    </Paper>
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
                    </Paper>wk

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

                    {/* Location Map Modal */}
                    <LocationMapModal
                      open={isMapModalOpen}
                      onClose={() => setIsMapModalOpen(false)}
                      onSelectLocation={(location) => handleLocationSelect(location, setFieldValue)}
                      initialLocation={
                        values.location.coords.lat && values.location.coords.long
                          ? { lat: values.location.coords.lat, lng: values.location.coords.long }
                          : null
                      }
                    />
                  </Box>
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