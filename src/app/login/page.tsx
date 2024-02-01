"use client"

import axios from 'axios';
import Link from 'next/link';
import React, { useState , useEffect } from 'react'
import { useRouter} from 'next/navigation';

const loginPage = () => {
    const router = useRouter()

    const [err , setErr] = useState(null)
    const [hideBtn , setHideBtn] = useState(true)

    const [user , setUser] = useState({
        email : "",
        password : ""
    })

    const  handleSubmit = async (e : any) =>{

            e.preventDefault();
    
             const response = await axios.post('api/users/login' , user);
             setUser({email : "", password : "" })

             if(response.data.success === false){
                   setErr(response.data.message)
             }else{

                 router.push('/profile')
             }
           
            }    

     useEffect(() => {
    if( user.email.length > 0 && user.password.length > 0){
      setHideBtn(false)
    }else{
      setHideBtn(true)
    }

  }, [user])

    return (
        <div className="flex items-center justify-between h-screen">

            <div className="flex items-center justify-center flex-col w-2/5 h-screen bg-lime-600">
                <h1 className="text-4xl underline capitalize">First Time visit</h1>
                <p className="py-8 text-lg capitalize text-center">If you are first time visite then first go to Ragister page and sign up first</p>
                <button type="button" className="text-white border-2 py-2 px-8 rounded-lg text-lg hover:bg-lime-700">
                    <Link href="/"> SignUp</Link>
                </button>
            </div>
            <div className="flex items-center justify-center w-3/5 flex-col">
                <h1 className="text-5xl my-4 underline">Welcome</h1>
                <p>Login For plan your day</p>

                <p className='py-4 text-red-600'>{err}</p>

                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">

                    <input type="text" name="" id="email" placeholder="Enter Email" value={user.email} onChange={(e) => setUser({...user , email : e.target.value})} className="w-3/6 h-14 px-2 rounded-md text-black text-lg my-8" />

                    <input type="text" name="" id="password" placeholder="Enter password" value={user.password} onChange={(e) => setUser({...user , password : e.target.value})}  className="w-3/6 h-14 px-2 rounded-md text-black text-lg" />

                    <button type="submit" className="my-5 bg-green-800 hover:bg-green-600 py-3 px-8 text-lg rounded-md disabled:bg-black" disabled={hideBtn}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default loginPage