import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cards from '../Components/Cards'
import axios from 'axios'
import { env } from '../env'
import Searchcards from '../Components/Searchcards'
import { Usercontext } from '../Context/Context';

function Search() {
   
    let [data, setdata] = useState([])
    let token = sessionStorage.getItem("token")
    let {logout}=useContext(Usercontext)

    const [sidebar, setsidebar] = useState({
        searchterm: "",
        type: 'all',
        parking: false,
        furnished: false,
        
    })

    
const navigate=useNavigate()
    const handlechange = (e) => {
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setsidebar({...sidebar,type:e.target.id})
        }

        if (e.target.id === 'searchterm') {
            setsidebar({...sidebar,searchterm:e.target.value})
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished') {
            setsidebar({...sidebar,[e.target.id]:e.target.checked || e.target.checked =='true'?true:false})
        }
            
    }


    useEffect(() => {
        const getallpost = async () => {
            try {
                let res = await axios.get(`${env.BASE_URL}/post/getallpost/${token}`)
                setdata(res.data)
            } catch (error) {
                if (error?.response?.status === 400) {
                    setloader(false)
                    logout
                }
                if (error?.response?.status === 401) {
                    setloader(false)
                    logout
                  }
            }
           
        }
        getallpost()
    },[data])


    

    return <>
        <div className='grid grid-cols-[3fr] h-full bg-gray-100 '>
           
            <div className='m-3'>
                <h3 className='ml-2'>Listing results:</h3>
                <hr />
                <div className='flex row gap-4 justify-center'> 
                {
                    data.map((e) => {
                        return <Searchcards final={e}/>
                    })
                }
                </div>
               
            </div>

        </div>
    </>
}

export default Search
