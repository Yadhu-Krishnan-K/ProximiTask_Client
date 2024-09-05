import React from 'react';
// import Header from './Header';
// import WorkerProfile from './WorkerProfile';
// import ServicesList from './ServicesList';
import WorkerInfo from '../../components/user/WorkerInfo';
import Nav1 from '../../components/navbar/Nav1';

const WorkerDetailPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <Nav1 />
      <main className=" w-full ">
        <WorkerInfo />
        {/* <WorkerProfile /> */}
        {/* <ServicesList /> */}
      </main>
    </div>
  );
};

export default WorkerDetailPage;