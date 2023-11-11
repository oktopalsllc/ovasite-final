'use client';
import { useState, useEffect } from 'react';
import { orgService } from '@/services/org-service/org.service.ts';
import { useRouter } from 'next/navigation';
import Loader from '@/components/shared/Loader';
import '@/styles/styles.css';

export default function Orgs() {
    const router = useRouter();
    const [orgId, setOrgId] = useState('');
    const [loaded, setLoaded] = useState(false); 

    useEffect(() => {
        async function loadOrgs() {
            try {
                const tokenString = typeof window !== 'undefined' ? localStorage.getItem('token') : "";
                const token = tokenString?.toString() || "";
                const orgs = await orgService.getOrgs(token);
                if (orgs.length == 0) {
                    alert("You belong to no organizations!");
                    router.push(`/orgs/create-org`);
                }
                else {
                    setOrgId(orgs[0].id);
                    if (orgId) {
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
                <section className='orgLoader flex flex-col justify-center items-center top-50 h-full  bg-navy_blue'>
                    <h2>Please wait while we load your profile...</h2>
                    <br />
                    <br />
                    <Loader />
                </section>
            }
        </>
    );
};