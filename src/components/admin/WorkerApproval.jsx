import React from 'react';

function WorkerApproval() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4">Worker Account Approval</h3>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
        <p className="font-bold">New Account Request</p>
        <p>Name: Charlie Brown</p>
        <p>Email: charlie@example.com</p>
        <div className="mt-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2">
            Approve
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkerApproval;