"use client"

import Header from '@/components/Header'
import axios from 'axios'
import React , {useState , useEffect} from 'react'


const profilePage = () => {

  const [isLoding , setIsLoding] = useState(false)
  const [btnDisable , setBtnDisable] = useState(true)
  const [todo , setTodo] = useState({
    title : "",
    des : "",
    userId : ""
  })

      const getUserDetail = async () =>{
         const res = await axios.get('/api/users/me')
         setTodo({...todo , userId : res.data.findUser._id })
      }

      useEffect(() =>{
        getUserDetail()
      } , [])
      
    const handleSubmit = async (e : any) =>{
      e.preventDefault()
      
      try {
        setIsLoding(true)
      
        const response = await axios.post("api/todo/addTodo" , todo);
        console.log(response.data)

        setTodo({title : "",des : "", userId : ""})

        alert(response.data.message)
      
      } catch (error) {
          console.log("Todo not add Try again")
      }finally{
        setIsLoding(false)
      }
  }
  
  useEffect(() => {
        if(todo.title.length > 0 && todo.des.length > 0){
          setBtnDisable(false)
        }else{
            setBtnDisable(true)
        }
  }, [todo])
  

  return (
   <>
   <Header/>
      <h1 className='text-center text-2xl mt-5'>Add Todo</h1>
      
      <form className='w-[60vw] mx-auto flex flex-col items-center' onSubmit={handleSubmit}>
            {isLoding ? <p className='my-4'>Procesisng....</p> : null}

          <div className='flex flex-col w-6/12 my-5'>
            <label htmlFor="title">Title</label>
            <input className='py-3 px-5 rounded-md text-black' value={todo.title} onChange={(e) => setTodo({...todo , title : e.target.value})} type="text" name="" id="title" placeholder='title' />
          </div>

          <div className='flex flex-col w-6/12 mb-5'>
            <label htmlFor="description">description</label>
            <textarea className='rounded-md py-3 px-5 min-h-40 max-h-80 text-black' value={todo.des} onChange={(e) => setTodo({...todo , des : e.target.value})} id="description" placeholder='description'></textarea>
          </div>
            <button type='submit' className='border-2 py-2 px-8 rounded-md bg-green-600 hover:bg-green-700 disabled:bg-black' disabled={btnDisable}>Add Todo</button>
      </form>

   </>
  )
}

export default profilePage