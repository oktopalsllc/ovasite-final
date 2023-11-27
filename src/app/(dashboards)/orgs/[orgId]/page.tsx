/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useCallback, useEffect } from 'react';
import Employees from '@/components/orgs/Settings/Employees';
import Settings from '@/components/orgs/Settings/Settings';
import Insights from '@/components/orgs/Settings/Insights';
import Projects from '@/components/orgs/Settings/Projects';
import Invites from '@/components/orgs/Settings/Invites';
import BackBtn from '@/components/shared/BackBtn';
import {
  currentEmployee,
  getCurrentOrg
} from '@/services/employee-service/employee.service';
import { Separator } from "@/components/form/ui/separator";
import { ImSpinner2 } from 'react-icons/im';

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

  useEffect(() => {
    if (loadUser) {
      if (emp.role === 'OWNER' || emp.role === 'ADMIN') {
        setTabs(['Employees', 'Invites', 'Projects', 'Insights', 'Profile']);
      } else {
        setTabs(['Employees', 'Invites', 'Projects', 'Insights']);
      }
      setLoaded(true);
    } else {
      getEmployee();
    }
  }, [loadUser, emp.role, getEmployee]);

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
    <div className='min-h-[100vh] flex flex-col'>
      <div className='w-full pt-5 flex flex-row justify-between'>
        <h2 className='text-2xl font-bold col-span-2'>
          Settings
        </h2>
        <BackBtn />
      </div>
      <Separator className="my-3" />
      <div className='flex flex-col w-full h-[100vh] lg:flex-row'>
        <div className='lg:w-1/6 w-full lg:bg-gray-200 py-8 lg:pl-8 pr-0'>
          {loadUser ?
            <ul className='lg:pt-8 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-hidden'>
              {tabs.map((tab) => (
                <li
                  key={tab}
                  className={`p-2 pb-2 cursor-pointer hover:cursor-pointer hover:bg-gray-400 lg:py-2 lg:my-2 ${activeTab === tab
                    ? 'bg-[#001333] text-center lg:rounded-l-lg text-white lg:text-lg lg:pl-12 lg:pr-6 lg:py-4 mb-4 lg:mb-0'
                    : ''
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
            :
            <div className="w-full flex justify-center"><ImSpinner2 className="animate-spin" /></div>
          }
        </div>
        <div className='lg:w-5/6 w-full p-2 px-10'>
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
          {activeTab === 'Projects' && (
            <div>
              <Projects orgId={orgId} />
            </div>
          )}
          {activeTab === 'Insights' && (
            <div>
              <Insights orgId={orgId} />
            </div>
          )}
          {activeTab === 'Profile' && (
            <div>
              <Settings orgId={orgId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
