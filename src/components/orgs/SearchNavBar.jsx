import React, { useState } from 'react';
import { FaSearch, FaBell } from 'react-icons/fa'; // Import icons from React Icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for dropdown

  return (
    <nav className=' w-full'>
      <div className='min-w-full px-4'>
        <div className='flex justify-between'>
          {/* Search input */}
          <div className='flex items-center w-3/4 md:w-3/5 lg:w-3/4'>
            <input
              type='search'
              className='w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none'
              placeholder='Search...'
            />
          </div>
          <div className='flex items-center space-x-4'>
            {/* Icons */}
            <FaSearch className='text-xl text-gray-800' />
            <FaBell className='text-xl text-gray-800' />

            {/* Dropdown Button */}
            <div className='relative'>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className='px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300'
              >
                Add New
              </button>
              {isOpen && (
                <div className='absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl'>
                  <a
                    href='#'
                    className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
                  >
                    Option 1
                  </a>
                  <a
                    href='#'
                    className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
                  >
                    Option 2
                  </a>
                  <a
                    href='#'
                    className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
                  >
                    Option 3
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
