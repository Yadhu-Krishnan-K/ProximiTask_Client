import React, { useEffect, useState } from 'react';
import { 
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  Rating,
  Divider
} from '@mui/material';
import {Phone} from '@mui/icons-material'
import { useParams } from 'react-router-dom';
import instance from '../../helper/axiosInstance';
// import { Phone as PhoneIcon } from 'lucide-react';

const Worker = () => {
    const {id} = useParams()
    const [worker, setWorker] = useState(null)
    const [category, setCategory] = useState(null)
    useEffect(()=>{
        getWorker()
    },[])
    async function getWorker(){
        console.log('calls...');
        
        try {
            const response = await instance.get(`/workers/${id}`)
            if(response.data.success){
                setWorker(response.data.worker)
            }
            
        } catch (error) {
            console.log(error)
        }
    }
   
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return 'Not specified';
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };

  const DataField = ({ label, value }) => (
    <div className="w-full">
      <Typography variant="subtitle2" className="text-gray-700 font-semibold mb-2">
        {label}
      </Typography>
      <Paper elevation={0} className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
        <Typography variant="body1" className="text-gray-800">
          {value || 'Not specified'}
        </Typography>
      </Paper>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Paper elevation={3} className="w-full max-w-2xl bg-white rounded-lg">
        <Box className="p-6">
          <Typography variant="h4" className="text-center text-gray-800 font-bold mb-6">
            Worker Profile
          </Typography>
          
          <Divider className="mb-6" />

          <Grid container spacing={3}>
            {/* Name Field */}
            <Grid item xs={12} md={6}>
              <DataField 
                label="Name" 
                value={worker?.name}
              />
            </Grid>

            {/* Email Field */}
            <Grid item xs={12} md={6}>
              <DataField 
                label="Email" 
                value={worker?.email}
              />
            </Grid>

            {/* Phone Number Field */}
            <Grid item xs={12} md={6}>
              <DataField 
                label="Phone Number" 
                value={formatPhoneNumber(worker?.phoneNumber)}
              />
            </Grid>

            {/* Category Field */}
            <Grid item xs={12} md={6}>
              <DataField 
                label="Category" 
                value={worker?.category_id?.categoryName}
              />
            </Grid>

            {/* Location Field */}
            <Grid item xs={12}>
              <DataField 
                label="Location" 
                value={worker?.area}
              />
            </Grid>

            {/* Rating Field */}
            {worker?.rating && (
              <Grid item xs={12} className="mt-2">
                <Typography variant="subtitle2" className="text-gray-700 font-semibold mb-2">
                  Rating
                </Typography>
                <Paper elevation={0} className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2">
                    <Rating 
                      value={worker?.rating} 
                      precision={0.5} 
                      readOnly 
                    />
                    <Typography variant="body1" className="text-gray-800">
                      {worker?.rating.toFixed(1)} / 5.0
                    </Typography>
                  </div>
                </Paper>
              </Grid>
            )}
          </Grid>

          {/* Contact Button */}
          {/* <div className="mt-8 flex justify-center">
            <Button
              variant="contained"
              color="primary"
              startIcon={<Phone className="w-5 h-5" />}
              onClick={() => window.location.href = `tel:${worker.phoneNumber}`}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Contact Worker
            </Button>
          </div> */}
        </Box>
      </Paper>
    </div>
  );
};

export default Worker;