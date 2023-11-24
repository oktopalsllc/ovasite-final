import React from 'react';
import Link from 'next/link';

export default function pricing() {
    return (
        // <section className='text-gray-600 body-font overflow-hidden'>
        //   <div className='container px-5 py-24 mx-auto'>
        //     <div className='flex flex-col text-center w-full mb-20'>
        //       <h1 className='sm:text-4xl text-3xl font-bold title-font mb-2 text-gray-900'>
        //         Pricing Plans Tailored to Your Needs
        //       </h1>
        //       <p className='lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500'>
        //         Discover our flexible pricing options designed to suit your budget
        //         and requirements.
        //       </p>
        //     </div>
        //     <div className='flex flex-wrap -m-4'>
        //       <div className='p-4 xl:w-1/4 md:w-1/2 w-full'>
        //         <div className='h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden'>
        //           <h2 className='text-sm tracking-widest title-font mb-1 font-medium'>
        //             START
        //           </h2>
        //           <h1 className='text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none'>
        //             Free
        //           </h1>
        //           <p className='flex items-center text-gray-600 mb-2'>
        //             <span className='w-4 h-4 mr-2 inline-flex items-center justify-center bg-[#FFDEDE] text-white rounded-full flex-shrink-0'>
        //               <svg
        //                 fill='none'
        //                 stroke='currentColor'
        //                 strokeLinecap='round'
        //                 strokeLinejoin='round'
        //                 strokeWidth='2.5'
        //                 className='w-3 h-3'
        //                 viewBox='0 0 24 24'
        //               >
        //                 <path d='M20 6L9 17l-5-5'></path>
        //               </svg>
        //             </span>
        //             Vexillologist pitchfork
        //           </p>
        //           <p className='flex items-center text-gray-600 mb-2'>
        //             <span className='w-4 h-4 mr-2 inline-flex items-center justify-center   bg-[#FFDEDE] text-white rounded-full flex-shrink-0'>
        //               <svg
        //                 fill='none'
        //                 stroke='currentColor'
        //                 strokeLinecap='round'
        //                 strokeLinejoin='round'
        //                 strokeWidth='2.5'
        //                 className='w-3 h-3'
        //                 viewBox='0 0 24 24'
        //               >
        //                 <path d='M20 6L9 17l-5-5'></path>
        //               </svg>
        //             </span>
        //             Tumeric plaid portland
        //           </p>
        //           <p className='flex items-center text-gray-600 mb-6'>
        //             <span className='w-4 h-4 mr-2 inline-flex items-center justify-center   bg-[#FFDEDE] text-white rounded-full flex-shrink-0'>
        //               <svg
        //                 fill='none'
        //                 stroke='currentColor'
        //                 strokeLinecap='round'
        //                 strokeLinejoin='round'
        //                 strokeWidth='2.5'
        //                 className='w-3 h-3'
        //                 viewBox='0 0 24 24'
        //               >
        //                 <path d='M20 6L9 17l-5-5'></path>
        //               </svg>
        //             </span>
        //             Mixtape chillwave tumeric
        //           </p>
        //           <button className='flex items-center mt-auto text-[#FF595A] bg-[#FFDEDE] border-0 py-2 px-4 w-full focus:outline-none hover:bg-[#001333] hover:text-white rounded'>
        //             Subscribe
        //           </button>
        //           <p className='text-xs text-gray-500 mt-3'>
        //             Literally you probably have not heard of them jean shorts.
        //           </p>
        //         </div>
        //       </div>
        //       <div className='p-4 xl:w-1/4 md:w-1/2 w-full'>
        //         <div className='h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden bg-[#FF595A]'>
        //           <span className='bg-[white] text-[black] px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl'>
        //             POPULAR
        //           </span>
        //           <h2 className='text-sm tracking-widest title-font mb-1 font-medium text-[white]'>
        //             PRO
        //           </h2>
        //           <h1 className='text-5xl text-[white] leading-none flex items-center pb-4 mb-4 border-b border-gray-200'>
        //             <span>$38</span>
        //             <span className='text-lg ml-1 font-normal text-[white]'>
        //               /mo
        //             </span>
        //           </h1>
        //           <p className='flex items-center text-[white] mb-2'>
        //             <span className='w-4 h-4 mr-2 inline-flex items-center justify-center   bg-[#FFDEDE] text-white rounded-full flex-shrink-0'>
        //               <svg
        //                 fill='none'
        //                 stroke='currentColor'
        //                 strokeLinecap='round'
        //                 strokeLinejoin='round'
        //                 strokeWidth='2.5'
        //                 className='w-3 h-3'
        //                 viewBox='0 0 24 24'
        //               >
        //                 <path d='M20 6L9 17l-5-5'></path>
        //               </svg>
        //             </span>
        //             Vexillologist pitchfork
        //           </p>
        //           <p className='flex items-center text-[white] mb-2'>
        //             <span className='w-4 h-4 mr-2 inline-flex items-center justify-center   bg-[#FFDEDE] text-white rounded-full flex-shrink-0'>
        //               <svg
        //                 fill='none'
        //                 stroke='currentColor'
        //                 strokeLinecap='round'
        //                 strokeLinejoin='round'
        //                 strokeWidth='2.5'
        //                 className='w-3 h-3'
        //                 viewBox='0 0 24 24'
        //               >
        //                 <path d='M20 6L9 17l-5-5'></path>
        //               </svg>
        //             </span>
        //             Tumeric plaid portland
        //           </p>
        //           <p className='flex items-center text-[white] mb-2'>
        //             <span className='w-4 h-4 mr-2 inline-flex items-center justify-center   bg-[#FFDEDE] text-white rounded-full flex-shrink-0'>
        //               <svg
        //                 fill='none'
        //                 stroke='currentColor'
        //                 strokeLinecap='round'
        //                 strokeLinejoin='round'
        //                 strokeWidth='2.5'
        //                 className='w-3 h-3'
        //                 viewBox='0 0 24 24'
        //               >
        //                 <path d='M20 6L9 17l-5-5'></path>
        //               </svg>
        //             </span>
        //             Hexagon neutra unicorn
        //           </p>
        //           <p className='flex items-center text-[white] mb-6'>
        //             <span className='w-4 h-4 mr-2 inline-flex items-center justify-center   bg-[#FFDEDE] text-white rounded-full flex-shrink-0'>
        //               <svg
        //                 fill='none'
        //                 stroke='currentColor'
        //                 strokeLinecap='round'
        //                 strokeLinejoin='round'
        //                 strokeWidth='2.5'
        //                 className='w-3 h-3'
        //                 viewBox='0 0 24 24'
        //               >
        //                 <path d='M20 6L9 17l-5-5'></path>
        //               </svg>
        //             </span>
        //             Mixtape chillwave tumeric
        //           </p>
        //           <button className='flex items-center mt-auto text-[#FF595A] bg-[#FFDEDE] border-0 py-2 px-4 w-full focus:outline-none  hover:text-[#001333] rounded'>
        //             Subscribe
        //           </button>
        //           <p className='text-xs text-[white] mt-3'>
        //             Literally you probably have not heard of them jean shorts.
        //           </p>
        //         </div>
        //       </div>
        //       <div className='p-4 xl:w-1/4 md:w-1/2 w-full'>
        //         <div className='h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden'>
        //           <h2 className='text-sm tracking-widest title-font mb-1 font-medium'>
        //             BUSINESS
        //           </h2>
        //           <h1 className='text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200'>
        //             <span>$56</span>
        //             <span className='text-lg ml-1 font-normal text-gray-500'>
        //               /mo
        //             </span>
        //           </h1>
        //           <p className='flex items-center text-gray-600 mb-2'>
        //             <span className='w-4 h-4 mr-2 inline-flex items-center justify-center   bg-[#FFDEDE] text-white rounded-full flex-shrink-0'>
        //               <svg
        //                 fill='none'
        //                 stroke='currentColor'
        //                 strokeLinecap='round'
        //                 strokeLinejoin='round'
        //                 strokeWidth='2.5'
        //                 className='w-3 h-3'
        //                 viewBox='0 0 24 24'
        //               >
        //                 <path d='M20 6L9 17l-5-5'></path>
        //               </svg>
        //             </span>
        //             Vexillologist pitchfork
        //           </p>
        //           <p className='flex items-center text-gray-600 mb-2'>
        //             <span className='w-4 h-4 mr-2 inline-flex items-center justify-center   bg-[#FFDEDE] text-white rounded-full flex-shrink-0'>
        //               <svg
        //                 fill='none'
        //                 stroke='currentColor'
        //                 strokeLinecap='round'
        //                 strokeLinejoin='round'
        //                 strokeWidth='2.5'
        //                 className='w-3 h-3'
        //                 viewBox='0 0 24 24'
        //               >
        //                 <path d='M20 6L9 17l-5-5'></path>
        //               </svg>
        //             </span>
        //             Tumeric plaid portland
        //           </p>
        //           <p className='flex items-center text-gray-600 mb-2'>
        //             <span className='w-4 h-4 mr-2 inline-flex items-center justify-center   bg-[#FFDEDE] text-white rounded-full flex-shrink-0'>
        //               <svg
        //                 fill='none'
        //                 stroke='currentColor'
        //                 strokeLinecap='round'
        //                 strokeLinejoin='round'
        //                 strokeWidth='2.5'
        //                 className='w-3 h-3'
        //                 viewBox='0 0 24 24'
        //               >
        //                 <path d='M20 6L9 17l-5-5'></path>
        //               </svg>
        //             </span>
        //             Hexagon neutra unicorn
        //           </p>
        //           <p className='flex items-center text-gray-600 mb-2'>
        //             <span className='w-4 h-4 mr-2 inline-flex items-center justify-center   bg-[#FFDEDE] text-white rounded-full flex-shrink-0'>
        //               <svg
        //                 fill='none'
        //                 stroke='currentColor'
        //                 strokeLinecap='round'
        //                 strokeLinejoin='round'
        //                 strokeWidth='2.5'
        //                 className='w-3 h-3'
        //                 viewBox='0 0 24 24'
        //               >
        //                 <path d='M20 6L9 17l-5-5'></path>
        //               </svg>
        //             </span>
        //             Vexillologist pitchfork
        //           </p>
        //           <p className='flex items-center text-gray-600 mb-6'>
        //             <span className='w-4 h-4 mr-2 inline-flex items-center justify-center   bg-[#FFDEDE] text-white rounded-full flex-shrink-0'>
        //               <svg
        //                 fill='none'
        //                 stroke='currentColor'
        //                 strokeLinecap='round'
        //                 strokeLinejoin='round'
        //                 strokeWidth='2.5'
        //                 className='w-3 h-3'
        //                 viewBox='0 0 24 24'
        //               >
        //                 <path d='M20 6L9 17l-5-5'></path>
        //               </svg>
        //             </span>
        //           </p>
        //           <button className='flex items-center mt-auto text-[#FF595A] bg-[#FFDEDE] border-0 py-2 px-4 w-full focus:outline-none hover:bg-[#001333] hover:text-white rounded'>
        //             Subscribe
        //           </button>
        //           <p className='text-xs text-gray-500 mt-3'>
        //             Literally you probably have not heard of them jean shorts.
        //           </p>
        //         </div>
        //       </div>
        //       <div className='p-4 xl:w-1/4 md:w-1/2 w-full'>
        //         <div className='h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden'>
        //           <h2 className='text-sm tracking-widest title-font mb-1 font-medium'>
        //             SPECIAL
        //           </h2>
        //           <h1 className='text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200'>
        //             <span>$72</span>
        //             <span className='text-lg ml-1 font-normal text-gray-500'>
        //               /mo
        //             </span>
        //           </h1>
        //           <p className='flex items-center text-gray-600 mb-2'>
        //             <span className='w-4 h-4 mr-2 inline-flex items-center justify-center   bg-[#FFDEDE] text-white rounded-full flex-shrink-0'>
        //               <svg
        //                 fill='none'
        //                 stroke='currentColor'
        //                 strokeLinecap='round'
        //                 strokeLinejoin='round'
        //                 strokeWidth='2.5'
        //                 className='w-3 h-3'
        //                 viewBox='0 0 24 24'
        //               >
        //                 <path d='M20 6L9 17l-5-5'></path>
        //               </svg>
        //             </span>
        //             Vexillologist pitchfork
        //           </p>
        //           <p className='flex items-center text-gray-600 mb-2'>
        //             <span className='w-4 h-4 mr-2 inline-flex items-center justify-center   bg-[#FFDEDE] text-white rounded-full flex-shrink-0'>
        //               <svg
        //                 fill='none'
        //                 stroke='currentColor'
        //                 strokeLinecap='round'
        //                 strokeLinejoin='round'
        //                 strokeWidth='2.5'
        //                 className='w-3 h-3'
        //                 viewBox='0 0 24 24'
        //               >
        //                 <path d='M20 6L9 17l-5-5'></path>
        //               </svg>
        //             </span>
        //             Tumeric plaid portland
        //           </p>
        //           <p className='flex items-center text-gray-600 mb-2'>
        //             <span className='w-4 h-4 mr-2 inline-flex items-center justify-center   bg-[#FFDEDE] text-white rounded-full flex-shrink-0'>
        //               <svg
        //                 fill='none'
        //                 stroke='currentColor'
        //                 strokeLinecap='round'
        //                 strokeLinejoin='round'
        //                 strokeWidth='2.5'
        //                 className='w-3 h-3'
        //                 viewBox='0 0 24 24'
        //               >
        //                 <path d='M20 6L9 17l-5-5'></path>
        //               </svg>
        //             </span>
        //             Hexagon neutra unicorn
        //           </p>
        //           <p className='flex items-center text-gray-600 mb-2'>
        //             <span className='w-4 h-4 mr-2 inline-flex items-center justify-center   bg-[#FFDEDE] text-white rounded-full flex-shrink-0'>
        //               <svg
        //                 fill='none'
        //                 stroke='currentColor'
        //                 strokeLinecap='round'
        //                 strokeLinejoin='round'
        //                 strokeWidth='2.5'
        //                 className='w-3 h-3'
        //                 viewBox='0 0 24 24'
        //               >
        //                 <path d='M20 6L9 17l-5-5'></path>
        //               </svg>
        //             </span>
        //             Vexillologist pitchfork
        //           </p>
        //           <p className='flex items-center text-gray-600 mb-6'>
        //             <span className='w-4 h-4 mr-2 inline-flex items-center justify-center   bg-[#FFDEDE] text-white rounded-full flex-shrink-0'>
        //               <svg
        //                 fill='none'
        //                 stroke='currentColor'
        //                 strokeLinecap='round'
        //                 strokeLinejoin='round'
        //                 strokeWidth='2.5'
        //                 className='w-3 h-3'
        //                 viewBox='0 0 24 24'
        //               >
        //                 <path d='M20 6L9 17l-5-5'></path>
        //               </svg>
        //             </span>
        //             Mixtape chillwave tumeric
        //           </p>
        //           <button className='flex items-center mt-auto text-[#FF595A] bg-[#FFDEDE] border-0 py-2 px-4 w-full focus:outline-none hover:bg-[#fe5000] hover:text-white rounded'>
        //             Subscribe
        //           </button>
        //           <p className='text-xs text-[#1F1F1F] mt-3'>
        //             Literally you probably have not heard of them jean shorts.
        //           </p>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </section>
        <div className="min-w-screen min-h-screen pt-10 px-6 lg:px-10 py-5">

            <div className="w-full mx-auto bg-white px-5 py-10 text-gray-600 mb-10">
                <div className="text-center max-w-xl mx-auto">
                    <h1 className="text-xl md:text-2xl font-bold mb-5 pt-10">Pricing plans tailored to your Needs</h1>
                    <p className='lg:w-2/3 mx-auto leading-relaxed text-lg font-medium text-base text-gray-500 mb-5'>
                        Discover our flexible pricing options designed to suit your budget and requirements.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto md:flex">
                    <div className="w-full md:w-1/3 md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:my-6 rounded-md shadow-lg shadow-peach_primary md:flex md:flex-col">
                        <div className="w-full flex-grow">
                            <h2 className="text-center font-bold uppercase mb-4">Starter</h2>
                            <h3 className="text-center font-bold text-4xl mb-5">$15/mo</h3>
                            <p className='lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500 mb-5'>
                                Just the essentials
                            </p>
                            <ul className="text-sm px-5 mb-8">
                                <li className="leading-tight"><i className="mdi mdi-check-bold text-lg"></i> Unlimited forms</li>
                                <li className="leading-tight"><i className="mdi mdi-check-bold text-lg"></i> Unlimited users</li>
                                <li className="leading-tight"><i className="mdi mdi-check-bold text-lg"></i> 1 project space</li>
                                <li className="leading-tight"><i className="mdi mdi-check-bold text-lg"></i> 10K monthly submissions</li>
                                <li className="leading-tight"><i className="mdi mdi-check-bold text-lg"></i> <span className='font-bold'>Standard support</span><br/>
                                    3 business days, via email
                                </li>
                            </ul>
                        </div>
                        <div className="w-full">
                            <button className="font-bold bg-peach_primary hover:bg-peach_secondary text-white rounded-md px-10 py-2 transition-colors w-full"><Link href='/signup'>Get Started</Link></button>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:-mx-3 md:mb-0 rounded-md shadow-lg shadow-peach_primary md:relative md:z-50 md:flex md:flex-col">
                        <div className="w-full flex-grow">
                            <h2 className="text-center font-bold uppercase mb-4">Professional</h2>
                            <h3 className="text-center font-bold text-4xl md:text-5xl mb-5">$25/mo</h3>
                            <p className='lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500 mb-5'>
                                Designed for professionals
                            </p>
                            <ul className="text-sm px-5 mb-8">
                                <li className="leading-tight"><i className="mdi mdi-check-bold text-lg"></i> Unlimited forms</li>
                                <li className="leading-tight"><i className="mdi mdi-check-bold text-lg"></i> Unlimited users</li>
                                <li className="leading-tight"><i className="mdi mdi-check-bold text-lg"></i> 1 project space</li>
                                <li className="leading-tight"><i className="mdi mdi-check-bold text-lg"></i> 25K monthly submissions</li>
                                <li className="leading-tight"><i className="mdi mdi-check-bold text-lg"></i> <span className='font-bold'>Professional support</span><br/>
                                    1 business day, via email
                                </li>
                            </ul>
                        </div>
                        <div className="w-full">
                            <button className="font-bold bg-peach_primary hover:bg-peach_secondary text-white rounded-md px-10 py-2 transition-colors w-full"><Link href='/signup'>Get Started</Link></button>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:my-6 rounded-md shadow-lg shadow-peach_primary md:flex md:flex-col">
                        <div className="w-full flex-grow">
                            <h2 className="text-center font-bold uppercase mb-4">Enterprise</h2>
                            <h3 className="text-center font-bold text-4xl mb-5">Custom</h3>
                            <p className='lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500 mb-5'>
                                For important work at large scale
                            </p>
                            <ul className="text-sm px-5 mb-8">
                            <li className="leading-tight"><i className="mdi mdi-check-bold text-lg"></i> Unlimited forms</li>
                                <li className="leading-tight"><i className="mdi mdi-check-bold text-lg"></i> Unlimited users</li>
                                <li className="leading-tight"><i className="mdi mdi-check-bold text-lg"></i> Custom project space</li>
                                <li className="leading-tight"><i className="mdi mdi-check-bold text-lg"></i> Custom monthly submissions</li>
                                <li className="leading-tight"><i className="mdi mdi-check-bold text-lg"></i> <span className='font-bold'>Enterprise support</span><br/>
                                Less than 24 hours, via phone
                                </li>
                            </ul>
                        </div>
                        <div className="w-full">
                            <button className="font-bold bg-peach_primary hover:bg-peach_secondary text-white rounded-md px-10 py-2 transition-colors w-full"><Link href='/signup'>Get Started</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
