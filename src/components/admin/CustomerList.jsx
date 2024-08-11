import React, { useEffect, useState } from 'react';
import instance from '../../helper/axiosInstance';

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    instance.get('/users')
      .then((res) => {
        setCustomers(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  const changeActivity = async (customer_id) => {
    try {
      const response = await instance.patch('/users', { userId: customer_id });
      if (response.data.success) {
        // Optimistically update the local state
        toggleCustomerStatus(customer_id);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const toggleCustomerStatus = (id) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer._id === id
          ? { ...customer, isActive: !customer.isActive }
          : customer
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Customers</h2>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td className="border px-4 py-2">{customer.name}</td>
              <td className="border px-4 py-2">{customer.email}</td>
              <td className="border px-4 py-2">
                {customer.isActive ? 'Active' : 'Inactive'}
              </td>
              <td className="border px-4 py-2">
                <button
                  className={`px-4 py-2 rounded ${
                    customer.isActive
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white`}
                  onClick={() => changeActivity(customer._id)}
                >
                  {customer.isActive ? 'Disable' : 'Enable'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
