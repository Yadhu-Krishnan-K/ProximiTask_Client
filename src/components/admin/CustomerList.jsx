import React, { useState } from 'react';

function CustomerList() {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', isActive: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', isActive: false },
  ]);

  const toggleCustomerStatus = (id) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === id
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
            <tr key={customer.id}>
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
                  onClick={() => toggleCustomerStatus(customer.id)}
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