"use client"

import React  , {useState , useEffect} from 'react'
import axios from 'axios'
import Header from '@/components/Header'

const allTodosPage = () => {
  const [todo , setTodo] = useState([])

    const getTodos = async () =>{

        const res = await axios.get('/api/todo/allTodos')
      
         setTodo(res.data.allTods)
        }

        console.log(todo)

        useEffect(() =>{
              getTodos()
        } , [])

  return (
    <>
     <Header/>
          <div className='flex items-center justify-around h-full my-10'>

          {todo.map((elm : any) =>{
            return  <div key={elm._id} className='border-2 p-5 min-w-80 max-w-2xl mx-20'>
                           <p>Title : {elm.title} </p>
                           <p>Description : {elm.des}</p>
                        </div>
          })}
        </div>
    </>
  )
}

export default allTodosPage