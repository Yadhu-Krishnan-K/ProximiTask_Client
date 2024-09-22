import { useEffect } from "react"

function WorkerServices() {//workerId pass here
  useEffect(()=>{
    
  },[])

  return (
    <>
       <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="p-5">
        <h2 className="text-2xl font-bold text-gray-800">Title</h2>
        <p className="text-gray-600 mt-2">Description</p>

        <div className="mt-6">
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default WorkerServices




