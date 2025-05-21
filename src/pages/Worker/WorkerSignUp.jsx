import React, { useEffect, useState } from 'react'
import {Form, Formik, useFormikContext} from 'formik'
import { validationSchema, workerInitialValues } from '../../components/Form'
import InitialSignup from '../../components/worker/Auth/InitialSignup'
import ModalRegister from '../../components/worker/ModalSliderForRegistration'
import LoginComponent from '../../components/worker/Auth/LoginComponent'


const LogFormikValuesOnModalOpen = ({ showModal }) => {
  const { values } = useFormikContext()

  useEffect(() => {
    if (showModal) {
      console.log("InitialSignup values when modal opens:", values)
    }
  }, [showModal])

  return null
}


function WSignUp() {
  const [showLogin, setShowLogin] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className='w-full h-screen flex justify-between overflow-hidden bg-[#F4F4F4]'>
        <div className='w-full h-screen relative hidden md:block'>
          <img src="/Polygon.png" alt="spraying water" className='slide-in-left h-screen w-full sm:shrink-0'/>
          <h3 className='text-3xl font-bold absolute top-2 left-2 text-amber-50'>ProximiTask</h3>
        </div>
        <div className={`transition-all ${showLogin ? 'blur-lg pointer-events-none' : ''} w-full flex justify-center relative`}>
          <Formik
            initialValues = {workerInitialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log("Final submit:", values)}
          >
            {({ validateForm, setTouched }) => (
            <Form>
              <LogFormikValuesOnModalOpen showModal={showModal}/>
              <div className={`transition-all ${showModal ? 'blur-sm pointer-events-none' : ''} sm:w-sm md:w-lg`}>
                <img src="/FinalLogo.png" alt="logo" className='md:hidden w-36 transition-all duration-300 ease-in-out ' />
                <InitialSignup 
                  openModal={setShowModal} 
                  openLogin={setShowLogin} 
                  validateForm={validateForm}
                  setTouched={setTouched} 
                />
              </div>
              {showModal&&<ModalRegister onClose={setShowModal} />}
            </Form>
            )}
          </Formik>
        </div>
        {showLogin && <LoginComponent onClose={setShowLogin}/>}
      </div>
    </>
  )
}

export default WSignUp