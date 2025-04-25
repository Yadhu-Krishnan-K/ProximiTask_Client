import React from 'react'
import { useField } from 'formik'

function InputText({label,...props}) {
  const [field, meta] = useField(props)
//   const [type,] = props
  return (
    <div className='mb-4'>
        {label && <label className=''>{label}</label>}
        <input
            {...field}
            {...props}
        />
        {meta.touched && meta.error && (
            <div className="text-red-500 text-sm mt-1">{meta.error}</div>
        )}
    </div>
  )
}

export default InputText