"use client"

import axios from "axios";
import Link from "next/link";
import {useState , useEffect} from 'react'
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter();

  const [loding , setLoding] = useState(false)
  const [exist , setExist] =useState(false)
  const [hideBtn , setHideBtn] = useState(true)

  const [user , setUser] = useState({
    name : "",
    email : "",
    password : ""
  })

  const handleSubmit = async (e : any) =>{
        e.preventDefault();

        try {
          setLoding(true)
          const response =  await axios.post('api/users/signup' , user);

          setUser({
         name : "",
          email : "",
        password : ""
  })

          if(response.data.userExist){
            setExist(true)
          }else{
            setExist(false)
            router.push('/login')
          }

        } catch (error:any) {
            console.log("Form not submit" , error.message)
        }finally{
          setLoding(false)
        }
  }

  useEffect(() => {
    if(user.name.length > 0  && user.email.length > 0 && user.password.length > 0){
      setHideBtn(false)
    }else{
      setHideBtn(true)
    }
  }, [user])
  
  return (
      <div className="flex items-center justify-between h-screen">
        <div className="flex items-center justify-center flex-col w-2/5 h-screen bg-lime-600">
                  <h1 className="text-4xl underline">Already have account</h1>
                  <p className="py-8 text-lg">Login to your account to fill the your personal details</p>
                  <button type="button" className="text-white border-2 py-2 px-8 rounded-lg text-lg hover:bg-lime-700">
                    <Link href="/login"> Login</Link>
                  </button>
         </div>

          <div className="flex items-center justify-center w-3/5 flex-col">
          <h1 className="text-3xl my-4 underline">Ragister Here</h1>

        {loding? <p className="text-white">Proceseing....</p> : null}

          {exist ? <p className="text-red-700 capitalize">User is Already exist use defrent email</p> : null}

          <form onSubmit={handleSubmit} className="w-full flex flex-col p-5 items-center"> 
              
              <input type="text" name="" id="name" placeholder="Enter name" 
               value={user.name} onChange={(e) => setUser({...user , name : e.target.value })} className="w-3/6 h-14 px-2 rounded-md text-black text-lg " />
              
      
              <input type="text" name="" id="email" placeholder="Enter Email"
                value={user.email} onChange={(e) => setUser({...user , email : e.target.value })}  className="w-3/6 h-14 px-2 rounded-md text-black text-lg my-8" />
      
               
              <input type="text" name="" id="password" placeholder="Enter password" 
                value={user.password} onChange={(e) => setUser({...user , password : e.target.value })}  className="w-3/6 h-14 px-2 rounded-md text-black text-lg" />

            <button type="submit" className="my-5 bg-green-800 hover:bg-green-700 py-3 px-8 text-lg disabled:bg-black rounded-md" disabled={hideBtn}> Sign up</button> 

          </form>

        </div>
    </div>
  );
}
