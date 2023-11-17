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
          <Link href={`/orgs/${orgValue}/projects/${project.id}`}>View</Link>
        </p>
        <p className='text-gray-500 hover:text-black text-sm text-start font-bold cursor-pointer'>
          Edit
        </p>
        <p className='text-gray-500 hover:text-black text-sm text-start font-bold cursor-pointer'>
          Delete
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
      {/* <pre>{JSON.stringify(project, null, 2)}</pre> */}
      {/* <div className="w-full border border-gray-200 shadow-lg rounded-lg bg-white">
        
        <div className="w-full flex justify-between items-center mb-6 border-b border-gray-200 p-6 ">
          <h3 className="font-bold text-base md:text-xl truncate w-1/2">{project.name}</h3>
          <div className="flex justify-end items-center space-x-4 w-1/2">
            <div
              className={`${
                project.isCompleted
                  ? "bg-green-200 border border-green-400 text-green-700"
                  : "bg-blue-200 border border-blue-400 text-blue-700"
              } text-xs font-semibold rounded-3xl px-2 py-1 block w-2/3`}
            >
              {project.isCompleted ? "Completed" : project.status}
            </div>
            <div className="relative">
              <div className={`${showDropdown ? "block" : "hidden"}`}>
                <DropdownMenu project={project} />
              </div>
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="px-1 py-2 cursor-pointer rounded-lg border bg-gray-100"
              >
                <HiDotsVertical />
              </div>
            </div>
          </div>
        </div>

      
        <div className="px-6 py-2 space-y-2">
          <div className="">
            <span className="font-bold">Start Date:</span>{" "}
            {convertDate(project.startDate)}
          </div>
          <div className="">
            <span className="font-bold">End Date:</span>{" "}
            {convertDate(project.endDate)}
          </div>
        </div>
        <div className="px-6 py-6 w-full">
          <div className="block font-bold ">Description</div>
          <div className="block truncate">
            {project.description || "No description"}
          </div>
        </div>
      </div> */}
      {/* ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨ */}
      <div className='overflow-hidden shadow-lg transition-shadow duration-300 bg-white rounded-md hover:shadow-2xl '>
        <a href='/' aria-label='Article'>
          <img
            src='https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260'
            className='object-cover w-full h-36 rounded'
            alt=''
          />
        </a>
        <div className='p-5'>
          <p className='mb-2 text-xs font-semibold text-gray-600 uppercase'>
            {convertDate(project.startDate)} - {convertDate(project.endDate)}
          </p>
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
                } text-xs font-semibold rounded-3xl px-2 py-1 block w-2/3`}
              >
                {project.isCompleted ? 'Completed' : project.status}
              </div>
            </div>
          </div>

          <p className='mb-4 text-gray-700 truncate'>
            {project.description || 'No description'}
          </p>

          {/* <div className='flex justify-end items-center space-x-4 w-1/2'>
            <div
              className={`${
                project.isCompleted
                  ? 'bg-green-200 border border-green-400 text-green-700'
                  : 'bg-blue-200 border border-blue-400 text-blue-700'
              } text-xs font-semibold rounded-3xl px-2 py-1 block w-2/3`}
            >
              {project.isCompleted ? 'Completed' : project.status}
            </div>
          </div> */}
        </div>
      </div>
      {/* ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨ */}
    </>
  );
}

export default ProjectCard2;

// export const Blog = () => {
//   return (
//     <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
//       <div className='grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full'>
//         <div className='overflow-hidden transition-shadow duration-300 bg-white rounded'>
//           <a href='/' aria-label='Article'>
//             <img
//               src='https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260'
//               className='object-cover w-full h-64 rounded'
//               alt=''
//             />
//           </a>
//           <div className='py-5'>
//             <p className='mb-2 text-xs font-semibold text-gray-600 uppercase'>
//               {convertDate(project.startDate)} - {convertDate(project.endDate)}
//             </p>
//             <a
//               href='/'
//               aria-label='Article'
//               className='inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700'
//             >
//               <p className='text-2xl font-bold leading-5'>{project.name}</p>
//             </a>
//             <p className='mb-4 text-gray-700'>
//               {project.description || 'No description'}
//             </p>
//             <div className='flex space-x-4'>
//               <Link
//                 href='/'
//                 aria-label='Likes'
//                 className='flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group'
//               >
//                 <p className='mr-2'>
//                   <FaEye className='w-5 h-5 text-gray-600 transition-colors duration-200 group-hover:text-deep-purple-accent-700' />
//                 </p>
//               </Link>
//               <Link
//                 href='#'
//                 aria-label='Comments'
//                 className='flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group'
//               >
//                 <p className='mr-2'>
//                   <FaEdit className='w-5 h-5 text-gray-600 transition-colors duration-200 group-hover:text-deep-purple-accent-700' />
//                 </p>
//               </Link>
//               <Link
//                 href='#'
//                 className='flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group'
//               >
//                 <p className='mr-2'>
//                   <FaTrash className='w-5 h-5 text-gray-600 transition-colors duration-200 group-hover:text-deep-purple-accent-700' />
//                 </p>
//               </Link>
//             </div>
//             <div className='flex justify-end items-center space-x-4 w-1/2'>
//               <div
//                 className={`${
//                   project.isCompleted
//                     ? 'bg-green-200 border border-green-400 text-green-700'
//                     : 'bg-blue-200 border border-blue-400 text-blue-700'
//                 } text-xs font-semibold rounded-3xl px-2 py-1 block w-2/3`}
//               >
//                 {project.isCompleted ? 'Completed' : project.status}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
