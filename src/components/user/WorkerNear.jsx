import React, { useEffect, useState } from 'react';
import WorkerCard from './WorkerCard';
import instance from '../../helper/axiosInstance';
import isWithin from '../../helper/isWithIn';
import WorkerCard2 from './WorkerCard2';
import ProfileCard from './WorkerProfile3';
import { useNavigate } from 'react-router-dom';

function WorkerNear({ location }) {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getAllWorkers();
  }, [location]);

  const nav = useNavigate()

  async function getAllWorkers() {
    try {
      setLoading(true)
      let res = await instance.get('/workers');
      let list = res.data.list;
      let ApprovedWorkers = list.filter((worker) => worker.active);
      let workersWithInRange = [];
      for (let worker of ApprovedWorkers) {
        let res = isWithin(location.lat, location.long, worker.lat, worker.long);
        console.log('res from for of = ', res)
        if (res) {
          workersWithInRange.push(worker);
        }
      }
      console.log('with in range = ', workersWithInRange)
      setWorkers([...workersWithInRange]); // Set the state with filtered workers
    } catch (error) {
      console.error('Error fetching workers:', error);
    } finally {
      setLoading(false)
    }
  }

  async function selectedWorker(_id) {
    console.log('Working.....');

    console.log('working id == ', _id)
    nav(`/user/WorkerDetails/${_id}/workerBooking`)
  }


  return (
    <div className="text-center p-5 flex-col">
      <h1 className="text-3xl font-bold mb-5">---Workers Near You---</h1>
      {
        !loading ?
          (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {workers.map((worker, index) =>
                <ProfileCard key={worker._id} worker={worker} workerIdPass={selectedWorker} />
              )}
            </div>
          )
          : (
            <div className="flex justify-center items-center w-full h-64">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
            </div>
          )
      }
    </div>
  );
}

export default WorkerNear;
