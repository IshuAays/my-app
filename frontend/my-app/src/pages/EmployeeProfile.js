import React from 'react';
import { useLocation } from 'react-router-dom';

export default function EmployeeProfile() {
  const location = useLocation();
  const { employee } = location.state; // Get employee data from the navigation state

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 mb-4">
        <img
          src={`https://via.placeholder.com/150`} // Placeholder image, replace with real URLs if available
          alt={employee.userName}
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-2xl font-bold">{employee.userName}</h1>
      <p className="mt-2 text-lg">Designation: {employee.Designation}</p>
      <p className="mt-2 text-lg">Email: {employee.userMail}</p>
      <p className="mt-2 text-lg">Contact: {employee.Contact}</p>
      {/* Add more fields as needed */}
    </div>
  );
}
