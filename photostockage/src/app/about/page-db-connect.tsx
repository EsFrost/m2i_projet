import React from 'react'
import { fetchUsers } from '@/app/utils/query'
import { UserProps } from '@/app/utils/db'


export default async function About() {
  const data = await fetchUsers()
  const users: UserProps[] = JSON.parse(data)
  return (
    <>
      {/* <div className='min-h-[100vh] mx-auto'>About</div> */}
      <div className='min-h-[100vh] mx-auto'>
        {users.map(user => {
          return (
            <div key={user.user_id}>
              <span className='mr-5'>{user.username}</span>
              <span className='mr-5'>{user.email}</span>
              {user.user_icon ? <span>{user.user_icon}</span> : <span>User has no icon</span>}
            </div>
          )
        })}
      </div>
    </>
    
  )
}
