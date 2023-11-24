import React from 'react';
import TopHeader from '@/components/features/topheader';
import '@/styles/styles.css';
import Image from 'next/image';


export default function features() {
  return (
    <div>
      <TopHeader />
      <div className='flex flex-col lg:flex-row lg:justify-between px-10 gap-10 text-gray-700 pt-10 lg:pt-20 mx-10'>
        <div className='lg:w-1/2'>
          <h1 className='text-xl font-bold'> Data Collection and Storage</h1>
          <div className='leading-loose'>
            <p>Quickly build questionnaires with our intuitive tools.</p>
            <p>Gather and keep track of different types of information about your project or program.</p>
            <p>Our system is flexible enough to handle numbers-based data (like counts or measurements) as well as descriptive data.</p>
            <p>Get data from different places, like surveys, one-on-one discussions, group discussions, and official documents.</p>
          </div>
        </div>
        <div>
          <Image src='/survey.png' alt='desc' width={400} height={100} />
        </div>
      </div>

      <div className='flex flex-col lg:flex-row-reverse lg:justify-between px-10 gap-10 text-gray-700 pt-10 lg:pt-20 mx-10'>
        
      <div className='lg:w-1/2 lg:mt-10'>
          <h1 className='text-xl font-bold'>Real-time data entry and updating</h1>
          <div className='leading-loose'>
            <p>Our system facilitates real-time data entry and updating to ensure the most current information is available for analysis.</p>
            <p>Data can be collected on any smart device both online and offline.</p>
            <p>Review and validate data in real time.</p>
            <p>Export data in different formats.</p>
          </div>
        </div>
        <div className=''>
          <Image src='/devices.png' alt='desc' width={400} height={100} />
        </div>
      </div>

      <div className='flex flex-col lg:flex-row lg:justify-between px-10 gap-10 text-gray-700 pt-10 lg:pt-20 mx-10 mb-10'>
      <div className='lg:w-1/2'>
          <h1 className='text-xl font-bold'> Tracking, Reporting and Visualization</h1>
          <div className='leading-loose'>
            <p>Use our performance indicators and targets to measure the progress of your project or program.</p>
            <p>Generate automated reports and visualizations to present data in a clear and understandable format, including graphs, charts, and dashboards.</p>
            <p>Customize reports based on specific requirements and user roles.</p>
            <p>Integrate with project management and finance systems to avoid duplication of data entry and facilitate seamless information flow.</p>
          </div>
        </div>
        <div>
          <Image src='/indicators.png' alt='desc' width={400} height={100} />
        </div>
      </div>
      <div id='background' className='text-[#052053] py-20 leading-loose'>
        <div className='mb-4'>
          <h1 className='text-xl font-bold text-center'> And that is not all!</h1>
          <p className='font-bold text-center'>Our system boasts of extra tools to help you find solution to your data Collection needs</p>
        </div>
        <div className='flex flex-col lg:flex-row lg:justify-between px-10 gap-10 mx-10'>
          <div className='lg:w-1/3'>
            <h2 className='font-bold'>Data Security and Privacy</h2>
            <p> Strong data security measures are in place to protect your sensitive information.
              and you also have full control of access to your data</p>
          </div>
          <div className='lg:w-1/3'>
            <h2 className='font-bold'>Data Validation and Quality Assurance</h2>
            <p>Our system include validation checks to ensure data accuracy and consistency.
            </p>
          </div>
          <div className='lg:w-1/3'>
            <h2 className='font-bold'>Data Export</h2>
            <p>Export data in various formats (e.g., CSV, PDF) from your project</p>
          </div>
        </div>
      </div>
    </div>
  );
}

