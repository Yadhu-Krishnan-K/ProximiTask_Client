import React from 'react'
import TextInput from '../../Form/InputText'

function WorkDetails() {
  return (
    <>
      <TextInput
        name="workCategory"
        type="text"
        placeholder="workCategory"
      />
      <TextInput
        name="experience"
        type="text"
        placeholder="experience"
      />
    </>
  )
}

export default WorkDetails