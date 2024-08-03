import React, { useState } from 'react';
import WorkerApproval from './WorkerApproval';

function WorkerList() {
  const [workers, setWorkers] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', isActive: true },
    { id: 2, name: 'Bob Williams', email: 'bob@example.com', isActive: false },
  ]);

  const toggleWorkerStatus = (id) => {
    setWorkers(
      workers.map((worker) =>
        worker.id === id ? { ...worker, isActive: !worker.isActive } : worker
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Workers</h2>
      <WorkerApproval />
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden mt-8">
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
    </div>
  );
}

export default WorkerList;