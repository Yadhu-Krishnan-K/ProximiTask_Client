import React from 'react';
import {Outlet} from 'react-router-dom'
// import Header from './Header';
// import WorkerProfile from './WorkerProfile';
// import ServicesList from './ServicesList';
import WorkerInfo from '../../components/user/WorkerInfo';
import Nav1 from '../../components/navbar/Nav1';
import WorkerSidebar from '../../components/user/WorkerSidebar';

const WorkerDetailPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <Nav1 />
      <main className=" w-full">
        <WorkerInfo />
        <div className='flex'>
          <WorkerSidebar />
          <Outlet/>
        </div>
      </main>
    </div>
  );
};

export default WorkerDetailPage;