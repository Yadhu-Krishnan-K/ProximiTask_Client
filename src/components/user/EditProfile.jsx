import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { EditProfileModal } from './EditProfileModal';
import { TbUser } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";


const UserProfile = () => {
  const user = useSelector((state) => state.User.userData.user);
  const { userId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = (updatedUser) => {
    setEditedUser(updatedUser);
    setIsOpen(false);
    // You can also dispatch an action here to save the updated user profile to the backend
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">User not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-28 bg-white shadow-lg rounded-lg overflow-hidden p-2">
      {isOpen && (
        <EditProfileModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          user={editedUser}
          onSave={handleSave}
        />
      )}
      <h2 className="text-2xl font-bold">Profile</h2>
      <div className="p-6">
        <div className="space-y-4">
          <ProfileField label="Name" value={editedUser.name}><TbUser className='text-teal-600'/></ProfileField>
          <ProfileField label="Email" value={editedUser.email} ><MdOutlineEmail className='text-teal-600'/></ProfileField>
          {/* <ProfileField label="Contact Number" value={!editedUser?.contactNumber && '<!--please add a phone number-->'} ><FiPhone className='text-teal-600'/></ProfileField> */}
        </div>
        <div className="mt-8 flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            onClick={() => setIsOpen(true)}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value, children }) => (
  <div>
    <label className="block text-gray-700 text-sm font-semibold mb-1">{label}</label>
    <p className="text-gray-800 bg-gray-100 rounded-lg py-2 px-3 flex items-center">{children}<span style={{ paddingRight: 5 }}/>{value}</p>
  </div>
);

export default UserProfile;
