import React, { useState, useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MapPin, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import instance from '../../helper/axiosInstance';
import { useSelector } from 'react-redux';
import PopupMessage from '../../Common/PopupMessage';

const ServiceBookingForm = () => {
  const user = useSelector((state) => state.userReducer.userData);
  const [currentLocation, setCurrentLocation] = useState(null);
  const { id } = useParams();
  console.log('id = ',id)
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      userId: user?._id,
      workerId: id,
      location: null,
      selectedDate: new Date(),
      selectedTime: '',
      additionalNotes: '',
    },
    validationSchema: Yup.object({
      location: Yup.object().nullable().required('Please set your location'),
      selectedDate: Yup.date().required('Please select a date'),
      selectedTime: Yup.string().required('Please select a time'),
      additionalNotes: Yup.string(),
    }),
    onSubmit: async (values) => {
      console.log('Submitting values:', values);
      try {
        const response = await instance.post(`/workers/booking`, values);
        console.log('Booking response:', response.data);
        if(response.data.success){
          setIsPopupOpen(true)
        }
      } catch (error) {
        console.error('Booking error:', error);
      } 
    },
  });

  const handleGetLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Getting location...');
          const newLocation = { latitude, longitude };
          setCurrentLocation(newLocation);
          formik.setFieldValue('location', newLocation);
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [formik]);

  useEffect(() => {
    console.log('current Location = ', currentLocation);
  }, [currentLocation]);

  const handlePrevMonth = useCallback(() => {
    formik.setFieldValue(
      'selectedDate',
      new Date(formik.values.selectedDate.getFullYear(), formik.values.selectedDate.getMonth() - 1, 1)
    );
  }, [formik]);

  const handleNextMonth = useCallback(() => {
    formik.setFieldValue(
      'selectedDate',
      new Date(formik.values.selectedDate.getFullYear(), formik.values.selectedDate.getMonth() + 1, 1)
    );
  }, [formik]);

  const renderCalendar = useCallback(() => {
    const daysInMonth = new Date(
      formik.values.selectedDate.getFullYear(),
      formik.values.selectedDate.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      formik.values.selectedDate.getFullYear(),
      formik.values.selectedDate.getMonth(),
      1
    ).getDay();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="text-gray-400 p-2"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date();
      const isToday =
        i === currentDate.getDate() &&
        formik.values.selectedDate.getMonth() === currentDate.getMonth() &&
        formik.values.selectedDate.getFullYear() === currentDate.getFullYear();
      
      const isSelected =
        i === formik.values.selectedDate.getDate() &&
        formik.values.selectedDate.getMonth() === formik.values.selectedDate.getMonth() &&
        formik.values.selectedDate.getFullYear() === formik.values.selectedDate.getFullYear();

      days.push(
        <div
          key={i}
          className={`p-2 text-center cursor-pointer hover:bg-blue-100 ${
            isToday ? 'bg-blue-500 text-white' : ''
          } ${isSelected ? 'bg-green-500 text-white' : ''}`}
          onClick={() =>
            formik.setFieldValue(
              'selectedDate',
              new Date(
                formik.values.selectedDate.getFullYear(),
                formik.values.selectedDate.getMonth(),
                i
              )
            )
          }
        >
          {i}
        </div>
      );
    }

    return days;
  }, [formik]);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Book Now</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-center mb-4">
          <MapPin className="mr-2 cursor-pointer" onClick={handleGetLocation} />
          <p>
            {currentLocation
              ? `Location set: ${currentLocation.latitude.toFixed(4)}, ${currentLocation.longitude.toFixed(4)}`
              : 'Set your location'}
          </p>
        </div>
        {formik.touched.location && formik.errors.location && (
          <div className="text-red-500 text-sm mb-2">{formik.errors.location}</div>
        )}

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Select Date and Time</h3>
          <div className="flex justify-between items-center mb-2">
            <span>
              {formik.values.selectedDate.toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <div>
              <button type="button" onClick={handlePrevMonth} className="mr-2">
                <ChevronLeft />
              </button>
              <button type="button" onClick={handleNextMonth}>
                <ChevronRight />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-sm mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="text-center font-semibold">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
          <select
            className="w-full border rounded-md p-2"
            name="selectedTime"
            value={formik.values.selectedTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select time</option>
            <option value="09:00">09:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
          </select>
        </div>
        {formik.touched.selectedTime && formik.errors.selectedTime && (
          <div className="text-red-500 text-sm mb-2">{formik.errors.selectedTime}</div>
        )}

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Additional Notes</h3>
          <textarea
            className="w-full border rounded-md p-2"
            rows="3"
            name="additionalNotes"
            placeholder="Any special instructions or requirements?"
            value={formik.values.additionalNotes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
        </div>

        <div className="mb-4 p-3 bg-yellow-100 rounded-md flex items-start">
          <AlertCircle className="mr-2 flex-shrink-0 text-yellow-700" />
          <p className="text-sm text-yellow-700">
            Please note: Final pricing may vary based on the specific details of the service. You will receive a confirmed price before the booking is
            finalized.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Confirm Booking
        </button>
      </form>
      <PopupMessage
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        message="Your request has been sent to the worker. Please wait for their response."
      />
    </div>
  );
};

export default ServiceBookingForm;