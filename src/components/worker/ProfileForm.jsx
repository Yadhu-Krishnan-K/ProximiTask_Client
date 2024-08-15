import React from 'react';
import FormInput from './FormInput';

const ProfileForm = () =>{

  

  return(
    <form className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <FormInput label="First Name" id="firstName" type="text" />
      <FormInput label="Last Name" id="lastName" type="text" />
      <FormInput label="Nickname" id="nickname" type="text" />
      <FormInput label="Email" id="email" type="email" />
      <FormInput label="Phone Number" id="phoneNumber" type="tel" />
      <FormInput label="Location" id="location" type="text" />
      <FormInput label="Time Zone" id="timeZone" type="text" />
      
      <div className="flex items-center justify-between mt-6">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Save
        </button>
      </div>
    </form>
  );
} 

export default ProfileForm;