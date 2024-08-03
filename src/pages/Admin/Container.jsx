import React, { useState } from 'react'
import CustomerList from '../../components/admin/CustomerList'
import Sidebar from '../../components/admin/SideBar'
import WorkerList from '../../components/admin/WorkerList'

function Container() {
    const [activeTab, setActiveTab] = useState('customers');

    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          {activeTab === 'customers' ? <CustomerList /> : <WorkerList />}
        </div>
      </div>
    );
}

export default Container