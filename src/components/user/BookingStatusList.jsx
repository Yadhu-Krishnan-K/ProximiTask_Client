import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import instance from '../../helper/axiosInstance';
import { useParams } from 'react-router-dom';

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
// const bookings = [
    //   { id: 1, service: "Mount Art or Shelves // Sonnie Stone", date: "Apr 23, 2021", amount: "----", status: "Booked" },
    //   { id: 2, service: "Help Moving to 400810", date: "Apr 23, 2021", amount: "$670", status: "Confirmed" },
//   { id: 3, service: "Help Moving from #367651", date: "Apr 18, 2021", amount: "$670", status: "Canceled" },
//   { id: 4, service: "Mount Art or Shelves for Sonnie Stone", date: "Apr 15, 2021", amount: "$670", status: "In progress" },
//   { id: 5, service: "Help Moving for Jake Lang", date: "Apr 13, 2021", amount: "$670", status: "Completed" },
//   { id: 6, service: "Help Moving for THEMEBRI6 LLC", date: "Apr 11, 2021", amount: "$670", status: "Confirmed" },
// ];

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

const BookingStatusList = () => {
    
    const {id} = useParams()
    const [bookings, setBookings] = useState([])
    useEffect(()=>{
        getBookingDetails()
    },[])

    const getBookingDetails = async() => {
        const response = await instance.get(`/workers/booking/${id}`)
        // setBookings([...response.data.list])
        const workerIds = response.data.list.map((val)=>val.workerId)
        let ar = []
        for(let workerId of workerIds){
          const response = await instance.get(`/workers/worker/${workerId}`)
          ar.push(response?.data?.worker)
        }
        console.log('arr = ',ar)
        let ar2 = response.data.list
        for(let i=0;i<ar2.length;i++){
          ar2[i].workerName = ar[i].name
          ar2[i].category = ar[i].category
        }
        console.log('array = ',ar2)
        setBookings([...ar2])
        // console.log(response)
    }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Booking Status</h1>
        {/* <div className="relative">
          <Input type="text" placeholder="Search" className="pl-10 pr-4 py-2" />
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
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.workerId}>
              <TableCell className="font-medium">{booking.category}</TableCell>
              <TableCell>{booking.selectedDate}</TableCell>
              <TableCell>{booking.workerName}</TableCell>
              <TableCell>{(booking?.amount )|| "---"}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>
                <button className="text-gray-600 hover:text-gray-800">⋮</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingStatusList;