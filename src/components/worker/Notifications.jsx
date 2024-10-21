import React, { useEffect, useState } from 'react';
import instance from '../../helper/axiosInstance';
import { useSelector } from 'react-redux';

const Table = ({ children }) => <table className="min-w-full divide-y divide-gray-200">{children}</table>;
const TableHeader = ({ children }) => <thead className="bg-gray-50">{children}</thead>;
const TableBody = ({ children }) => <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>;
const TableRow = ({ children }) => <tr>{children}</tr>;
const TableHead = ({ children }) => <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>;
const TableCell = ({ children, className }) => <td className={`px-6 py-4 whitespace-nowrap ${className}`}>{children}</td>;

const Badge = ({ children, className }) => (
  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${className}`}>
    {children}
  </span>
);

const getStatusColor = (status) => {
  const colors = {
    "Booked": "bg-purple-500 text-white",
    "Confirmed": "bg-green-500 text-white",
    "Canceled": "bg-red-500 text-white",
    "In progress": "bg-blue-500 text-white",
    "Completed": "bg-gray-500 text-white",
  };
  return colors[status] || "bg-gray-500 text-white";
};

const Notifications = () => {
  const worker = useSelector((state) => state.workerReducer.workerData); // Get logged-in worker data
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (worker?._id) {
      getBookingDetails();
    }
  }, [worker]);

  const getBookingDetails = async () => {
    try {
      const response = await instance.get(`/workers/booking/list/${worker._id}`);
      setBookings(response.data.list);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await instance.patch(`/workers/booking/${bookingId}`, { status: newStatus });
      getBookingDetails();
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Bookings</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Booking Date</TableHead>
            {/* <TableHead>Category</TableHead> */}
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking._id}>
              <TableCell>{booking.userName || "N/A"}</TableCell>
              <TableCell>{booking.selectedDate.split('T')[0]}</TableCell>
              {/* <TableCell>{booking.category}</TableCell> */}
              <TableCell>{(booking?.amount) || "---"}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>
                <select
                  className="text-sm border rounded"
                  value={booking.status}
                  onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                >
                  <option value="Booked">Booked</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="In progress">In progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Notifications;
