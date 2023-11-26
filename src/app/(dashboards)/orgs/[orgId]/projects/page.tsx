'use client';
import { Skeleton } from '@/components/form/ui/skeleton';
import { Suspense } from 'react';
import { Separator } from '@/components/form/ui/separator';
import CreateProjectBtn from '@/components/project/CreateProjectBtn';
import ProjectCards from '@/components/project/list/Projects';
import { FaSearch, FaBell } from 'react-icons/fa';
import { CiMenuBurger } from 'react-icons/ci';

export default function Projects({ params }: { params: { orgId: string } }) {
  const { orgId } = params;
  return (
    <div className=''>
      <div className='w-full mt-0'>
        <Separator className='py-3' />
        <div className='flex items-center justify-between'>
          <span className='text-xl font-extrabold leading-5'>Projects</span>
        </div>        
        <Separator className='py-3' />
        <ProjectCards orgId={orgId} />
        {/* <div className='flex items-center justify-between'> */}
          {/* ========================================== */}
          {/* <div className='flex items-center w-4/6 md:w-4/6 lg:w-4/6'>
            <input
              type='search'
              className='w-full px-4 py-1 text-gray-80 rounded-lg focus:outline-none'
              placeholder='Search Projects...'
            />
          </div>
          <CiMenuBurger className='text-xl text-gray-800' />
          <FaBell className='text-xl text-gray-800' /> */}
          <span className='text-xl font-extrabold leading-5'>Projects</span>
          {/* ========================================== */}
          {/* <CreateProjectBtn orgId={orgId} />
        </div> */}
        {/* <Separator className='my-2 md:my-6' /> */}
        {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-4 md:py-8'>
          <Suspense
            fallback={[1, 2, 3, 4].map((el) => (
              <ProjectCardSkeleton key={el} />
            ))}
          >
            <ProjectCards orgId={orgId} />
          </Suspense>
        </div> */}
      </div>
    </div>
  );
}

function ProjectCardSkeleton() {
  return <Skeleton className='border-2 border-primary-/20 h-[300px] w-full' />;
}
