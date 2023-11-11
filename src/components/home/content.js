'use client';
import React from 'react';
import propTypes from 'prop-types';
import '@/styles/styles.css';
import Image from 'next/image';

export const Content = () => {
  return (
  <div style={{height:"100%"}}>
  <div id='features'>
<div><h1 id='topbtn'>Features</h1></div>
<br/>
 <div style={{fontSize:'28px',fontWeight:'700'}} id='fea'><p >Features designed to enhance your experience</p></div>
<div style={{fontSize:'20px',fontWeight:'400'}} id='fea2'><p>Experience revolutionary features for gathering, analyzing, and utilizing data. From adaptable forms to real-time insights, OvaSite empowers you</p></div> 
 </div>

<div id='frame'>
<div>
<Image alt='Frame8' width={100} height={100} src='/Frame8.jpg' id="frames"/>
</div>

<div>
<Image alt='Frame9' width={100} height={100} src='/Frame9.jpg' id="frames"/>
</div>

<div>
<Image alt='Frame10' width={100} height={100} src='/Frame10.jpg' id="frames"/>
</div>

<div>
<Image alt='Frame11' width={100} height={100} src='/Frame11.jpg' id="frames"/>
</div>
</div>



  </div>
  );
};
export default Content;
Content.propTypes = {
    imageSrc: propTypes.string,
    title: propTypes.string,
    description: propTypes.string,
    buttonText1: propTypes.string,
    buttonText2: propTypes.string,

};
 
