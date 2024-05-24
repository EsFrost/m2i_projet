import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logoFull from '../../../public/logo_full.png'
import { SignInButton,  SignedOut, SignUpButton, UserButton, SignedIn } from '@clerk/nextjs'

export const Header = () => {
    const logo = '@/src/app/media/logo_full.png'
  return (
    <header className='text-gray-600 body-font'>
        <div className='container mx-auto flex flex-wrap p-5 flex-row items-center justify-between mdim:flex-col'>
            <Link className='flex order-none title-font font-medium items-center text-gray-900 justify-center' href='/'>
                <Image src={logoFull} width={0} height={0} sizes='100vw' alt='Site logo' className='max-w-[5rem] h-full' />
                <span className="text-xl mdim:hidden">photoStockage</span>
            </Link>
        
            <nav className='flex flex-wrap items-center text-base mdim:mt-3'>
                <Link className='mr-5 hover:text-gray-900 bg-left-bottom bg-gradient-to-r from-[#4f46e5] to-[#d4d2f4] bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-500 ease-out' href='/'>Home</Link>
                <Link className='mr-5 hover:text-gray-900 bg-left-bottom bg-gradient-to-r from-[#4f46e5] to-[#d4d2f4] bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-500 ease-out' href='/about'>About</Link>
                <Link className='mr-5 hover:text-gray-900 bg-left-bottom bg-gradient-to-r from-[#4f46e5] to-[#d4d2f4] bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-500 ease-out' href='/contact'>Contact Us</Link>
            </nav>
            

            <div className="flex justify-end ml-0">
                <SignUpButton>
                    <button className="inline-flex items-center text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-0 mdim:mt-3">
                        Sign Up
                    </button>
                </SignUpButton>

                <SignedOut>
                    <SignInButton>
                        <button className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-0 mdim:mt-3 ml-5 text-inherit'>Login</button>
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <div className='px-3 pt-1 mdim:pt-5'>
                        <UserButton />
                    </div>
                </SignedIn>

            </div>
        </div>
    </header>
  )
}


/* 
<SignedIn>
    <UserButton />
</SignedIn>
*/