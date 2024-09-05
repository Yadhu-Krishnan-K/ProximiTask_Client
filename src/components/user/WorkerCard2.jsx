import React from 'react';

function WorkerCard2() {
    return (
        < div className="relative max-w-xs mx-auto" >
            <div className="rounded overflow-hidden shadow-md bg-white">
                <div className="absolute -mt-20 w-full flex justify-center">
                    <div className="h-24 w-24">
                        <img
                            src="https://randomuser.me/api/portraits/women/49.jpg"
                            className="rounded-full object-cover h-full w-full shadow-md"
                            alt="Worker"
                        />
                    </div>
                </div>
                <div className="px-6 mt-16">
                    <h1 className="font-bold text-xl text-center mb-1">Carole Steward</h1>
                    <p className="text-gray-800 text-sm text-center">Chief Executive Officer</p>
                    {/* <p className="text-center text-gray-600 text-base pt-3 font-normal">
                                Carole Steward is a visionary CEO known for her exceptional leadership and strategic acumen. With a
                                wealth of experience in the corporate world, she has a proven track record of driving innovation and
                                achieving remarkable business growth.
                            </p> */}

                </div>
            </div>
        </div >
    )
}

export default WorkerCard2;
