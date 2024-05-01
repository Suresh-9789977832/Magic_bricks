import { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom"
import { Usercontext } from "../Context/Context";

function Header() {


    const { istoken,user } = useContext(Usercontext)
    
    
    
   
    return <>
        <header className=' bg-violet-200 shadow-md h-20 max-3sm:h-16'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3  max-3sm:justify-between max-3sm'>
            <Link to={'/'}>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'> 
                <span className="text-slate-500">Magic</span>
                <span className="text-slate-700">Bricks</span>
                    </h1>
                    </Link>
            <form className="bg-slate-100  rounded-lg p-3 flex items-center max-3sm:hidden">
                    <input type='text' placeholder='Search....' className="bg-transparent focus:outline-none w-24 sm:w-64 h-4" />
                    <FaSearch className="text-slate-600 cursor-pointer"/>
                </form>
                <ul className="flex gap-4 justify-center">

                    {
                        user && <Link to={'/'}>
                        <li className="hidden sm:inline text-slate-700 hover:underline">Home</li>
                            </Link>
                  }  

                    {
                        user &&   <Link to={''}>
                        <li className="hidden sm:inline text-slate-700 hover:underline">About</li>
                        </Link>
                    }
                  

                    {
                        istoken ? <>
                             <Link to={'/profile'}>
                    <img src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" alt="profile" className="h-7 w-7 rounded-full object-cover"/>
                    </Link>
                        </> :
                            <>
                    <Link to={'/sign-up'}>
                    <li className=" text-slate-700 hover:underline">Sign Up</li>
                    </Link>
                            </>
                    }
                  

                   
                </ul>
            </div>
          
        </header>
    </>
}

export default Header
