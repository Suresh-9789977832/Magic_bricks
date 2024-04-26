import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Spinner from '../Components/Spinner'
import { Usercontext } from '../Context/Context'
import axios from 'axios'
import { env } from '../env'
import toast from 'react-hot-toast'

function Profile() {

  const token=sessionStorage.getItem('token')  
  const [email, setemail] = useState('')
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [usersposts, setuserposts] = useState([])
  const[hide,sethide]=useState(false)

  
  const { logout, user,setistoken } = useContext(Usercontext)
  const navigate=useNavigate()

  useEffect(() =>{
    setemail(user.email)
    setusername(user.username)
  }, [user])
  
  const deletepost = async(id) => {
    let res = await axios.delete(`${env.BASE_URL}/post/deleteuserpost/${id}`)
    toast.success("Post Deleted")
  }

  useEffect(() => {
    let getuserpost = async() => {
      let res = await axios.get(`${env.BASE_URL}/post/finduserposts/${token}`)
      setuserposts(res.data)
    }
    getuserpost()
  },[deletepost])

  const handleEdit = async () => {
    try {
      let editdata = await axios.put(`${env.BASE_URL}/user/changeuser/${token}`, { email, username, password })
      if (editdata.status === 200) {
        toast.success(editdata.data.message)
        setistoken(false)
        sessionStorage.removeItem('token')
        navigate('/')
      }

    } catch (error) {
      if (error?.response?.status === 498) {
        logout
    }
    if (error?.response?.status === 401) {
        logout
      }
      if (error?.response?.status === 500) {
        logout
      }
      
    }
  }


  
 
  return <>
    <div className=' w-auto'>
  <div class="flex  flex-col justify-center  m-10 max-3sm:m-5">
<div class="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center my-8">
  <h2 class="mt-0 text-center text-3xl font-semibold leading-9 tracking-tight text-gray-900 flex">Profile</h2>
        </div>



<div class="mx-auto w-96 max-3ssm:w-80 max-3sssm:w-72">
  

    <div>
            
            <div class="mt-4">
              <input id="username" name="username" type="username"  placeholder='Username' required class="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
           ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none pl-3" 
           onChange={(e)=>setusername(e.target.value)}  value={username} />
        </div>
          
          
      <div class="mt-4">
            <input id="email" name="email" type="email" placeholder='Email' required class="block h-12 w-full rounded-md 
        border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
        focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none pl-3"   onChange={(e)=>setemail(e.target.value)} value={email}/>
      </div>
    </div>

    <div>
      <div class="flex items-center justify-between">
    
          </div>
          
      <div class="mt-4">
              <input id="password" name="password" type="password"  placeholder='Password' required class="block 
        w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset h-12 ring-gray-300 
         placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none pl-3"
         onChange={(e)=>setpassword(e.target.value)}  value={password} />
      </div>
    </div>


        

    <div className='mt-4'>
          <button class="flex w-full justify-center rounded-md bg-darkblue px-3 py-1.5 text-md  leading-6 text-white shadow-sm 
       hover:bg-darkblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleEdit}>UPDATE</button>
          </div>

          <div className='my-4'>
            <Link to={'/create'}>
          <button class="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-md leading-6 text-white shadow-sm
       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >CREATE LISTING</button>
              </Link>
          </div>

          <div className='mt-4 flex justify-between text-basered'>
            <button>Delete Account</button>
            <button onClick={logout}>Sign out</button>
          </div>


          <div className='mt-4 flex justify-center text-green-700' onClick={()=>sethide(true)}>
            <button>Show listings</button>
          </div>
          
        {hide && <div>
            <div className='flex justify-center mt-5 text-black'>
              <h4>Your listing</h4>
            </div>

            {
                usersposts && usersposts?.map((e) => {
                  return  <div className='flex justify-between mt-3 border border-gray-300 p-3 max-3sm:text-sm'>
                  <div className='flex items-center gap-2'>
                      <span><img src={'https://magic-bricks.onrender.com/'+e.imgurls[0]} className='w-20'/></span>
                      <span className='text-sm'>{e.name}</span>
                  </div>
                 
                  <div className='flex flex-col'>
                    <button className='text-red-600' onClick={()=>deletepost(e._id)}>DELETE</button>
                   <Link to={`/edit/${e._id}`}><button className='text-green-600'>EDIT</button></Link> 
                  </div>
                </div>
                })
              }

           

           

            <div>

            </div>
          </div> }
          

        
        </div>

      </div>
  </div>
  </>
}

export default Profile
