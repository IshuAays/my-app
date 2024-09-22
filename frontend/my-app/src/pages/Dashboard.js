import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeavePieChart from '../Components/LeavePieChart';
import { FaUser } from 'react-icons/fa';
import '../CSS/Dashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LOGOUT } from '../redux/actions'; // Adjust the import based on your action type

const Dashboard = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [aadharFile, setAadharFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [passbookFile, setPassbookFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!aadharFile || !panFile || !passbookFile) {
      alert('Please upload all required documents');
      return;
    }

    const formData = new FormData();
    formData.append('aadhar', aadharFile);
    formData.append('pan', panFile);
    formData.append('passbook', passbookFile);
    formData.append('userName', userData.user.user.userName);

    try {
      const response = await axios.post('/upload-docs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Files uploaded successfully!');
      } else {
        alert('Failed to upload files');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files');
    }
  };


  return (
    <div className="Dashboard mt-[100px] sm:mt-[180px] px-4">
      <h1 className="text-3xl sm:text-5xl mb-5 text-center">Welcome {userData.user.user.userName}</h1>
    

      <div className="flex flex-col sm:flex-row sm:justify-between sm:w-screen sm:p-14 space-y-8 sm:space-y-0">
        <div className="profile border w-full sm:w-[550px] h-auto sm:h-[200px] rounded-3xl flex flex-col sm:flex-row items-center sm:pl-8 p-4 sm:p-0">
          <div className="border rounded-full w-[150px] h-[150px] flex justify-center items-center overflow-clip mb-4 sm:mb-0">
            <img src={userData.user.user.image} alt='user photo'/>
          </div>

          <ul className="w-full sm:w-2/3 flex flex-col p-0 sm:p-5 items-start text-center sm:text-left font-thin text-base space-y-1">
            <li>Name: <span className="font-semibold">{userData.user.user.userName}</span></li>
            <li>EmpID: <span className="font-semibold">{userData.user.user.empId}</span></li>
            <li>Designation: <span className="font-semibold">{userData.user.user.Designation}</span></li>
            <li>Mail ID: <span className="font-semibold">{userData.user.user.userMail}</span></li>
            <li>Contact: <span className="font-semibold">{userData.user.user.Contact}</span></li>
          </ul>
        </div>

        <div className="flex justify-center sm:mr-10">
          <LeavePieChart
            sickLeave={userData.user.user.sickLeave || 7}
            earnedLeave={userData.user.user.earnedLeave || 15}
          />
        </div>
      </div>

      <div className="flex justify-center flex-col items-center mt-10 sm:mt-14">
        <div className="w-fit text-center">
          <p className="font-bold text-2xl">Upload your Document</p>
          <div className="w-full h-1 bg-[#BB1CCC] rounded"></div>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 login px-20 py-10">
          <div className="mb-5 flex justify-between">
            <label htmlFor="aadhar" className="block text-lg font-medium w-2/3">Aadhar Card:</label>
            <input 
              type="file" 
              id="aadhar" 
              accept=".pdf,.jpg,.png" 
              onChange={(e) => setAadharFile(e.target.files[0])}
              required
              className="mt-1 block text-sm w-full"
            />
          </div>

          <div className="mb-5 flex justify-between">
            <label htmlFor="pan" className="block text-lg font-medium w-2/3">PAN Card:</label>
            <input 
              type="file" 
              id="pan" 
              accept=".pdf,.jpg,.png" 
              onChange={(e) => setPanFile(e.target.files[0])}
              required
              className="mt-1 block text-sm w-full"
            />
          </div>

          <div className="mb-5 flex justify-between">
            <label htmlFor="passbook" className="block text-lg font-medium w-2/3">Bank Passbook:</label>
            <input 
              type="file" 
              id="passbook" 
              accept=".pdf,.jpg,.png" 
              onChange={(e) => setPassbookFile(e.target.files[0])}
              required
              className="mt-1 block text-sm w-full"
            />
          </div>

          <button type="submit" className="bg-[#BB1CCC] text-white py-2 px-4 rounded mt-10">Submit</button>
        </form>
      </div>

      <div className="mt-28 mb-10 flex flex-col justify-center items-center">
        <div className="mb-10">
          <p className="font-bold text-2xl">Want Leave?</p>
        </div>
        <div className="">
          <button className="bg-blue-500 font-bold text-white py-2 px-4 rounded">
            <a
              href="https://forms.office.com/pages/responsepage.aspx?id=QDoj-Rr7TUa4WpWeOrjkVMgpgQ9s7dBEiEcwcftlEq9UMjJKTUtPOUlESVFWVDQ3UEUxTE0ySjc1NSQlQCN0PWcu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply for Leave
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
