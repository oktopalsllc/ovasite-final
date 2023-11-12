import React from 'react';
import '@/styles/styles.css';
import PropTypes from 'prop-types';
import Link from 'next/link';



const Middle = () => {
  return (
<div style={{backgroundColor:"#0013330D;",textAlign:'center',paddingLeft:'12%',paddingRight:'12%',paddingBottom:'5%'}} id='middle'>
<h1 style={{fontSize:'30px',fontWeight:700,lineHeight:'60px'}}>Why OvaSite</h1>
<ul style={{fontSize:'20px',fontWeight:400,lineHeight:'30px'}}>
<li>At OvaSite, we know that information is super important. We are experts at gathering different types of information from lots of places. Do not worry, your data is safe with us! We use special techniques to make sure no one can see it unless you want them to.</li>
<li>OvaSite was created to be intuitive to use, so organisations can collect high quality data without devoting resources to technical training.</li>
<li>Our tools were built specifically for the unique needs of collecting data in challenging settings, such as humanitarian crises and conflict-affected countries.</li>
<li>We know that sometimes you are not connected to the internet. But that should not stop you from collecting data! Our system works even when you are offline. You can gather information wherever you are. When you are back online, your data will automatically go to our safe place.</li>
<li>OvaSite was designed for offline use and for inexpensive mobile devices—while still providing advanced functionalities for data management and visualisation</li>
<li>Just having data is not enough, you need to understand what it means. That is where we come in. We help you figure out what your data is saying, so you can make decisions that really work. And the best part? You do not have to wait long to get answers. We show you what your data means right away.</li>
<li>Things change quickly, right? That is why we make sure you always have the newest info at your fingertips. You can put new information into our system anytime, and it will show up right away. This helps you stay on top of things and make good choices based on what is happening right now.</li>
</ul>
</div>
    )
}

export default Middle;