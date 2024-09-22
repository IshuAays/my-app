// src/pages/Contact.js
import React from 'react';
import { useNavigate } from 'react-router-dom';



const HrStuff = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen w-screen mb-10'>
      <div className="Contact mt-[100px] flex  flex-col flex-wrap justify-around items-center text-sm  space-y-10">
          <button className='bg-[#BB1CCC] w-60 h-14 hover:scale-105 transition-transform duration-300' onClick={() => navigate('/jd-create')}>Job Description Creator</button>
          <button className='bg-[#BB1CCC] w-60 h-14 hover:scale-105 transition-transform duration-300' onClick={() => navigate('/ats')}>ATS Score Calculator</button>
          <button className='bg-[#BB1CCC] w-60 h-14 hover:scale-105 transition-transform duration-300' onClick={() => navigate('/info')}>Check Employee Details</button>
          <button className='bg-[#BB1CCC] w-60 h-14 hover:scale-105 transition-transform duration-300' onClick={() => navigate('/band-width')}>Interview Shortlisting</button>
          <button className='bg-[#BB1CCC] w-60 h-14 hover:scale-105 transition-transform duration-300' onClick={() => navigate('/resume-builder')}>Resume Builder</button>
      </div>
    </div>
  );
};

export default HrStuff;
