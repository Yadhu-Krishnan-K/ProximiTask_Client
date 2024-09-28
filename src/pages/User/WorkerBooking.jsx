import React, { useState, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MapPin, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import _ from 'lodash';  // Import lodash for debouncing

const ServiceBookingForm = () => {
  const [currentLocation, setCurrentLocation] = useState('');

  // Debounced function to fetch location (replace with actual Maptailer API logic)
  const fetchLocation = useCallback(
    _.debounce((latitude, longitude) => {
      console.log(`Fetching location for lat: ${latitude}, lng: ${longitude}`);
      // Simulate fetching location (replace with API call)
      setCurrentLocation(`Fetched Location: ${latitude}, ${longitude}`);
    }, 1000), // 1000ms debounce
    []
  );

  // Function to handle location fetching when clicking the map pin
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocation(latitude, longitude);
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  // Initialize formik for form handling and validation
  const formik = useFormik({
    initialValues: {
      location: '',
      selectedDate: new Date(),
      selectedTime: '',
      additionalNotes: '',
      promoCode: '',
    },
    validationSchema: Yup.object({
      location: Yup.string().required('Location is required'),
      selectedDate: Yup.date().required('Please select a date'),
      selectedTime: Yup.string().required('Please select a time'),
      additionalNotes: Yup.string(),
      promoCode: Yup.string(),
    }),
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      // Perform booking logic here
    },
  });

  // Function to handle previous month navigation in the calendar
  const handlePrevMonth = () => {
    formik.setFieldValue(
      'selectedDate',
      new Date(formik.values.selectedDate.getFullYear(), formik.values.selectedDate.getMonth() - 1, 1)
    );
  };

  // Function to handle next month navigation in the calendar
  const handleNextMonth = () => {
    formik.setFieldValue(
      'selectedDate',
      new Date(formik.values.selectedDate.getFullYear(), formik.values.selectedDate.getMonth() + 1, 1)
    );
  };

  // Render the days in the calendar
  const renderCalendar = () => {
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

    // Add empty cells before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="text-gray-400 p-2"></div>);
    }

    // Render the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        i === new Date().getDate() &&
        formik.values.selectedDate.getMonth() === new Date().getMonth() &&
        formik.values.selectedDate.getFullYear() === new Date().getFullYear();
      days.push(
        <div
          key={i}
          className={`p-2 text-center cursor-pointer hover:bg-blue-100 ${
            isToday ? 'bg-blue-500 text-white' : ''
          }`}
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
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Book Now</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-center mb-4">
          <MapPin className="mr-2 cursor-pointer" onClick={handleGetLocation} />
          <input
            type="text"
            name="location"
            placeholder="Enter your location"
            className="flex-grow border rounded-md p-2"
            value={formik.values.location || currentLocation} // Use fetched location if available
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.location && formik.errors.location ? (
          <div className="text-red-500 text-sm mb-2">{formik.errors.location}</div>
        ) : null}

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
            {/* Add more time slots as needed */}
          </select>
        </div>
        {formik.touched.selectedTime && formik.errors.selectedTime ? (
          <div className="text-red-500 text-sm mb-2">{formik.errors.selectedTime}</div>
        ) : null}

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
    </div>
  );
};

export default ServiceBookingForm;
