import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MapPin, ChevronLeft, ChevronRight, AlertCircle, Calendar } from 'lucide-react';
import instance from '../../helper/axiosInstance';
import { useSelector } from 'react-redux';
import PopupMessage from '../../Common/PopupMessage';

const ServiceBookingForm = () => {
  const user = useSelector((state) => state.userReducer.userData);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const { id } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hoveredDate, setHoveredDate] = useState(null);

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const [bookedResponse, leaveResponse] = await Promise.all([
          instance.get(`/workers/${id}/booked-dates`),
          instance.get(`/workers/${id}/leave-dates`)
        ]);
  
        const bookedDates = bookedResponse.data.bookedDates.map(date => ({
          date: new Date(date),
          reason: 'Booked'
        }));
  
        const leaveDates = leaveResponse.data.leaveDates.map(date => ({
          date: new Date(date),
          reason: 'On Leave'
        }));
  
        // Merge both arrays into one
        const combinedUnavailableDates = [...bookedDates, ...leaveDates];
        setUnavailableDates(combinedUnavailableDates);
      } catch (error) {
        console.error('Error fetching unavailable dates:', error);
      }
    };
  
    fetchUnavailableDates();
  }, [id]);
  
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
      additionalNotes: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        const response = await instance.post(`/workers/booking`, values);
        if (response.data.success) {
          setIsPopupOpen(true);
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
      const currentDate = new Date(
        formik.values.selectedDate.getFullYear(),
        formik.values.selectedDate.getMonth(),
        i
      );
      const isToday =
        i === new Date().getDate() &&
        formik.values.selectedDate.getMonth() === new Date().getMonth() &&
        formik.values.selectedDate.getFullYear() === new Date().getFullYear();

      const unavailableDate = unavailableDates.find(
        (date) => new Date(date.date).toDateString() === currentDate.toDateString()
      );

      const isBooked = unavailableDate && unavailableDate.reason === 'Booked';
      const isOnLeave = unavailableDate && unavailableDate.reason === 'On Leave';

      days.push(
        <div
          key={i}
          className="relative"
          onMouseEnter={() => unavailableDate && setHoveredDate(currentDate)}
          onMouseLeave={() => setHoveredDate(null)}
        >
          <div
            className={`p-2 text-center cursor-pointer ${
              isToday ? 'bg-blue-500 text-white' : ''
            } ${formik.values.selectedDate.getDate() === i ? 'bg-green-500 text-white' : ''} ${
              isBooked ? 'bg-red-200 text-red-600 cursor-not-allowed' : isOnLeave ? 'bg-orange-200 text-orange-600 cursor-not-allowed' : 'hover:bg-blue-100'
            }`}
            onClick={() => !unavailableDate && formik.setFieldValue('selectedDate', currentDate)}
          >
            {i}
            {(isBooked || isOnLeave) && (
              <Calendar className="w-3 h-3 absolute top-0 right-0 text-red-500" />
            )}
          </div>
          {hoveredDate?.toDateString() === currentDate.toDateString() && (
            <div className="absolute z-10 bg-gray-800 text-white text-xs rounded p-2 mt-1">
              {unavailableDate?.reason || 'Unavailable'}
            </div>
          )}
        </div>
      );
    }

    return days;
  }, [formik, unavailableDates, hoveredDate]);

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
        </div>

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
            Please note: Final pricing may vary based on the specific details of the service. You will receive a confirmed price before the booking is finalized.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Book Now
        </button>
      </form>
      {isPopupOpen && <PopupMessage isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default ServiceBookingForm;
