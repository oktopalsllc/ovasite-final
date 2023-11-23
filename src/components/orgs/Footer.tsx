import Link from 'next/link';

import Image from "next/image";
import SocialIcon from '@/components/social-icons';

export default function Footer() {
    return (
        <footer className="mx-auto max-w-[1920px] px-6 bg-white">
            <hr className='w-full h-2' />
            <div className="flex flex-row justify-between gap-8 py-8 lg:px-20 px-4 text-gray-800 transition-colors duration-150 border-b bg-white">
                <div className="col-span-1 lg:col-span-2 text-gray-800">
                    <div className="flex flex-col flex-initial md:flex-1">
                        <Link
                            href="/"
                            className="pb-2 transition duration-150 ease-in-out hover:text-[#FF595A]"
                        >
                            <Image alt="Logo" src="/Logo.png" width={40} height={40} />
                        </Link>
                        <Link
                            href="/"
                            className="pb-2 transition duration-150 ease-in-out hover:text-[#FF595A]"
                        >
                            About
                        </Link>
                        <Link
                            href="/features"
                            className="pb-2 transition duration-150 ease-in-out hover:text-[#FF595A]"
                        >
                            Features
                        </Link>
                        <Link
                            href="/pricing"
                            className="pb-2 transition duration-150 ease-in-out hover:text-[#FF595A]"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/contact"
                            className="pb-1 transition duration-150 ease-in-out hover:text-[#FF595A]"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
                <div className="col-span-1 lg:col-span-2 text-gray-800">
                    <div className="flex flex-col flex-initial md:flex-1">
                        <p className="pb-2 font-bold transition duration-150 ease-in-out hover:text-[#FF595A]">
                            LEGAL
                        </p>
                        <Link
                            href="/privacy"
                            className="pb-2 transition duration-150 ease-in-out hover:text-[#FF595A]"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="pb-2 transition duration-150 ease-in-out hover:text-[#FF595A]"
                        >
                            Terms of Use
                        </Link>
                    </div>
                </div>
                <div className="flex items-start col-span-1 text-white lg:col-span-6 lg:justify-end">
                    <div className="flex items-center h-10 space-x-6">
                        <div className="flex mt-10 lg:mt-0 flex-col lg:flex-row gap-2">
                            <SocialIcon kind="mail" href={`mailto:contact@oktopals.com`} size={6} />
                            <SocialIcon kind="linkedin" href='https://www.linkedin.com/company/httpswwwlinkedincomoktopalsllc' size={6} />
                            <SocialIcon kind="twitter" href='https://twitter.com/oktopals' size={6} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-gray-800 flex flex-col items-center justify-between py-8 lg:px-20 px-4 space-y-4 md:flex-row bg-white">
                <div>
                    <span>
                        &copy; {new Date().getFullYear()} All rights reserved.
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-800">Crafted by&nbsp;</span>
                    <Link href="https://oktopals.com" target='_blank' aria-label="Oktopals Link" className='text-[#FF595A] hover:text-[#fe5000] title-font font-bold text-xl'>

                        Oktopals
                    </Link>
                </div>
            </div>
        </footer>
    );
}