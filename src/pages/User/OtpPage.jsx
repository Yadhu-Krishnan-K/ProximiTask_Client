import React, { useState, useRef, useEffect } from 'react';
import instance from '../../helper/axiosInstance';
import { useNavigate } from 'react-router-dom';

const OTPPage = () => {
  const nav = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  let initialTimeout = localStorage.getItem('resendTimeout') ? parseInt(localStorage.getItem('resendTimeout'), 10) : 30;
  const [resendTimeout, setResendTimeout] = useState(initialTimeout);
  const [standard, setStandard] = useState(true)
  const [isOtpExpired, setIsOtpExpired] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    localStorage.setItem('resendTimeout', 30)
    if (resendTimeout > 0) {
      const timer = setInterval(() => {
        setResendTimeout((prevTimeout) => {
          const newTimeout = prevTimeout - 1;
          localStorage.setItem('resendTimeout', newTimeout); // Save the new timeout value to local storage

          if (newTimeout <= 0) {
            clearInterval(timer);
            setIsOtpExpired(true);
            localStorage.removeItem('resendTimeout'); // Remove from local storage when expired
            return 0;
          }

          return newTimeout;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setIsOtpExpired(true);
    }

  }, [standard]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    instance.post('/users/signup', {
      otp: enteredOtp,
    })
      .then((res) => {
        if (res.data.success) {
          nav('/UserLogin');
        }
        localStorage.removeItem('resendTimeout'); 

      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  const handleResendOtp = () => {
    instance.post('/users/resend-otp')
      .then((res) => {
        if (res.data.success) {
          setOtp(['', '', '', '']);
          setResendTimeout(30);
          localStorage.setItem('resendTimeout', 30);
          setIsOtpExpired(false);
          setStandard((prev)=>!prev)
        }
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-4 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={inputRefs[index]}
                className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={otp.some(digit => digit === '') || isOtpExpired}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </form>
        {isOtpExpired && (
          <div className="mt-4 text-center">
            <p className="text-red-600">OTP has expired. Please resend OTP.</p>
            <button
              onClick={handleResendOtp}
              className="mt-2 py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Resend OTP
            </button>
          </div>
        )}
        {!isOtpExpired && (
          <div className="mt-4 text-center">
            <p className="text-gray-600">Resend OTP in {resendTimeout} seconds</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OTPPage;
