import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


export default function About() {
  return (
    <div className='px-6 lg:px-20 min-h-[100vh]'>
      <div id='about'>
        <div className=''>
          <br />
          <div className='flex flex-col lg:flex-row justify-between lg:gap-10 gap-5 pt-20 px-10'>
            <div className='pt-10 lg:w-2/4 mb-10'>
              <h1 className='leading-loose font-extrabold lg:text-3xl text-xl'>Your Partner in <span className='text-[#FF595A]'>Smart Decision Making</span></h1>
              <p className='leading-loose font-medium lg:text-lg text-md pt-5 pb-8'>Welcome to Ovasite! We are here to help you make smart decisions using the power of information. Our goal is to make it easy for you to collect, store, and understand data, so you can make choices that lead to success.</p>
              <Link href="/signup" className="items-center bg-[#FF595A] border-0 py-4 px-6 focus:outline-none 
    hover:bg-[#fe5000] rounded text-[#001233] font-bold text-white">
                Get Started
              </Link>
            </div>
            <div className='lg:pt-10'>
              <Image src='/flex.svg' width={400} height={500} alt='imagery' />
            </div>
          </div>

          <div id='second' className='mx-10 flex flex-col lg:flex-row justify-between lg:gap-10 gap-5'>
            <div className='pt-10 lg:w-2/4 mb-10 bg-white rounded-lg shadow-md shadow-slate-600 p-10' >
              <h1 className='leading-loose font-bold lg:text-xl text-lg pb-2'>The Ovasite software</h1>
              <p className='leading-loose font-normal lg:text-lg text-md'>Ovasite is a platform for the collection, and management of data.
                In virtually every country around the world, Ovasite can be used by organizations involved in humanitarian action, global development, environmental protection, peacebuilding, and human rights, as well as by public health institutes, research organizations, and education facilities.
                We continuously strive to improve Ovasite based on the feedback of our users. Through development with partner organizations, new features are also added continuously to respond to data needs in the field</p>
            </div>

            <div id='circle'>
              <div className='flex flex-row'>
                <Image src='Mask group (1).svg' id='circle1' width={50} height={100} alt='imagery' />
                <Image src='Mask group (2).svg' width={50} height={100} alt='imagery' />
              </div>

              <div className='flex flex-row mt-10'>
                <Image src='Mask group.svg' id='circle2' width={50} height={100} alt='imagery' />
                <Image src='Mask group (3).svg' width={50} height={100} alt='imagery' />
              </div>

              <div className='' >
                <p className='mb-5 px-16 text-center text-gray-700 font-bold text-md leading-loose'>Experience revolutionary features for gathering, analyzing, and utilizing data. From adaptable forms to real-time insights, Ovasite empowers you</p>
                <Link href="/signup" className="items-center bg-[#FF595A] border-0 py-4 px-6 focus:outline-none 
    hover:bg-[#fe5000] rounded text-[#001233] font-bold text-white">
                  Get Started
                </Link>
              </div>
            </div>

          </div>
        </div>
        
      </div>
      <div className='bg-[#0013330D] px-6 lg:px-20 py-10 mb-5'>
          <h1 className="text-center text-xl font-bold pb-2">Why Ovasite</h1>
          <div className='font-normal leading-loose text-lg'>
            <p>At Ovasite, we know that information is super important. We are experts at gathering different types of information from lots of places. Do not worry, your data is safe with us! We use special techniques to make sure no one can see it unless you want them to.</p><br/>
            <p>Ovasite was created to be intuitive to use, so organisations can collect high quality data without devoting resources to technical training.</p><br/>
            <p>Our tools were built specifically for the unique needs of collecting data in challenging settings, such as humanitarian crises and conflict-affected countries.</p><br/>
            <p>Just having data is not enough, you need to understand what it means. That is where we come in. We help you figure out what your data is saying, so you can make decisions that really work. And the best part? You do not have to wait long to get answers. We show you what your data means right away.</p><br/>
            <p>Things change quickly, right? That is why we make sure you always have the newest info at your fingertips. You can put new information into our system anytime, and it will show up right away. This helps you stay on top of things and make good choices based on what is happening right now.</p>
          </div>
        </div>
    </div>
  );
};