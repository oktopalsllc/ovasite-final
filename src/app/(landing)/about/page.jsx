import React from 'react';
import Link from 'next/link';
import '@/styles/styles.css';
import Middle from '@/components/about/middle';
import Image from 'next/image';


export const About = () => {
  return (
    <div>
      <div id='about'>
  <div id='aboutImage'>
    <div className='under'>
    <div id='smart'>
      <h1 style={{fontSize:'35px',lineHeight:'50px',fontWeight:900}}>Your Partner in <span className='text-[#FF595A]'>Smart Decision Making</span></h1>  
  <p style={{fontSize:'19px',lineHeight:'30px',fontWeight:'400',paddingTop:'30px'}}>Welcome to OvaSite! We are here to help you make smart decisions using the power of information. Our goal is to make it easy for you to collect, store, and understand data, so you can make choices that lead to success</p>
  <Link href="/signup">
  <button style={{marginRight:'30px',marginTop:'30px'}} className="items-center bg-[#FF595A] border-0 py-2 px-6 focus:outline-none 
    hover:bg-[#fe5000] rounded text-[#001233]  font-bold " id='but1' >Get Started
  </button>
  </Link>
  </div>
  <div id='image'>
<Image src='/flex.svg' width={400} height={500} alt='imagery'/>
  </div>
  </div>

<div id='second'>
<div style={{backgroundColor:'white',borderRadius:'10px',padding:'40px',boxShadow:'2px 2px 7px gray'}}>
<h1 style={{fontSize:'25px',lineHeight:'50px',fontWeight:700}}>The OvaSite software</h1>
<p style={{fontSize:'15px',lineHeight:'30px',fontWeight:400}}>OvaSite is a platform for the collection, management, and visualization of data.
In virtually every country around the world, OvaSite can be used by organizations involved in humanitarian action, global development, environmental protection, peacebuilding, and human rights, as well as by public health institutes, research organizations, and education facilities.
We continuously strive to improve OvaSite based on the feedback of our users. Through development with partner organizations, new features are also added continuously to respond to data needs in the field</p>
</div>

<div  id='circle'>
<div style={{display:'flex',flexDirection:'row'}} >
<Image src='Mask group (1).svg' id='circle1'  width={50} height={100} alt='imagery'/>
<Image src='Mask group (2).svg'  width={50} height={100} alt='imagery'/>
</div>

<div style={{display:'flex',flexDirection:'row', marginTop:'20px'}}>
<Image src='Mask group.svg' id='circle2' width={50} height={100} alt='imagery'/>
<Image src='Mask group (3).svg'  width={50} height={100} alt='imagery'/>
</div>

<div style={{fontSize:'15px',lineHeight:'30px',fontWeight:600, textAlign:'center',paddingLeft:'60px',paddingRight:'60px'}}>
<p>Experience revolutionary features for gathering, analyzing, and utilizing data. From adaptable forms to real-time insights, OvaSite empowers you</p>
<button style={{marginRight:'20px',marginTop:'20px'}} className="items-center bg-[#FF595A] border-0 py-2 px-6 focus:outline-none 
    hover:bg-[#fe5000] rounded text-[#001233]  font-bold"  >Get Started
  </button>
</div>
</div>

</div>
</div>
</div>
<Middle/>

</div>
  );
};
export default About;