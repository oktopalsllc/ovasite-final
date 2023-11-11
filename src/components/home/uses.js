'use client';
import React from 'react';
import '@/styles/styles.css'
import Link from 'next/link';



const Uses = () => {
  return (
    <section id='sect'>
 <div style={{textAlign:"left",}} className='px-16 pt-16'>
<h1 style={{fontSize:'18px',lineHeight:'60px',fontWeight:'700'}}>Team Collaboration</h1>
<p style={{fontSize:'16px',lineHeight:'36px',fontWeight:'400'}} className='w-1/2'>Our platform is designed to enhance teamwork by offering a suite of powerful collaboration features that enable you to work seamlessly with your colleagues, share valuable insights, and collectively arrive at smart solutions. </p>
<Link href="/features">
  <button style={{marginRight:'30px',marginTop:'30px'}} className="items-center bg-[#FF595A] border-0 py-2 px-6 focus:outline-none 
    hover:bg-[#fe5000] rounded text-[#001233]  font-bold "  >Learn More
  </button>
  </Link>
</div>
</section>
  )
}

export default Uses;


 

