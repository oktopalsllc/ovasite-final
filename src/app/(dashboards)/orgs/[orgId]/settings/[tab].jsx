// pages/settings/[tab].tsx
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const tabs = [
  { name: 'Employees', href: '/settings/employees' },
  { name: 'Account', href: '/settings/account' },
  { name: 'Preferences', href: '/settings/preferences' },
  { name: 'Security', href: '/settings/security' },
  { name: 'Notifications', href: '/settings/notifications' },
];

export default function SettingsPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(tabs[0].href);

  const handleTabClick = (href) => {
    setSelectedTab(href);
    router.push(href);
  };

  return (
    <div className='flex h-screen'>
      <div className='w-1/6 bg-gray-200 p-4'>
        <ul>
          {tabs.map((tab) => (
            <li
              key={tab.name}
              className={`cursor-pointer p-2 ${
                selectedTab === tab.href ? 'bg-gray-400' : ''
              }`}
              onClick={() => handleTabClick(tab.href)}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>
      <div className='w-5/6 p-4'>
        {/* Content based on selected tab */}
        {selectedTab === '/settings/employees' && <div>Employees Content</div>}
        {selectedTab === '/settings/account' && <div>Account Content</div>}
        {selectedTab === '/settings/preferences' && (
          <div>Preferences Content</div>
        )}
        {selectedTab === '/settings/security' && <div>Security Content</div>}
        {selectedTab === '/settings/notifications' && (
          <div>Notifications Content</div>
        )}
      </div>
    </div>
  );
}
