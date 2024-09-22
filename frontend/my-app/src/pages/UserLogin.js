import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/actions';  // Ensure this matches your action creator
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css';
import toast from 'react-hot-toast';

const UserLogin = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Add forgot password state
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate email
    if (!email.includes('@aaysinsight.com')) {
      toast.error("Use your company registered email");
      setError('Use your company registered email');
      return;
    }

    // Validate password if not in forgot password mode
    if (!isForgotPassword && !password) {
      toast.error("Password is required");
      setError('Password is required');
      return;
    }

    try {
      const response = await fetch('/api/check-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMail: email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Login Failed")
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      console.log(data);

      if (!data.exists) {
        setError(data.error || 'Invalid login details');
        toast.error("Invalid login details")
        return;
      }

      // Dispatch user data to Redux store
      dispatch(setUserData(data));  // Update the store with user data

      setIsLoggedIn(true);
      setMessage('Login successful');
      toast.success("Login Successful")
      navigate('/dashboard');
    } catch (err) {
      console.error('Error:', err.message);
      setError('An error occurred: ' + err.message);
    }
  };

  return (
    <div className='w-full h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8'>
      <div className="login w-full max-w-lg flex flex-col space-y-8 justify-center items-center pb-5 bg-gray-800 p-6 rounded-md shadow-lg">
        <h1 className='text-3xl font-bold text-white'>{isForgotPassword ? 'Forgot Password' : 'Login'}</h1>
        <form onSubmit={handleSubmit} className='w-full flex flex-col space-y-4'>
          <div className="form-group flex flex-col sm:flex-row items-center sm:justify-between text-black">
            <label className='text-lg text-white mb-2 sm:mb-0 sm:w-1/3' htmlFor="email">Email:</label>
            <input
              className='w-full sm:w-2/3 h-[40px] text-sm border border-gray-300 rounded px-2'
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          {!isForgotPassword && (
            <div className="form-group flex flex-col sm:flex-row items-center sm:justify-between text-black">
              <label className='text-lg text-white mb-2 sm:mb-0 sm:w-1/3' htmlFor="password">Password:</label>
              <input
                className='w-full sm:w-2/3 h-[40px] text-sm border border-gray-300 rounded px-2'
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}
          <button className='bg-[#BB1CCC] text-white py-2 rounded font-bold hover:bg-[#a11dbd] transition duration-300'>
            {isForgotPassword ? 'Send Reset Link' : 'Login'}
          </button>
          <div className="toggle text-center">
            {isForgotPassword ? (
              <p
                className='text-sm text-blue-500 hover:cursor-pointer hover:underline'
                onClick={() => setIsForgotPassword(false)}
              >
                Back to Login
              </p>
            ) : (
              <p
                className='text-sm text-blue-500 hover:cursor-pointer hover:underline'
                onClick={() => setIsForgotPassword(true)}
              >
                Forgot Password?
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
