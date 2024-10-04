import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import instance from '../../helper/axiosInstance';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux'

const Table = ({ children }) => <table className="min-w-full divide-y divide-gray-200">{children}</table>;
const TableHeader = ({ children }) => <thead className="bg-gray-50">{children}</thead>;
const TableBody = ({ children }) => <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>;
const TableRow = ({ children }) => <tr>{children}</tr>;
const TableHead = ({ children }) => <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>;
const TableCell = ({ children, className }) => <td className={`px-6 py-4 whitespace-nowrap ${className}`}>{children}</td>;

const Input = ({ ...props }) => (
  <input {...props} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
);

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
  const worker = useSelector((state)=>state.workerReducer.worker)
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getBookingDetails();
  }, []);

  const getBookingDetails = async () => {
    try {
      const response = await instance.get(`/workers/booking/list/${worker._id}`);
      const workerIds = response.data.list.map((val) => val.workerId);
      let workerDetails = [];
      for (let workerId of workerIds) {
        const workerResponse = await instance.get(`/workers/worker/${workerId}`);
        workerDetails.push(workerResponse?.data?.worker);
      }
      
      let updatedBookings = response.data.list.map((booking, index) => ({
        ...booking,
        workerName: workerDetails[index].name,
        category: workerDetails[index].category
      }));
      
      setBookings(updatedBookings);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  const handleStatusChange = async (workerId, newStatus) => {
    try {
      await instance.patch(`/workers/booking/${id}/${workerId}`, { status: newStatus });
      getBookingDetails(); // Refresh the booking list
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const filteredBookings = bookings.filter(booking =>
    booking.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.workerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Booking Status</h1>
        {/* <div className="relative">
          <Input 
            type="text" 
            placeholder="Search" 
            className="pl-10 pr-4 py-2" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div> */}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking</TableHead>
            <TableHead>DATE & TIME</TableHead>
            <TableHead>Worker</TableHead>
            <TableHead>AMOUNT</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBookings.map((booking) => (
            <TableRow key={booking.workerId}>
              <TableCell className="font-medium">{booking.category}</TableCell>
              <TableCell>{booking.selectedDate}</TableCell>
              <TableCell>{booking.workerName}</TableCell>
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
                  onChange={(e) => handleStatusChange(booking.workerId, e.target.value)}
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