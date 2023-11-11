'use client';
import { authService } from '@/services/auth-service/auth.service.ts';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '@/styles/styles.css';

const Page =() => {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    }; 

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try{
            const email = e.target[0].value;
            const password = e.target[1].value;
            const response = await authService.signin(email, password);
            const {access_token, userInfo} = response;
            // if(response === false || response === undefined)
            // {
            //     console.log("Invalid credentials");
            //     return;
            // }
            localStorage.setItem("token", access_token);
            localStorage.setItem("userId", userInfo.id);
            router.push(`/orgs`);
        }
        catch(err){
            console.log(err);
        }
    };

    return (
        <>
            <div>
                {/* first page */}
                <div>
                    <div id='account' className='flex flex-col justify-center'>
                        <div>
                            <Link href='/'>
                                <Image src='/Logo.png' alt='' width={70} height={70} style={{ marginLeft: '20%', marginTop: '10px' }} />
                            </Link>
                            <div className="flex flex-1 flex-col justify-center px-4 py-2 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                                <div className="mx-auto w-full max-w-sm lg:w-96">
                                    <div>
                                        <h1 className="title-font font-bold text-xl text-[#001233] mb-4 mt-10">Welcome Back</h1>
                                    </div>

                                    <div className="mt-10">
                                        <div>
                                            <form action="email" onSubmit={handleSubmit} className="space-y-6">
                                                <div>
                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Email
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="email"
                                                            name='email'
                                                            type="email"
                                                            autoComplete="email"
                                                            required
                                                            className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#001233] focus:ring-[#001233] block w-full rounded-md sm:text-sm focus:ring-1'
                                                            placeholder='email' 
                                                            />
                                                    </div>
                                                </div>

                                                <div className="mt-2 relative">
                                                    <input
                                                        id="password"
                                                        name='password'
                                                        type={passwordVisible ? 'text' : 'password'}
                                                        autoComplete="current-password"
                                                        required
                                                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#001233] focus:ring-[#001233] block w-full rounded-md sm:text-sm focus:ring-1"
                                                        placeholder="Password"
                                                    />
                                                    <Image
                                                        src={passwordVisible ? '/show.png' : '/hide.png'}
                                                        alt={passwordVisible ? 'Show Password' : 'Hide Password'}
                                                        className="absolute top-1/2 transform -translate-y-1/2 right-2 w-5 h-5 cursor-pointer"
                                                        onClick={togglePasswordVisibility}
                                                        width={20}
                                                        height={20}
                                                    />


                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <input
                                                            id="remember-me"
                                                            name="remember-me"
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-[#001233] text-[#001233] focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-[#001233]">
                                                            Remember me
                                                        </label>
                                                    </div>

                                                    <div className="text-sm leading-6">
                                                        <Link href="/ForgotPassword" className="font-semibold text-[#001233] hover:text-[#001233]">
                                                            Forgot password?
                                                        </Link>
                                                    </div>
                                                </div>

                                                <div>
                                                    <button
                                                        type="submit"
                                                        className="flex w-full justify-center rounded-md bg-[#FF595A] px-3 py-1.5 text-sm font-bold leading-6 text-[white] shadow-sm hover:bg-[#fe5000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#001233]"
                                                    >
                                                        Sign In
                                                    </button>
                                                </div>
                                            </form>
                                        </div>

                                        <div className="mt-10">
                                            <div className="relative">
                                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                    <div className="w-full border-t border-gray-200" />
                                                </div>
                                            </div>

                                            <div className="mt-6 grid gap-4">

                                                <p className="text-[#001233] text-sm mt-3 text-center">
                                                    Don&apos;t have an account?{' '}
                                                    <Link href="/signin" className="font-bold text-[#FF595A] hover:text-[#001233]">
                                                        Sign Up.
                                                    </Link>
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;