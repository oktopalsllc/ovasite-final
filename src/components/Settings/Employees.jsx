import React, { useState } from 'react';
import { AiOutlineDown, AiOutlineCheck } from 'react-icons/ai';

const EmployeeManagement = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Member'); // Default option

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const dropdownOptions = [
    { name: 'Member', description: 'Access for team members' },
    { name: 'Guest', description: 'Limited access' },
    { name: 'Admin', description: 'Full access' },
  ];

  const employees = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'Member',
    },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Guest' },
    // Add more employee data here...
  ];

  return (
    <div className='h-screen flex flex-col'>
      <div className='flex justify-between p-4'>
        {/* First Search Bar */}
        <div className='flex-1 p-2'>
          <input
            type='search'
            className='w-full h-10 px-4 border rounded'
            placeholder='Search by email...'
          />
        </div>

        {/* Second Half of the Container */}
        <div className='flex-1 flex'>
          {/* Second Search Bar */}
          <div className='flex-1 pl-2 py-2'>
            <input
              type='search'
              className='w-full h-10 px-4 border rounded'
              placeholder='Invite by email...'
            />
          </div>

          {/* Buttons */}
          <div className='flex-1 flex py-1'>
            {/* Dropdown Button */}
            <div className='flex-1 p-2 relative'>
              <button
                className='flex items-center justify-center w-full h-10 border'
                onClick={toggleDropdown}
              >
                {selectedOption}
                <AiOutlineDown className='ml-4' />
              </button>

              {/* Dropdown Content */}
              {isDropdownOpen && (
                <div className='absolute left-0 mt-2 bg-white border z-10 rounded shadow-lg w-[200px] '>
                  {dropdownOptions.map((option) => (
                    <div
                      key={option.name}
                      className={` hover:bg-gray-100 p-4 ${
                        selectedOption === option.name ? 'bg-blue-100' : ''
                      }`}
                      onClick={() => handleOptionClick(option.name)}
                    >
                      {option.name}
                      <div className='flex'>
                        <small className='block text-gray-500'>
                          {option.description}
                        </small>
                        {selectedOption === option.name && (
                          <AiOutlineCheck className='inline ml-8 h-4 w-4' />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Normal Button */}
            <div className='flex-1 p-2 px-0'>
              <button className='py-2 px-4 bg-[#001333] text-white rounded'>
                Invite
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className='flex-1 overflow-auto'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr>
              <th className='p-4 border-b'>Name</th>
              <th className='p-4 border-b'>Email</th>
              <th className='p-4 border-b'>Role</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className='p-4 border-b'>{employee.name}</td>
                <td className='p-4 border-b'>{employee.email}</td>
                <td className='p-4 border-b'>
                  {/* ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨ */}

                  {/* ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨ */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeManagement;
