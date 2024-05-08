import React from 'react'
import Image from 'next/image'

export const Hero = () => {
  return (
    <section className="text-gray-600 body-font px-[2rem]">
        <div className="container mx-auto flex px-5 py-24 items-center">
            <div className="flex-grow pr-24 flex items-start text-left mb-0 flex-col">
                <h1 className="title-font text-3xl mb-4 font-medium text-gray-900">
                    Share your photos. Download photos for your next project
                    <br className='inline-block' />Start here.
                </h1>
                <p className="mb-9 leading-relaxed">
                    Do you have photos you want to share with others? Do you want to find photos to use for you next project? Are you tired of copyright protected material? Then this site is the place to be.
                    Start now by signing up or logging in.
                </p>
                <div className="flex justify-center">
                    <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                        Sign Up
                    </button>
                    <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                        Login
                    </button>
                </div>
            </div>
            <Image
                src='https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                width={0}
                height={0}
                alt='Picture'
                sizes='100vw'
                className='object-cover object-center rounded h-auto w-[720px] xl:w-[520px] lg:max-w-[480px] lg:min-w-[420px] lgcustom:hidden'
            />
        </div>
    </section>
  )
}
