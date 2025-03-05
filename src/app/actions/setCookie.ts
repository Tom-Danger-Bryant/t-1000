'use server'
import { cookies } from 'next/headers'



const setCookie = async (name : string ,payload : string ) => {
    cookies().set(name,payload);
}

const getCookie = async (name: string ) => cookies().get(name)


export {
    setCookie,
    getCookie
}