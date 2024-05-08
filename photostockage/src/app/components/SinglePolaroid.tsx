import React from 'react'
import Image from 'next/image'

export const SinglePolaroid = () => {
  return (
    <div className='mt-[5rem] min-h-[100vh] mx-auto'>
      <div className='
                border-solid border-1 border-gray-900 p-[15px] pb-[60px] shadow-[5px_15px_15px_rgb(225,225,225)] h-full relative
                after:content-[attr(polaroid-caption)] after:absolute after:bottom-0 after:left-0 after:w-[100%] after:text-center after:p-[10px] after:text-[30px]
                hover:shadow-[-5px_15px_15px_rgb(225,225,225)] transition-all duration-500
                ' polaroid-caption='Image 1'>
        <Image
              src='https://images.pexels.com/photos/20412111/pexels-photo-20412111/free-photo-of-cactus.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              alt='Picture'
              sizes='100vw'
              width={0}
              height={0}
              quality={100}
              className='w-full object-scale-down max-w-[80vw] max-h-[80vh]'
              unoptimized
        />
      </div>
    </div>
    
  )
}