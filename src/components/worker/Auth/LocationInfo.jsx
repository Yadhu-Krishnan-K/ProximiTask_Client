import React from 'react'
import TextInput from '../../Form/InputText'

function LocationInfo() {
  return (
    <>
      <TextInput 
        name='city'
        type='text'
        placeholder='city'

      />
      <TextInput 
        name='district'
        type='text'
        placeholder='district'

      />
      <TextInput 
        name='state'
        type='text'
        placeholder='state'

      />
      <TextInput 
        name='pincode'
        type='text'
        placeholder='pincode'

      />
      <TextInput 
        name='latitude_longitude'
        type='text'
        placeholder='latitude_longitude'

      />
    </>
  )
}

export default LocationInfo