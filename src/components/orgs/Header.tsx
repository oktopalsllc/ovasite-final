"use client";
import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { SiInkdrop } from 'react-icons/si';
import { LuBadgePlus } from 'react-icons/lu';
import { FaCog, FaUsers, FaPlusSquare, FaBell } from 'react-icons/fa';
import { RiArrowDropUpLine, RiArrowDropDownLine } from 'react-icons/ri';
import { useParams } from 'next/navigation';
import { getCurrentOrg, currentEmployee, getUserOrgs } from '@/services/employee-service/employee.service';
import { ImSpinner2 } from 'react-icons/im';

function Header() {
  const params = useParams();
  const { orgId } = params;
  const id = orgId.toString() || '';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = typeof window !== 'undefined' ? localStorage.getItem('userInfo') : "";
  const userInfo = JSON.parse(user as string);
  const userId = userInfo?.id as string;
  const [org, setOrg] = useState<any>({});
  const [userOrgs, setUserOrgs] = useState<any>([]);
  const [loaded, setLoaded] = useState(false);
  const [emp, setEmp] = useState<any>({});
  const [loadUser, setLoadUser] = useState(false);
  const [orgsLoaded, setOrgsLoaded] = useState(false);

  const currentOrg = useCallback(async () => {
    try {
      const org = await getCurrentOrg(id);
      if (org) {
        setOrg(org);
        setLoaded(true);
      }
    }
    catch (err) {
      console.log(err)
    }
  }, [id]);

  const getEmployee = useCallback(async () => {
    try {
      const emp = await currentEmployee(id, userId);
      if (emp) {
        setEmp(emp);
        setLoadUser(true);
      }
    }
    catch (err) {
      console.log(err)
    }
  }, [id, userId]);

  const getCurrOrgs = useCallback(async () => {
    try {
      const userOrgs = await getUserOrgs(userId);
      if (userOrgs) {
        setUserOrgs(userOrgs);
        setOrgsLoaded(true);
      }
    }
    catch (err) {
      console.log(err)
    }
  }, [userId]);

  useEffect(() => {
    currentOrg();
    getEmployee();
    getCurrOrgs();
  },[]);

  return (
    <div className='px-4 py-5 mx-auto sm:max-w-full md:max-w-full lg:max-w-full md:px-24 lg:px-10 bg-white'>
      <div className='relative flex items-center justify-between'>
        {loaded ?
          <div className='flex items-center'>
            <Link
              href='/'
              aria-label='Ovasite'
              title='Ovasite'
              className='inline-flex items-center mr-8'
            >
              <Image alt='Logo' src='/Logo.png' width={20} height={20} />
            </Link>

            {/* ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨ */}
            <div className='relative flex items-center hidden lg:flex'>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className='font-medium tracking-wide text-gray-700 transition-colors duration-200 flex items-center'
              >
                {org.name}{' '}
                {dropdownOpen ? (
                  <RiArrowDropUpLine className=' text-[#001333] h-6 w-6 ' />
                ) : (
                  <RiArrowDropDownLine className=' text-[#001333] h-6 w-6 ' />
                )}
              </button>

              {dropdownOpen && (
                <div className='absolute z-10 mt-2 bg-white border rounded p-4 w-[250px] sh shadow-2xl top-6 left-10 overflow-y-auto h-[250px]'>
                  <Link
                    href={`/orgs/${id}`}
                    className='flex items-center px-4 bg- py-2 text-sm text-white opacity-60 bg-[#001333] rounded'
                  >
                    <SiInkdrop className='mr-2 text-[#fff]' /> {org.name || ''}
                  </Link>
                  <>
                    {loadUser ?
                      <>
                        {emp.role === 'ADMIN' || emp.role === 'OWNER' &&
                          <>
                            <Link
                              href={`/orgs/${id}`}
                              className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                            >
                              <FaCog className='mr-2 text-[#001333]' />Organization Settings
                            </Link>
                            {/* <Link
                                href={`/orgs/${id}`}
                                className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                              >
                                <LuBadgePlus className='mr-2 text-[#001333]' /> Upgrade
                              </Link>
                              <Link
                                href={`/orgs/${id}`}
                                className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                              >
                                <FaUsers className='mr-2 text-[#001333]' /> Manage Users
                              </Link> */}
                          </>
                        }
                        <Link
                          href={`/orgs/${id}/employees/${emp.id}`}
                          className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        >
                          <FaCog className='mr-2 text-[#001333]' /> Profile Settings
                        </Link>
                      </> : <ImSpinner2 className='h-6 w-6 animate-spin' />
                    }
                  </>
                  <div className='border-t border-gray-200 mt-4'>
                    {' '}
                    <Link
                      href='/orgs/create-org'
                      className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    >
                      <FaPlusSquare className='mr-2 text-[#001333]' /> New
                      Organization
                    </Link>
                  </div>
                  <div className='border-t border-gray-200 mt-4'>
                    {' '}
                    {orgsLoaded && userOrgs.map((org: any) => (
                      <Link
                        key={org.id}
                        href={`/orgs/${org.id}/projects`}
                        replace={true}
                        className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      >
                        <SiInkdrop className='mr-2 text-[#fff]' /> {org.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨ */}
          </div>
          :
          <ImSpinner2 className='h-6 w-6 animate-spin' />
        }

        <div className='flex items-center hidden space-x-8 lg:flex'>
          {loadUser ?

            <>
              <span
                className='font-medium tracking-wide text-gray-700 transition-colors duration-200'
              >
                {emp.fullName || emp.id}
              </span>
              {emp.avatar ?
                <>
                  <Link
                    href={`/user/${userInfo.id}`}
                    className='inline-flex items-center justify-center h-6 w-6 font-medium tracking-wide text-white transition duration-200 rounded-full shadow-md   focus:shadow-outline focus:outline-none bg-[#ddd]'
                  >

                    <Image
                      src={emp.avatar}
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </Link>
                </> : <Link
                  href={`/users/${userInfo.id}`}
                  className='inline-flex items-center justify-center h-6 w-6 font-medium tracking-wide text-white transition duration-200 rounded-full shadow-md   focus:shadow-outline focus:outline-none bg-[#ddd]'
                >

                </Link>
                }
            </>
            : <ImSpinner2 className='h-6 w-6 animate-spin' />
          }


        </div>
        <div className='lg:hidden'>
          <button
            aria-label='Open Menu'
            title='Open Menu'
            className='p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline'
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
