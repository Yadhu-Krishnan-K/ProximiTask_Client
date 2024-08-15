import React from 'react';
import ReactDOM from 'react-dom';

function WorkerApproval({ worker, onApprove, onReject, onClose }) {
  if (!worker) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-xl font-semibold mb-4">Worker Account Approval</h3>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
          <p className="font-bold">New Account Request</p>
          <p>Name: {worker.name}</p>
          <p>Email: {worker.email}</p>
          <p>Area: {worker.area}</p>
          <p>Category: {worker.category}</p>
          <p>Contact: {worker.phoneNumber} </p>
          <p>Id Type: {worker.idCard}</p>
          <p>Id Nuber: {worker.idCardNum}</p>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
            onClick={() => {
              onApprove(worker._id);
              onClose();
            }}
          >
            Approve
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
            onClick={() => {
              onReject(worker._id);
              onClose();
            }}
          >
            Reject
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default WorkerApproval;