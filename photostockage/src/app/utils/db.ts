import mysql from 'mysql2/promise'

export interface UserProps {
    user_id: number,
    username: string,
    email: string,
    password: string,
    user_icon?: string
}

export async function callUsers(query: string, data: UserProps[]) {
    try {
        const db = await mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            database: 'test',
            user: 'root',
            password: '',
        })
        const [res] = await db.execute(query, data)
        await db.end()
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}