'use client';
import Image from 'next/image';
import Hero from '@/components/home/hero';
import Content from '@/components/home/content';
import Uses from '@/components/home/uses';
import Steps from '@/components/home/steps';

export default function Home() {
  const mainStyles = {
    background: 'Beige-[#DDD0C8]',
    minHeight: '50vh', // Set a minimum height to fill the viewport
    overflow:"hidden",
  };
  return (
    <main style={mainStyles}>
      <Hero />
      <Content />
      <Steps/>
      <Uses />
    </main>
  )
}
