import React from 'react';
import TopHeader from '@/components/features/topheader';
import '@/styles/styles.css';
import Image from 'next/image';


export default function features() {
    return (
      <div>
      <TopHeader />
      <div id='div1'>
       <div>
        <h1 style={{fontWeight:'bolder',fontSize:25,}}> Data Collection and Storage</h1>
        <ul>
          <li>Quickly build questionnaires with our intuitive tools</li>
          <li>Gather and keep track of different types of information about your project or program.</li>
          <li>Our system is flexible enough to handle numbers-based data (like counts or measurements) as well as descriptive data.</li>
          <li>Get data from different places, like surveys, one-on-one discussions, group discussions, and official documents.</li>
        </ul>
       </div>
       <div id='divsnd'>
       <Image src='/survey.png' alt='desc' width={400} height={100}/>
       </div>
        </div>

        <div id='div1'>
        <div id='divsnd'>
       <Image src='/devices.png' alt='desc' width={400} height={100}/>
       </div>
       <div>
        <h1 style={{fontWeight:'bolder',fontSize:25,}}>Real-time Data Entry, updating and analysis</h1>
        <ul>
          <li>Our system facilitates real-time data entry and updating to ensure the most current information is available for analysis</li>
          <li>Data can be collected on any smart device both online and offline</li>
          <li>Review and validate data in real time</li>
          <li>Export data in different formats</li>
          <li>Visualize data with custom maps and reports</li>
        </ul>
       </div>
        </div>

        <div id='div1'>
       <div>
        <h1 style={{fontWeight:'bolder',fontSize:25,}}> Tracking, Reporting and Visualization</h1>
        <ul>
          <li>Use our performance indicators and targets to measure the progress of your project or program.</li>
          <li>Generate automated reports and visualizations to present data in a clear and understandable format, including graphs, charts, and dashboards..</li>
          <li>Customize reports based on specific requirements and user roles</li>
          <li>Integrate with project management and finance systems to avoid duplication of data entry and facilitate seamless information flow</li>
        </ul>
       </div>
       <div id='divsnd'>
       <Image src='/indicators.png' alt='desc' width={400} height={100}/>
       </div>
        </div> 
         <div id='background'> 
 <div style={{marginBottom:40,}}><h1 style={{fontWeight:'bolder',fontSize:25,textAlign:'center',}} id='hstyle'> And that is not all!</h1>
    <p style={{fontWeight:'bolder',textAlign:'center',}} id='hstyle'>Our system boosts of extra tools to help you find solution to your data Collection needs</p>
   </div>
    <div id='div2'>
       <div>
        <h2 style={{fontWeight:'bolder',}}>Data Security and Privacy</h2>
      <p> Strong data security measures are in place to protect your sensitive information.
       and you also have full control of access to your data</p>
       </div>
       <div>
        <h2 style={{fontWeight:'bolder',}}>Data Validation and Quality Assurance</h2>
        <p>Our system include validation checks to ensure data accuracy and consistency.
</p>
       </div>
       <div>
        <h2 style={{fontWeight:'bolder',}}>Alerts and Notifications</h2>
        <p>Receive automated alerts and notifications on progress and activities related to your project</p>
       </div>
       <div>
        <h2 style={{fontWeight:'bolder',}}>Data Export and Import</h2>
     <p>Export data in various formats (e.g., CSV, Excel) and import data from external sources to your project</p>
       </div>
        </div>
        </div> 
      </div>
        );
    }
    
