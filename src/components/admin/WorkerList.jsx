import React, { useState } from 'react';
import WorkerApproval from './WorkerApproval';
import instance from '../../helper/axiosInstance';

function WorkerList() {
  const [workers, setWorkers] = useState([]);
  const [newRequests, setNewRequests] = useState([]);

  function getWorkers(){
    instance.get('/workers')
  }

  const [selectedWorker, setSelectedWorker] = useState(null);

  const toggleWorkerStatus = (id) => {
    setWorkers(
      workers.map((worker) =>
        worker.id === id ? { ...worker, isActive: !worker.isActive } : worker
      )
    );
  };

  const handleApprove = (id) => {
    const workerToApprove = newRequests.find((worker) => worker.id === id);
    setWorkers([...workers, { ...workerToApprove, isActive: true }]);
    setNewRequests(newRequests.filter((worker) => worker.id !== id));
  };

  const handleReject = (id) => {
    setNewRequests(newRequests.filter((worker) => worker.id !== id));
  };

  const handleWorkerClick = (worker) => {
    setSelectedWorker(worker);
  };

  const handleClosePopup = () => {
    setSelectedWorker(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Approved Workers</h2>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <tr key={worker.id}>
              <td className="border px-4 py-2">{worker.name}</td>
              <td className="border px-4 py-2">{worker.email}</td>
              <td className="border px-4 py-2">
                {worker.isActive ? 'Active' : 'Inactive'}
              </td>
              <td className="border px-4 py-2">
                <button
                  className={`px-4 py-2 rounded ${
                    worker.isActive
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white`}
                  onClick={() => toggleWorkerStatus(worker.id)}
                >
                  {worker.isActive ? 'Disable' : 'Enable'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-2xl font-semibold mb-4">New Account Requests</h2>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {newRequests.map((worker) => (
            <tr key={worker.id}>
              <td className="border px-4 py-2">{worker.name}</td>
              <td className="border px-4 py-2">{worker.email}</td>
              <td className="border px-4 py-2 flex justify-center">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleWorkerClick(worker)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedWorker && (
        <WorkerApproval
          worker={selectedWorker}
          onApprove={handleApprove}
          onReject={handleReject}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

export default WorkerList;
