import { projectService } from '@/services/project-service/project.service';
import { useEffect, useState } from 'react';
import { Project } from '@prisma/client';
import { ImSpinner2 } from 'react-icons/im';
import ProjectCard2 from './ProjectCard2';
import { Skeleton } from '@/components/form/ui/skeleton';
import { Suspense } from 'react';
import CreateProjectBtn from '../CreateProjectBtn';
import { FaSearch, FaBell } from 'react-icons/fa';
import { CiMenuBurger } from 'react-icons/ci';

function ProjectCards({ orgId }: { orgId: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenString =
          typeof window !== 'undefined' ? localStorage.getItem('token') : '';
        const token = tokenString?.toString() || '';
        const fetchedProjects = await projectService.getProjects(orgId, token);
        setProjects(fetchedProjects);
        setLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [orgId]);
  return (
    <>
      {loaded ? (
        <>
          <div className='flex items-center justify-between'>
            {/* ========================================== */}
            <div className='flex items-center w-4/6 md:w-4/6 lg:w-4/6'>
              <input
                type='search'
                className='w-full px-4 py-1 text-gray-80 rounded-lg focus:outline-none'
                placeholder='Search Projects...'
              />
            </div>
            <CiMenuBurger className='text-xl text-gray-800' />
            <FaBell className='text-xl text-gray-800' />
            {/* ========================================== */}
            <CreateProjectBtn orgId={orgId} />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-4 md:py-8'>
            <Suspense
              fallback={[1, 2, 3, 4].map((el) => (
                <ProjectCardSkeleton key={el} />
              ))}
            >
              {projects.length > 0 ? (
                <>
                  {projects.map((project) => (
                    <ProjectCard2 key={project.id} project={project} />
                  ))}
                </>
              ) : (
                <h1 className='text-md font-bold my-4'>No projects created</h1>
              )}
            </Suspense>
          </div>

        </>
      ) : (
        <div className='container w-full flex mt-14 justify-center'>
          <ImSpinner2 className='animate-spin h-12 w-12' />
        </div>
      )}
    </>
  );
}

export default ProjectCards;



function ProjectCardSkeleton() {
  return <Skeleton className='border-2 border-primary-/20 h-[300px] w-full' />;
}

