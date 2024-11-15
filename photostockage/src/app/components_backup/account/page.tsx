import React from 'react'
import Image from 'next/image'
import logoFull from '../../../public/logo_full.png'
import Link from 'next/link'


export default async function Account() {
    return (
        <div className='min-h-[100vh] flex px-[5rem] md:px-5 sm:px-0 mx-auto'>
         <div className="post-card flex justify-center divide-x divide-solid divide-blue-900 border-blue-900 border-solid border-2 mt-[5rem] outline outline-2 
                        outline-offset-[15px] outline-blue-900 p-10 lgcustom:flex-col lgcustom:items-center lgcustom:divide-none lgcustom:text-center usm:outline-0 usm:border-0 usm:p-0">
            <div className="left w-1/2 flex flex-col items-center flex-wrap lgcustom:min-w-full pr-[0.25rem]">
                <Image src={logoFull} width={0} height={0} sizes='100vw' alt='Site logo' className='w-[5rem] h-auto pt-24 mb-4' />
                <p className='text-gray-600 mx-auto leading-relaxed text-base'>You can also contact us through email.</p>
                <p className='text-gray-600 mx-auto leading-relaxed text-base'>Email: photostockage@photostockage.com</p>
                <p className='text-gray-600 mx-auto leading-relaxed text-base'>Or through our social media links that can be found <Link href='/'>here</Link></p>
            </div>

            <div className="right w-1/2 lgcustom:min-w-full">
                <section className="text-gray-600 body-font relative">
                    <div className="container py-24 mx-auto">
                        <div className="flex flex-col text-center w-full mb-12">
                            <h1 className="text-3xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
                            <p className="w-2/3 mx-auto leading-relaxed text-base">For any questions you might have. For any suggestions. Or just to chat with us.</p>
                        </div>
                            <div className="w-1/2 mx-auto">
                                <div className="flex flex-wrap -m-2">
                                    <div className="p-2 w-1/2 lgcustom:w-full">
                                        <div className="relative">
                                            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                            <input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div className="p-2 w-1/2 lgcustom:w-full">
                                        <div className="relative">
                                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                            <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div className="p-2 w-full">
                                        <div className="relative">
                                            <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                                            <textarea id="message" name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                        </div>
                                    </div>
                                    <div className="p-2 w-full">
                                        <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Send message</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
    )
}
