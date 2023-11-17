import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { FaSearch, FaBell } from 'react-icons/fa';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='px-4 pt-2 mx-auto sm:max-w-full md:max-w-full lg:max-w-full md:px-24 lg:px-8 bg-white'>
      <div className='relative flex items-center justify-between'>
        <div className='flex items-center'>
          <Link
            href='#'
            aria-label='Ovasite'
            title='Ovasite'
            className='inline-flex items-center mr-8'
          >
            <Image alt='Logo' src='/Logo.png' width={40} height={40} />
          </Link>

          <div className='flex items-center hidden space-x-8 lg:flex'>
            <Link
              href='#'
              className='font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
            >
              Organization
            </Link>
          </div>
        </div>

        <div className='flex items-center hidden space-x-8 lg:flex'>
          <FaBell className='text-xl text-gray-800' />
          <Link
            href='#'
            className='font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
          >
            User
          </Link>

          <Link
            href='#'
            className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-full shadow-md   focus:shadow-outline focus:outline-none'
          ></Link>
        </div>
        <div className='lg:hidden'>
          <button
            aria-label='Open Menu'
            title='Open Menu'
            className='p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50'
            onClick={() => setIsMenuOpen(true)}
          >
            <GiHamburgerMenu className='w-5 text-gray-600' />
          </button>
          {isMenuOpen && (
            <div className='absolute top-0 left-0 w-full'>
              <div className='p-5 bg-white border rounded shadow-sm'>
                <div className='flex items-center justify-between mb-4'>
                  <div>
                    <Link href='#' className='inline-flex items-center'>
                      <Image
                        alt='Logo'
                        className='w-8 text-deep-purple-accent-400'
                        src='/Logo.png'
                        width={40}
                        height={40}
                      />
                    </Link>
                  </div>
                  <div>
                    <button
                      aria-label='Close Menu'
                      title='Close Menu'
                      className='p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <IoClose className='w-5 text-gray-600' />
                    </button>
                  </div>
                </div>
                <nav>
                  <div className='space-y-4'>
                    <Link
                      href='#'
                      className='font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                    >
                      Organzation
                    </Link>

                    <Link
                      href='#'
                      className='inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none'
                    >
                      Sign up
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
