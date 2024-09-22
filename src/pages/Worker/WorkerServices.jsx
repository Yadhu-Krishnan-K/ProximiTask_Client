import React from 'react'
import { Outlet } from 'react-router-dom'

function WorkerServices() {
  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <Header />
      <div className="w-full h-auto">
        <WorkerHero />
      </div>
      <div className="flex">
        {/* <Outlet /> */}
      </div>
    </div>
  )
}

export default WorkerServices