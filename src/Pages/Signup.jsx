import axios from 'axios'
import React, { useState } from 'react'
import { env } from '../env'
import toast from 'react-hot-toast'
import Spinner from '../Components/Spinner'
import { Link, useNavigate } from 'react-router-dom';


function Signup() {

  const [userData, setUserData] = useState({})
  const [loader, setloader] = useState(false)
  const navigate=useNavigate()

  const handlechange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]:value
  })
  }


  const handlesignup = async (e) => {
    e.preventDefault()
    try {
        setloader(true)
      let  res = await axios.post(`${env.BASE_URL}/user/signup`, userData)
      if (res.status === 201) {
        setloader(false)
        toast.success('User created successfully')
        userData.username = ""
        userData.password = ""
        userData.email = ""
        navigate('/sign-in')
        }    
    } catch (error) {
      if (error?.response?.status === 400) {
        setloader(false)
        toast.error(error.response.data.message)
      }
        }
  }
  



  return <>
    <div className='bg-gray-100 h-screen overflow-hidden fixed w-full'>
    <div class="flex  flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
        <div class="mt-1">
              <input id="username" name="username" type="username"  placeholder='Username' required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
           ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none pl-3"
                onChange={handlechange}  value={userData.username}/>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">      
            </div>
            
        <div class="mt-4">
              <input id="email" name="email" type="email" placeholder='email' required class="block w-full rounded-md 
          border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none pl-3"  onChange={handlechange} value={userData.email}/>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
      
            </div>
            
        <div class="mt-4">
                <input id="password" name="password" type="password"  placeholder='Password' required class="block 
          w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
           placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none pl-3"
                onChange={handlechange}  value={userData.password}/>
        </div>
      </div>


          

      <div className='mt-4'>
            <button class="flex w-full justify-center rounded-md bg-darkblue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
         hover:bg-darkblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={(e) => handlesignup(e)}>{loader ? <Spinner /> : "Sign Up"} </button>
          </div>
          
          
      <div className='mt-4'>
            </div>
            <div className='mt-4 flex justify-center'>
              <span className=' pr-3'>Have an account?</span>
              <Link to={'/sign-in'}><span className='text-blue-500  font-semibold cursor-pointer'>Sign In</span></Link>
          </div>

  </div>
</div>
    </div>

  </>
}

export default Signup
