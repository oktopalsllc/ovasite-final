import Link from 'next/link';

const tabs = ['profile', 'account', 'notifications', 'security', 'preferences'];

export default function SettingsTab({ activeTab }) {
  return (
    <div className='h-screen flex'>
      <div className='w-1/6 bg-gray-200 p-4'>
        <ul>
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`p-2 ${activeTab === tab ? 'bg-gray-400' : ''}`}
            >
              <Link href={`/settings/${tab}`}>
                <a className='block cursor-pointer'>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='w-5/6 p-4'>
        {activeTab === 'profile' && <div>Profile Settings</div>}
        {activeTab === 'account' && <div>Account Settings</div>}
        {activeTab === 'notifications' && <div>Notification Settings</div>}
        {activeTab === 'security' && <div>Security Settings</div>}
        {activeTab === 'preferences' && <div>Preference Settings</div>}
      </div>
    </div>
  );
}
