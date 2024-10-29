import React from 'react';
import {Outlet, useParams} from 'react-router-dom'
// import Header from './Header';
// import WorkerProfile from './WorkerProfile';
// import ServicesList from './ServicesList';
import WorkerInfo from '../../components/user/WorkerInfo';
import Nav1 from '../../components/navbar/Nav1';
import WorkerSidebar from '../../components/user/WorkerSidebar';
import WorkerServices from '../../components/user/WorkerServices';
import { useSelector } from 'react-redux';

const WorkerDetailPage = () => {
  const {id} = useParams()  
  const user = useSelector((state) => state.userReducer.userData);

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <Nav1 user={user} />
      <main className=" w-full">
        <WorkerInfo id={id} />
        <div className="flex flex-col md:flex-row gap-4">
          <aside className="w-full md:w-64">
            <WorkerSidebar id={id} />
          </aside>
          
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkerDetailPage;