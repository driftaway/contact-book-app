import client from '../http/client'

export const fetchUsers = (results: number) => client.get(`https://randomuser.me/api?results=${results}`)