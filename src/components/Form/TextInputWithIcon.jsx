import { useField } from 'formik'
import React, { useState } from 'react'
import { FaEyeSlash, FaEye } from 'react-icons/fa'

function TextInputWithIcon({label,inputClassName,containerClassName,...props}) {
    let [showPassword, setShowPassword] = useState(false)
    const [field, meta] = useField(props)
  //   const [type,] = props
  function handlePasswordVisibility(){
    showPassword?
    setShowPassword(false)
    :setShowPassword(true)
  }
    return (
      <>
      <div className={`${containerClassName} `}>
          {label && <label className=''>{label}</label>}
          <input
          className={inputClassName}
              {...field}
              {...props}
            type={showPassword?'text':"password"}
          />
          <button type='button' onClick={handlePasswordVisibility}>
            {showPassword?<FaEyeSlash/>:<FaEye/>}
          </button>
      </div>
        {meta.touched && meta.error && (
            <div className="text-red-500 text-sm mt-1">{meta.error}</div>
        )}
      </>
    )
  }

export default TextInputWithIcon