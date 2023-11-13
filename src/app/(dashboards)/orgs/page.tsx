'use client';
import { useState, useEffect } from 'react';
import { orgService } from '@/services/org-service/org.service.ts';
import { useRouter } from 'next/navigation';
import { ImSpinner2 } from "react-icons/im";
import '@/styles/styles.css';
import { getCurrentEmployee } from '@/services/employee-service/employee.service.ts';

export default function Orgs() {
    const router = useRouter();
    const [orgId, setOrgId] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function loadOrgs() {
            try {
                const user = typeof window !== 'undefined' ? localStorage.getItem('userInfo') : "";
                const userInfo = JSON.parse(user as string);
                const userId = userInfo?.id as string;
                const orgsId = userInfo?.organizations[0].id as string;
                if (userInfo?.organizations.length == 0) {
                    alert("You belong to no organizations!");
                    router.push(`/orgs/create-org`);
                }
                else {
                    setOrgId(orgsId);
                    if (orgId) {
                        const employeeId = await getCurrentEmployee(orgsId, userId);
                        localStorage.setItem("employeeId", employeeId as string);
                        router.push(`/orgs/${orgId}/projects`);
                        setLoaded(true);
                    }
                    else {
                        setLoaded(false);
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        };
        loadOrgs();
    });

    return (
        <>
            {loaded ?
                <></> :
                <section className='orgLoader flex flex-col justify-center items-center top-50 h-full'>
                    <h2>Please wait while we load your profile...</h2>
                    <br />
                    <br />
                    <ImSpinner2 className="animate-spin h-12 w-12" />
                </section>
            }
        </>
    );
};