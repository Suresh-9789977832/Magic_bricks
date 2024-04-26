import Spinner from '../Components/Spinner'
import axios from 'axios'
import  { useContext, useState } from 'react'
import { env } from '../env'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom';
import { Usercontext } from '../Context/Context'

function SignIn() {

  const [userData, setUserData] = useState({})
  const [loader, setloader] = useState(false)
  const navigate = useNavigate()
  const {setuser,setistoken}=useContext(Usercontext)

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
      let  res = await axios.post(`${env.BASE_URL}/user/login`, userData)
      if (res.status === 200) {
        sessionStorage.setItem('token', res.data.token)
        setuser(res.data.finaldata)
        setloader(false)
        setistoken(true)
        // toast.success('User cr')
        userData.password = ""
        userData.email = ""
        navigate('/')
        }    
    } catch (error) {
      if (error?.response?.status === 400) {
        setloader(false)
        toast.error(error.response.data.message)
        console.log(error)
      }
        }
  }
  


  return   <div className='bg-gray-100 h-screen overflow-hidden fixed w-full'>
  <div class="flex  flex-col justify-center px-6 py-12 lg:px-8">
<div class="sm:mx-auto sm:w-full sm:max-w-sm">
  <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign In</h2>
</div>

<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  

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
        
        
   
          <div className='mt-4 items-center flex justify-center'>
            <span className=' pr-3'>Dont Have an account?</span>
            <Link to={'/sign-up'}><span className='text-blue-500  font-semibold cursor-pointer'>Sign Up</span></Link>
        </div>

</div>
</div>
  </div>
}

export default SignIn
