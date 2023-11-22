/* eslint-disable @next/next/no-img-element */
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { Project } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';

function DropdownMenu({ project }: { project: Project }) {
  const hParams = useParams();
  const { orgId } = hParams;
  const orgValue = orgId.toString() || '';
  return (
    <div className='absolute top-0 right-8 w-24'>
      <div className='space-y-2 bg-white rounded-md shadow-md p-3 text-start'>
        <p className='text-gray-500 hover:text-black text-sm text-start font-bold cursor-pointer'>
          {/* <Link href={`/orgs/${orgValue}/projects/${project.id}`}>View</Link> */}
        </p>
        <p className='text-gray-500 hover:text-black text-sm text-start font-bold cursor-pointer'>
          Edit
        </p>
        <p className='text-gray-500 hover:text-black text-sm text-start font-bold cursor-pointer'>
          Settings
        </p>
      </div>
    </div>
  );
}

function ProjectCard2({ project }: { project: Project }) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const hParams = useParams();
  const { orgId } = hParams;
  const orgValue = orgId.toString() || '';

  const convertDate = (date: Date) => {
    const dateObject: Date = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: '2-digit',
    };
    const customFormat = dateObject.toLocaleDateString('en-US', options);
    return customFormat;
  };

  return (
    <>
      {/* ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨ */}
      <div className='overflow-hidden shadow-lg transition-shadow duration-300 bg-white rounded-md hover:shadow-2xl '>
        <Link href={`/orgs/${orgValue}/projects/${project.id}`}>
          <img
            src='https://images.pexels.com/photos/1576937/pexels-photo-1576937.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500'
            className='object-cover w-full h-36 rounded'
            alt=''
          />
        </Link>
        <div className='p-5'>
          <div className='flex justify-between mb-4 items-center'>
            <p className='mb-2 text-xs font-semibold text-gray-600 uppercase'>
              {convertDate(project.createdAt)} - {project.expectedDuration}
            </p>{' '}
            <div className='relative'>
              <div className={`${showDropdown ? 'block' : 'hidden'}`}>
                <DropdownMenu project={project} />
              </div>
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className='px-1 py-2 cursor-pointer rounded-md'
              >
                <HiDotsVertical />
              </div>
            </div>
            {/* ============================================= */}
          </div>
          {/* ============================================= */}
          <div className='flex justify-between items-center'>
            <>
              {' '}
              <a
                href='/'
                aria-label='Article'
                className='inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700'
              >
                <p className='text-lg font-bold leading-5'>{project.name}</p>
              </a>
            </>
            <div className=' w-1/2 flex justify-end items-center space-x-4'>
              {' '}
              <div
                className={`text-center ${
                  project.isCompleted
                    ? 'bg-green-200 border border-green-400 text-green-700'
                    : 'bg-blue-200 border border-blue-400 text-blue-700'
                } text-xs font-semibold rounded-md px-2 py-1 block w-2/3`}
              >
                {project.isCompleted ? 'Completed' : project.status}
              </div>
            </div>
          </div>

          <p className='my-4 text-gray-700 truncate'>
            {project.description || 'No description'}
          </p>
        </div>
      </div>
      {/* ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨ */}
    </>
  );
}

export default ProjectCard2;
