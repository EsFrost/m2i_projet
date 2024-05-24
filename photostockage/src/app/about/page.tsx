import React from 'react'
import { auth } from '@clerk/nextjs/server'

export default function About() {

  const { userId, sessionClaims } = auth()

  return (
    <>
      {/* <div className='min-h-[100vh] mx-auto'>About</div> */}
      <div className='min-h-[100vh] mx-auto'>
        About
        {userId ? (<p>Logged in</p>) : (<p>Logged out</p>)}
      </div>
    </>
    
  )
}
