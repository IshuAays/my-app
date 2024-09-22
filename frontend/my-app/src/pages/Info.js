import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion for animations
import { BeatLoader } from 'react-spinners';

export default function Info() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to track selected employee

  useEffect(() => {
    // Fetch employee data from the backend API
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/employees');  // Adjust the API endpoint if necessary
        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }
        const data = await response.json();

        // Sort employees by userName before setting the state
        const sortedEmployees = data.employees.sort((a, b) =>
          a.userName.localeCompare(b.userName)
        );

        setEmployees(sortedEmployees);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  if (loading) {
    return <div className='min-h-screen flex justify-center items-center'><BeatLoader color="#BB1CCC" /></div>;
  }

  if (error) {
    return <div className='min-h-screen flex justify-center items-center'>Error: {error}</div>;
  }

  const handleCardClick = (employee) => {
    setSelectedEmployee(employee); // Set the clicked employee as selected
  };

  const handleBackClick = () => {
    setSelectedEmployee(null); // Deselect the employee to go back
  };

  return (
    <div className="min-h-screen p-10 w-full flex">
      {/* Employee List */}
      <div className="flex flex-wrap mt-20 w-full min-h-screen space-x-10">
        {/* If an employee is selected, hide the list and show the selected employee's detail view */}
        <AnimatePresence>
          {!selectedEmployee && (
            <motion.div className="flex flex-wrap w-full justify-around"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {employees.map((employee, index) => (
                <motion.div
                  key={index}
                  className="text-center h-fit cursor-pointer m-4 login rounded-full flex flex-col justify-center items-center px-10 py-6"
                  whileHover={{ scale: 1.1 }} // Hover effect for cards
                  onClick={() => handleCardClick(employee)} // On card click, select employee
                >
                  {/* Circle for profile photo */}
                  <div className="w-24 h-24 rounded-full overflow-hidden">
                    <img
                      src={employee.image} // Placeholder image, replace with real URLs if available
                      alt={employee.userName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Name below the circle */}
                  <p className="mt-2 text-lg font-semibold">{employee.userName}</p>
                  <p className="mt-2 text-xs font-semibold">{employee.Designation}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Employee Detail View */}
        <AnimatePresence>
          {selectedEmployee && (
            <motion.div className="flex w-full flex-col lg:flex-row justify-between items-center"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Photo on the left */}
              <motion.div
                className="w-1/3 flex justify-center"
                initial={{ x: '-100vw' }} animate={{ x: 0 }} exit={{ x: '-100vw' }}
              >
                <div className="sm:w-[192px] sm:h-[192px] rounded-full overflow-hidden border-2 border-gray-300">
                  <img
                    src={selectedEmployee.image} // Placeholder image
                    alt={selectedEmployee.userName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Information on the right */}
              <motion.div
                className="w-2/3"
                initial={{ x: '100vw' }} animate={{ x: 0 }} exit={{ x: '100vw' }}
              >
                <div className='flex flex-col justify-center'>
                    <h1 className="text-3xl font-bold">{selectedEmployee.userName}</h1>
                    <p className="mt-2 text-lg font-bold">Designation: <span className='text-sm font-thin'>{selectedEmployee.Designation}</span> </p>
                    <p className="mt-2 text-lg font-bold">Email: <span className='text-sm font-thin'>{selectedEmployee.userMail}</span> </p>
                    <p className="mt-2 text-lg font-bold">Contact: <span className='text-sm font-thin'> {selectedEmployee.Contact}</span> </p>
                    <p className="mt-2 text-lg font-black">EmpId: <span className='text-sm font-thin'> {selectedEmployee.empId}</span> </p>
                </div>

                {/* Back button */}
                <button
                  className="mt-4 px-4 py-2 bg-red-700 text-white rounded-lg"
                  onClick={handleBackClick}
                >
                  Back
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
