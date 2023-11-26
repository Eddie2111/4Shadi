'use server';

import { cookies } from 'next/headers'
import Axios from 'axios';
interface IQueryProps {
        location: boolean,
        preference: boolean,
        age: number[]
}
export default async function Handler(Query:IQueryProps) {
  const cookieStore = cookies()
  const token = cookieStore.get('user_token')
  try {
    const response = await Axios.post("http://localhost:3200", { Query, token }, { withCredentials: true})
    console.log(response.data);
    return response.data.data;
  } catch (err) {
      console.log(err)
      return err
  }
}
