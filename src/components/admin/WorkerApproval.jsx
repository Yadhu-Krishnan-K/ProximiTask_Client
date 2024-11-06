import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const WorkerApproval = ({ worker, onApprove, onReject, onClose }) => {
  if (!worker) return null;

  useEffect(()=>{
    
  })


  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl relative max-h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="p-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-lg z-10">
          <h3 className="text-lg font-semibold text-gray-900">
            Worker Account Approval
          </h3>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Alert Banner */}
          {/* <div className="m-4 bg-amber-50 border-l-4 border-amber-500 p-3 rounded">
            <p className="font-semibold text-amber-700">New Account Request</p>
          </div> */}

          {/* Profile Image */}
          {worker.croppedImgURL && (
            <div className="flex justify-center px-4 py-2">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={worker.croppedImgURL}
                  alt="Worker profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Information List */}
          <div className="px-4 py-2">
            <div className="space-y-2">
              <div className="flex items-center py-2 border-b border-gray-100">
                <div className="w-24 text-sm text-gray-500">Name</div>
                <div className="flex-1 font-medium">{worker.name}</div>
              </div>
              
              <div className="flex items-center py-2 border-b border-gray-100">
                <div className="w-24 text-sm text-gray-500">Email</div>
                <div className="flex-1 font-medium">{worker.email}</div>
              </div>

              <div className="flex items-center py-2 border-b border-gray-100">
                <div className="w-24 text-sm text-gray-500">Area</div>
                <div className="flex-1 font-medium">{worker.location_id.name}</div>
              </div>

              <div className="flex items-center py-2 border-b border-gray-100">
                <div className="w-24 text-sm text-gray-500">Category</div>
                <div className="flex-1 font-medium">{worker.category_id.categoryName}</div>
              </div>

              <div className="flex items-center py-2 border-b border-gray-100">
                <div className="w-24 text-sm text-gray-500">Contact</div>
                <div className="flex-1 font-medium">{worker.phoneNumber}</div>
              </div>

              <div className="flex items-center py-2 border-b border-gray-100">
                <div className="w-24 text-sm text-gray-500">ID Type</div>
                <div className="flex-1 font-medium">{worker.idCard}</div>
              </div>

              <div className="flex items-center py-2 border-b border-gray-100">
                <div className="w-24 text-sm text-gray-500">ID Number</div>
                <div className="flex-1 font-medium">{worker.idCardNum}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="p-4 border-t border-gray-100 sticky bottom-0 bg-white rounded-b-lg">
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                onApprove(worker._id);
                onClose();
              }}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Approve
            </button>
            <button
              onClick={() => {
                onReject(worker._id);
                onClose();
              }}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Reject
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default WorkerApproval;