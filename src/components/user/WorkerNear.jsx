import React from 'react'
import WorkerCard from './WorkerCard'

function WorkerNear() {
  return (
    <div className='text-center p-5 flex-col'>
        <h1 className='text-3xl underline'>Workers Near You</h1>
        <div className='WorkerProfiles my-5 grid grid-cols-5 gap-4 content-center'>
            <h1>hello</h1>
            <h1>world</h1>
            <WorkerCard />
            <WorkerCard />
            <WorkerCard />
            <WorkerCard />
            <WorkerCard />
            <WorkerCard />
            <WorkerCard />
            <WorkerCard />
        </div>
    </div>
  )
}

export default WorkerNear