import React, { useState, useRef } from 'react';
import instance from '../../helper/axiosInstance';
import { useNavigate } from 'react-router-dom';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isActive, setIsActive] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const nav = useNavigate()
  
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    
    if (element.value !== '') {
      if (index < 3) {
        refs[index + 1].current.focus();
      }
    }
  };
  
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (index > 0 && otp[index] === '') {
        refs[index - 1].current.focus();
      }
    }
  };
  
  const handleResend = async () => {
    try {
      setIsResending(true);
      setStatus({ type: '', message: '' });
      
      // Simulate API call
        const res = await instance.get('/workers/resendOtp')      
      // Reset OTP and timer
      setOtp(['', '', '', '']);
      setTimer(30);
      setIsActive(true);
      
      // Focus first input
      refs[0].current.focus();
      
      setStatus({
        type: 'success',
        message: 'Verification code resent successfully'
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to resend verification code'
      });
    } finally {
      setIsResending(false);
    }
  };
  
  const handleVerify = async () => {
    try {
      setIsVerifying(true);
      setStatus({ type: '', message: '' });
      
      const otpString = otp.join('');
      
      // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 1500));
      const res = await instance.post('/workers/postSignup',{otp:otp})
      
      // Simulate verification check
      if (res.data.success) {
        setStatus({
          type: 'success',
          message: 'Verification successful'
        });
        // You could redirect here or trigger next step
        setTimeout(()=>{
          nav('/worker/signUp',{state:{message:"Your registration has been successfully submitted. Please wait while an admin verifies your account. You will receive a notification once your account has been approved."}})
        })
      } else {
        throw new Error('Invalid code');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Invalid verification code'
      });
      setOtp(['', '', '', '']);
      refs[0].current.focus();
    } finally {
      setIsVerifying(false);
    }
  };
  
  React.useEffect(() => {
    let interval = null;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">ProximiTask</h1>
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Verification Code</h2>
            <p className="text-gray-500 mt-2">
              We have sent a verification code to your phone
            </p>
          </div>
          
          <div className="flex flex-col items-center space-y-6">
            <div className="flex gap-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  ref={refs[index]}
                  value={data}
                  maxLength={1}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-14 h-14 text-center text-2xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isVerifying}
                />
              ))}
            </div>
            
            {status.message && (
              <div className={`text-sm ${
                status.type === 'success' ? 'text-green-600' : 'text-red-600'
              }`}>
                {status.message}
              </div>
            )}
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg 
                className="w-4 h-4"
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
            </div>
            
            <button
              onClick={handleResend}
              disabled={isActive || isResending || isVerifying}
              className={`w-full py-2 px-4 rounded-lg border border-gray-300 text-sm relative
                ${(isActive || isResending || isVerifying)
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              {isResending ? 'Resending...' : 'Resend Code'}
            </button>
            
            <button
              onClick={handleVerify}
              disabled={otp.includes('') || isVerifying || isResending}
              className={`w-full py-2 px-4 rounded-lg text-sm text-white flex items-center justify-center relative
                ${(otp.includes('') || isVerifying || isResending)
                  ? 'bg-blue-300 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {isVerifying ? 'Verifying...' : 'Verify'}
              {!isVerifying && (
                <svg 
                  className="ml-2 w-4 h-4" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;