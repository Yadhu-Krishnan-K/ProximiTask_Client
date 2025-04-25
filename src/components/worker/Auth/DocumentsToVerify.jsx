import React from 'react'
import TextInput from '../../Form/InputText'
import FileInput from '../../Form/FileInput'

function DocumentsToVerify() {
  return (
      <FileInput 
        name="documentFile"
        placeholder="documents"
      />
  )
}

export default DocumentsToVerify