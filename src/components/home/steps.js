'use client';
import React from 'react';
import '@/styles/styles.css'
import Image from 'next/image';

export const Steps = () => {
  return (
    <div style={{ height: "100%" }}>
      <div id='features'>
        <div><h1 id='topbtn'>How it works</h1></div>
        <div id='width'>
          <div style={{ fontSize: '28px', lineHeight: '60px', fontWeight: '700' }}className='mt-4'><p >How we carry out our operations</p></div>
          <div style={{ fontSize: '20px', lineHeight: '36px', fontWeight: '400' }}><p>Our application follows four steps to ensure efficient and effective data collection, monitoring, and evaluation.</p></div>
        </div></div>

      <div id='frame2'>
        <div style={{ textAlign: "left" }} id='text'>
          <h1 style={{ fontSize: '18px', lineHeight: '60px', fontWeight: '700' }}>Streamline Data Gathering</h1>
          <p style={{ fontSize: '16px', lineHeight: '36px', fontWeight: '400' }}>In today&apos;s data-driven world, the ability to gather information efficiently and effectively is paramount. Our platform offers you a simplified and intuitive interface that empowers you to collect data from a wide range of sources with ease, all within a single, centralized hub.</p>
        </div>
        <div id='images'>
          <Image alt='frame' width={300} height={300} src='/Frame177.png'/>
        </div>
      </div>

      <div id='frame22'>
        <div id='images'>
          <Image alt='frame' width={300} height={300} src='/Frame178.png'/>
        </div>
        <div id='text'>
          <h1 style={{ fontSize: '18px', lineHeight: '60px', fontWeight: '700' }}>Real-Time Progress Monitoring</h1>
          <p style={{ fontSize: '16px', lineHeight: '36px', fontWeight: '400' }}>In the realm of data collection, where precision and timeliness are paramount, having a robust system in place to monitor progress in real-time can be a game-changer. </p>
        </div>
      </div>

      <div id='frame2' className='justify-center'>
        <div style={{ textAlign: "left" }} id='text'>
          <h1 style={{ fontSize: '18px', lineHeight: '60px', fontWeight: '700' }}>Evaluate and Elevate</h1>
          <p style={{ fontSize: '16px', lineHeight: '36px', fontWeight: '400' }}>Our platform goes beyond basic data analysis, offering a suite of advanced evaluation tools that enable you to delve deep into your data, uncover patterns, and derive actionable insights to inform your decision-making process.</p>
        </div>
        <div id='images'>
          <Image alt='frame' width={300} height={300}  src='/Frame180.png'/>
        </div>
      </div>

      <div id='frame22'>
        <div id='images'>
          <Image alt='frame' width={300} height={300} src='/Frame182.png'/>
        </div>
        <div id='text'>
          <h1 style={{ fontSize: '18px', lineHeight: '60px', fontWeight: '700' }}>Team Collaboration</h1>
          <p style={{ fontSize: '16px', lineHeight: '36px', fontWeight: '400' }}>Our platform is designed to enhance teamwork by offering a suite of powerful collaboration features that enable you to work seamlessly with your colleagues, share valuable insights, and collectively arrive at smart solutions. </p>
        </div>
      </div>

    </div>
  );
};

export default Steps;

