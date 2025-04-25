import TextInput from '../../Form/InputText'
import TextInputWithIcon from '../../Form/TextInputWithIcon'
import React from 'react'

function InitialSignup({openModal, openLogin, validateForm, setTouched}) {

  const handleContinue = async () => {
    const errors = await validateForm()
    console.log('errrors === ',errors)
    if (!errors.fullName && !errors.email && !errors.password) {
      console.log('no problems.....')
      openModal(true)  // All fields are valid, open modal
    } else {
      // Mark all fields as touched so validation messages appear
      setTouched({
        fullName: true,
        email: true,
        password: true
      })
    }
  }

  return (
            <>
            
              <div className='text-center pt-24'>
                <h2 className='text-3xl font-bold'>
                  Create an account
                </h2>
              </div>
              <TextInput 
                name='fullName'
                type='text'
                placeholder='Full Name'
                className="border-b-2 border-b-blue-500 placeholder-blue-400 text-blue-500 w-full focus:outline-none mt-16"
              />
              <TextInput
                name='email'
                type='email'
                placeholder='Email'
                className="border-b-2 border-b-blue-500 placeholder-blue-400 text-blue-500 w-full focus:outline-none mt-4"
              />
              <TextInputWithIcon 
                name='password'
                type='password'
                placeholder='password'
                inputClassName="placeholder-blue-400 text-blue-500  focus:outline-none w-full"
                containerClassName=" w-full flex justify-between border-b-2 border-b-blue-500 mt-8"
              />
              <button
               type='button'
               onClick={handleContinue} 
               className='w-full bg-[#3F7AEE] text-white hover:bg-[#8f85eb] mt-16 py-2 font-bold rounded-lg' 
              >
                Continue Registering
              </button>
              <br /><br />
              <span> Already have an account? </span>
              <button
                onClick={()=>{openLogin(true)}} 
                type='button'
                className='text-blue-400'
              >
                Login
              </button>
            </>
  )
}

export default InitialSignup