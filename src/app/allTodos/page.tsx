"use client"

import React  , {useState , useEffect} from 'react'
import axios from 'axios'
import Header from '@/components/Header'

const allTodosPage = () => {
  const [todo , setTodo] = useState([])

    const getTodos = async () =>{

        const res = await axios.get('/api/todo/allTodos')
        console.log(res.data.allTods, "This is respponse")
         setTodo(res.data.allTods)
        }

        console.log(todo)

        useEffect(() =>{
              getTodos()
        } , [])
        
  return (
    <>
     <Header/>
    
          {todo.map((elm : any) =>{
                   return  <div key={elm._id}>
                           <p>Title : {elm.title} </p>
                           <p>Description : {elm.des}</p>
                        </div>
          })}
    </>
  )
}

export default allTodosPage