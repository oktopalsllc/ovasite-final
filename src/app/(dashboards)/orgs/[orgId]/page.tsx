/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useCallback, useEffect } from 'react';
import Employees from '@/components/orgs/Settings/Employees';
import OrgSettings from '@/components/orgs/Settings/Settings';
import Invites from '@/components/orgs/Settings/Invites';
import BackBtn from '@/components/shared/BackBtn';
import {
  currentEmployee
} from '@/services/employee-service/employee.service';

export default function OrgPage({ params }: { params: { orgId: string } }) {
  const { orgId } = params;
  const [activeTab, setActiveTab] = useState('Employees');
  const [active, setActive] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [emp, setEmp] = useState<any>({});
  const [loadUser, setLoadUser] = useState(false);
  const user = typeof window !== 'undefined' ? localStorage.getItem('userInfo') : "";
  const userInfo = user ? JSON.parse(user) : null;
  const userId = userInfo?.id as string;
  const [tabs, setTabs] = useState<string[]>([]);

  const getEmployee = useCallback(async () => {
    try {
      const emp = await currentEmployee(orgId, userId);
      if (emp) {
        setEmp(emp);
        setLoadUser(true);
      }
    }
    catch (err) {
      console.log(err)
    }
  }, [orgId, userId]);

  // useEffect(() => {
  //   getEmployee();
  // }, [getEmployee]);

  // let tabs: string[] = [];

  // if (loadUser) {
  //   if (emp.role === 'OWNER' || emp.role === 'ADMIN') {
  //     tabs = ['Employees', 'Invites', 'Projects', 'Settings'];
  //   } else {
  //     tabs = ['Employees', 'Invites', 'Projects'];
  //   }
  //   setLoaded(true);
  // }

  useEffect(() => {
    // Ensure we have the user information before triggering any actions
    if (loadUser) {
      if (emp.role === 'OWNER' || emp.role === 'ADMIN') {
        setTabs(['Employees', 'Invites', 'Projects', 'Settings']);
      } else {
        setTabs(['Employees', 'Invites', 'Projects']);
      }
      setLoaded(true); // Set loaded state when necessary
    } else {
      getEmployee(); // Fetch employee information when user data is not yet loaded
    }
  }, [loadUser, emp.role, getEmployee]); // Depend on relevant variables

  const items = [
    { id: 1, name: 'Employees' },
    { id: 2, name: 'Invites' },
    { id: 3, name: 'Projects' },
    { id: 4, name: 'Settings' },
  ];

  const ActiveItem = () => {
    switch (active) {
      case 1:
        return '';
      case 2:
        return '';
      case 3:
        return '';
      case 4:
        return '';
      default:
        return '';
    }
  };

  return (
    <div className='h-screen flex'>
      <div className='w-1/6 bg-gray-200 py-8 pl-8 pr-0'>
        <BackBtn />
        <ul className='lg:pt-8'>
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`p-2 cursor-pointer ${activeTab === tab
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
      <div className='w-5/6 p-2'>
        {activeTab === 'Employees' && (
          <div>
            <Employees orgId={orgId} emp={emp} />
          </div>
        )}
        {activeTab === 'Invites' && (
          <div>
            <Invites orgId={orgId} />
          </div>
        )}
      </div>
    </div>
  );
}
