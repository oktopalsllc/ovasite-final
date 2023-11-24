'use client';
import { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import Employees from '@/components/orgs/Settings/Employees';
import OrgSettings from '@/components/orgs/Settings/Settings';
// import Employees from '@/components/Settings/Employees';
// import Employees from '@/components/Settings/Employees';

export default function Settings({params}: {params: {orgId: string}}) {
  const {orgId} = params;
  const [activeTab, setActiveTab] = useState('Profile');

  const tabs = [
    'Settings',
    'Employees',
    'Upgrade',
    'My Settings',
    'Organization',
    'Log out',
  ];

  return (
    <div className='h-screen flex'>
      <div className='w-1/6 bg-gray-200 py-8 pl-8 pr-0'>
        <button className='flex rounded-md text-white bg-[#001333] p-4 mt-6 mb-16'>
          <FaChevronLeft className='text-white h-6 w-6 mr-4' /> Back
        </button>
        <ul>
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`p-2 cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#001333] rounded-l-lg text-white text-lg pl-12 pr-6 py-6'
                  : ''
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
      <div className='w-5/6 p-8'>
        {activeTab === 'Settings' && (
          <div>
            {' '}
            <div>
              <OrgSettings />
            </div>
          </div>
        )}
        {activeTab === 'Employees' && (
          <div>
            <Employees />
          </div>
        )}
        {activeTab === 'Upgrade' && (
          <div>
            Notification{' '}
            <div>
              <Employees />
            </div>
          </div>
        )}
        {activeTab === 'My Settings' && (
          <div>
            My{' '}
            <div>
              <Employees />
            </div>
          </div>
        )}
        {activeTab === 'Organization' && (
          <div>
            {' '}
            <div>
              <Employees />
            </div>
          </div>
        )}
        {activeTab === 'Log out' && (
          <div>
            {' '}
            <div>
              <Employees />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
