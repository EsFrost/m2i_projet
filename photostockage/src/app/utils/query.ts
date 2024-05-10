import { callUsers } from '@/app/utils/db'

export async function fetchUsers() {
  try {
    const response = await callUsers('SELECT * FROM users', [])
    const data = JSON.stringify(response)
    return data
  }
  catch (err) {
    console.log(err)
    throw new Error('Failed to fetch users\' data.')
  }
}
