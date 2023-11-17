import {
  // GetFormStats,
  GetForms,
} from '@/actions/form';
import { Suspense, useEffect, useState } from 'react';
import { Form } from '@prisma/client';
import { ImSpinner2 } from 'react-icons/im';
import { Separator } from '../ui/separator';
import CreateFormBtn from '../CreateFormBtn';
import { Skeleton } from '../ui/skeleton';
import FormCard from './FormCard';

function FormCards({ projectId }: { projectId: string }) {
  const [forms, setForms] = useState<Form[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedForms = await GetForms(projectId);
        setForms(fetchedForms);
        setLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [projectId]);
  return (
    <>
      {loaded ? (
        <div>
          <CreateFormBtn />
          <Separator className='my-6' />
          {forms.length > 0 ? (
            <div className='grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <Suspense
                fallback={[1, 2, 3, 4].map((el) => (
                  <FormCardSkeleton key={el} />
                ))}
              >
                {forms.map((form) => (
                  <FormCard key={form.id} form={form} />
                ))}
              </Suspense>
            </div>
          ) : (
            <div className='grid grid-cols-1 items-center justify-center text-center md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <h4 className='mt-14 text-md font-bold col-span-2'>
                No forms yet
              </h4>
            </div>
          )}
        </div>
      ) : (
        <div className='flex mt-14 justify-center'>
          <ImSpinner2 className='animate-spin h-12 w-12' />
        </div>
      )}
    </>
  );
}

export default FormCards;

function FormCardSkeleton() {
  return <Skeleton className='border-2 border-primary-/20 h-[190px] w-full' />;
}
