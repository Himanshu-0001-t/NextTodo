
"use client"
import axios from 'axios'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const Header = () => {
        const router = useRouter()
        
  const handleClick = async () =>{
        const response = await axios.get('api/users/logout')
        console.log(response.data)
        router.push('/login')
  }

  return (
        <nav className='flex items-center justify-around h-14 bg-orange-700'>
            <div className="text-2xl "> <Link href="/profile">Logo</Link></div>
            <ul className='flex items-center'> 
                <li className='px-8 cursor-pointer'> <Link href="/allTodos">All Todo</Link></li>
                <li className='cursor-pointer' onClick={handleClick}>Logout</li>
            </ul>
        </nav>
  )
}

export default Header