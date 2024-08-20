  import React, { useState } from "react";
import CustomerList from "../../components/admin/CustomerList";
import Sidebar from "../../components/admin/SideBar";
import WorkerList from "../../components/admin/WorkerList";
import CategoryList from "../../components/admin/CategoryList";

function Container() {
  const [activeTab, setActiveTab] = useState("customers");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {activeTab === "customers" && <CustomerList />}
        {activeTab === "workers" && <WorkerList />}
        {activeTab === "categories" && <CategoryList />}{" "}
      </div>
    </div>
  );
}

export default Container;
