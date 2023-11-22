'use client';
import Employees from '@/components/Settings/Employees';
import { useState } from 'react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Profile');

  const tabs = [
    'Settings',
    'Employees',
    'Notifications',
    'Security',
    'Preferences',
  ];

  return (
    <div className='h-screen flex'>
      <div className='w-1/6 bg-gray-200 p-4'>
        <ul>
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`p-2 cursor-pointer ${
                activeTab === tab ? 'bg-gray-400' : ''
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
      <div className='w-5/6 p-4'>
        {activeTab === 'Settings' && <div>Settings</div>}
        {activeTab === 'Employees' && (
          <div>
            <Employees />
          </div>
        )}
        {activeTab === 'Notifications' && <div>Notification Settings</div>}
        {activeTab === 'Security' && <div>Security Settings</div>}
        {activeTab === 'Preferences' && <div>Preference Settings</div>}
      </div>
    </div>
  );
}
