import React from 'react'
import TextInput from '../../Form/InputText'
function Availability() {
  return (
    <>
      <TextInput
        name="availableDays"
        type="text"
        placeholder="available days"
      />
      <TextInput
        name="availableTime"
        type="text"
        placeholder="available time"
      />
    </>
  )
}

export default Availability