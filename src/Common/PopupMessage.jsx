import React from 'react';
import { CheckCircle, X } from 'lucide-react';

const PopupMessage = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        <div className="flex items-center mb-4">
          <CheckCircle className="text-green-500 mr-3" size={24} />
          <h3 className="text-lg font-semibold">Request Sent</h3>
        </div>
        <p className="text-gray-600">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupMessage;