import React from 'react';

function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="w-64 bg-gray-800 text-white h-full">
      <div className="p-4">
        <h2 className="text-2xl font-semibold">Admin Panel</h2>
      </div>
      <nav className="mt-8">
        <a
          href="#"
          className={`block py-2 px-4 ${
            activeTab === 'customers' ? 'bg-gray-900' : ''
          }`}
          onClick={() => setActiveTab('customers')}
        >
          Customers
        </a>
        <a
          href="#"
          className={`block py-2 px-4 ${
            activeTab === 'workers' ? 'bg-gray-900' : ''
          }`}
          onClick={() => setActiveTab('workers')}
        >
          Workers
        </a>
      </nav>
    </div>
  );
}

export default Sidebar;