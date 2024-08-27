import React, { useEffect, useState } from 'react'
import WorkerCard from './WorkerCard'
import instance from '../../helper/axiosInstance'
import isWithin from '../../helper/isWithIn'

function WorkerNear({location}) {
  const [workers, setWorkers] = useState([])

  useEffect(() => {
    getAllWorkers()
  }, [location])  // Add location as a dependency

  async function getAllWorkers(){
    try {
      let res = await instance.get('/workers')
      let list = res.data.list
      let ApprovedWorkers = list.filter((worker) => worker.active)
      let workersWithInRange = []
      for(let worker of ApprovedWorkers){
        let res = isWithin(location.lat, location.long, worker.lat, worker.long)
        if(res){
          workersWithInRange.push(worker)
        }
      }
      setWorkers(workersWithInRange)  // Set the state with filtered workers
    } catch (error) {
      console.error("Error fetching workers:", error)
    }
  }

  return (
    <div className='text-center p-5 flex-col'>
      <h1 className='text-3xl underline'>Workers Near You</h1>
      <div className='WorkerProfiles my-5 grid grid-cols-5 gap-4 content-center'>
        {workers.map((worker) => (
          <WorkerCard key={worker._id} worker={worker} />
        ))}
      </div>
    </div>
  )
}

export default WorkerNear