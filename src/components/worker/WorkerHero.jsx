import React from 'react'
import { useSelector } from 'react-redux'

function WorkerHero() {
    const worker = useSelector((state)=>state.workerReducer.workerData)

    return (
        <>
            <div
                className="h-20 w-full mt-1"
                style={{ backgroundImage: "url('/Rectangle 2.png')" }}

            />
            <div className="relative w-full h-1/3 ps-2 border-b-2">
                <img
                    src={worker.croppedImgURL}
                    alt="User"
                    className="rounded-full h-20 w-20 object-cover shadow-md absolute -mt-10 bg-slate-400"
                />

                <div className=" ml-20">
                    <h6 className="font-semibold text-gray-900">{worker.name}</h6>
                    <span className="text-gray-900 text-sm">{worker.category}</span>
                </div>
            </div>    
        </>
    )
}

export default WorkerHero