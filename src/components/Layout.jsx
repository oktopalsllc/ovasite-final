import Link from 'next/link';

export default function Layout({ children }) {
  const tabs = [
    'Profile',
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
            <li key={tab} className='p-2'>
              <Link href={`/settings/${tab.toLowerCase()}`}>
                <a className='block cursor-pointer'>{tab}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='w-5/6 p-4'>{children}</div>
    </div>
  );
}
