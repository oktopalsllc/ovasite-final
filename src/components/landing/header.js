"use client"
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import '@/styles/styles.css'
import Image from 'next/image';


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const menuHeight = menuOpen ? 'auto' : '0'; // Set it to 'auto' when open

  const menuStyle = {
    height: menuHeight,
    overflow: 'hidden',
    transition: 'height 0.3s ease', // Transition the height property
  };
  const linkStyles = {
    display: 'flex',
    fontWeight: 500,
    alignItems: 'center',
    color: '#333',
    marginTop: '14px',
    justifyContent: 'center',
  };
  return (
    <header className=" body-font fixed w-full z-50">
      <div className="custom-container">
        <div className="text-[#1F1F1F] body-font" style={{ backgroundColor: 'white' }}>
          <div className="container mx-auto flex flex-wrap  flex-col md:flex-row items-center" style={{ paddingTop: '5px', paddingBottom: '-5px', paddingRight: '10px' }}>
            <Link href='/' className="flex title-font font-bold items-center mb-4 md:mb-0 " style={{ color: 'rgb(256, 89, 90)', marginLeft: '50px' }}>
              <Image alt='Logo' src='/Logo.png' width={60} height={60} />
            </Link>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center gap-4">
              <Link className="mr-5 hover:text-[#FF595A]" href='/'>Home</Link>
              <Link className="mr-5 hover:text-[#FF595A]" href='/about'>About</Link>
              <Link className="mr-5 hover:text-[#FF595A]" href='/features'>Features</Link>
              <Link className="mr-5 hover:text-[#FF595A]" href='/pricing'>Pricing</Link>
            </nav>
            <Link href="/signin"> <button className="inline-flex items-centerborder-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" style={{ marginRight: '10px' }}>Sign In
            </button></Link>

            <Link href="/signup"> <button className="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-[#fe5000] rounded text-base mt-4 md:mt-0 bg-[#FF595A] text-[white]" >Get Started
            </button></Link>
          </div>
        </div></div>

      <div id='header'>
        <div style={linkStyles} id='divs'>
          <Link href='/' className="flex title-font font-bold items-center mb-4 md:mb-0 " style={{ color: 'rgb(256, 89, 90)', marginLeft: '50px' }}>
            <Image alt='Logo' src='/Logo.png' width={60} height={60} />
          </Link>
          <div>
          </div>
          <div></div>
        </div> <span id="span" onClick={toggleMenu}>&#9776;</span>

      </div>

      <div>
        <ul id='ul' style={menuStyle}>
          <li><Link className="hover:text-[#fe5000] cursor-pointer text-[#1F1F1F]" href='/home' onClick={closeMenu}>Home</Link></li>
          <li><Link className="hover:text-[#fe5000] cursor-pointer text-[#1F1F1F]" href='/about' onClick={closeMenu}>About</Link></li>
          <li><Link className="hover:text-[#fe5000] cursor-pointer text-[#1F1F1F]" href='/features' onClick={closeMenu}>Features</Link></li>
          <li> <Link className="hover:text-[#fe5000]  cursor-pointer text-[#1F1F1F]" href='/pricing' onClick={closeMenu}>Pricing</Link></li>
          <li><Link className="hover:text-[#fe5000] cursor-pointer text-[#1F1F1F]" href='/signin' onClick={closeMenu}>Sign In</Link></li>
          <li>
            <Link href="/signup">
              <button className="items-center bg-[#FF595A] border-0 py-2 px-6 focus:outline-none 
    hover:bg-[#fe5000] rounded text-[#001233]  font-bold"  onClick={closeMenu}>Get Started
                {/* <svg fill="none" stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7"></path>
    </svg>*/}
              </button>
            </Link>
          </li>
        </ul>

      </div>
    </header>
  );
}

export default Header;