import React, { useContext, useEffect, useState } from 'react'
import DarkVariantExample from '../Components/Carosel'
import { IoLocation } from "react-icons/io5";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { MdChair } from "react-icons/md";
import { Usercontext } from '../Context/Context';
import axios from 'axios';
import { env } from '../env';


function Listingpage() {

    const [postdata, setpostdata] = useState([])
    const token = sessionStorage.getItem('token')
    const {logout}=useContext(Usercontext)
    const params=useParams()
    const id = params.id
    

    useEffect(() => {
        let getpostbyid = async() => {
            try {
                let res = await axios.get(`${env.BASE_URL}/post/getbyid/${token}/${id}`)
                setpostdata(res.data)
            } catch (error) {
                if (error?.response?.status === 401) {
                    logout
                }
                if (error?.response?.status === 500) {
                    logout
                }
            }
        }
        getpostbyid()
    }, [])
    console.log(postdata)

    return <>
     
                    <div className='mb-5'>
                            <DarkVariantExample img={postdata?.imgurls} />
                    </div>
                    
                    <div className='max-w-4xl mx-auto max-3md:px-10 max-3ssm:px-4'>
                        <div className='flex mb-3 text-black'>
                                <h3 className=' max-3sm:text-lg'>{postdata?.name} -</h3>
                                <h3 className=' max-3sm:text-lg'>$ {postdata?.regularprice}</h3>
                        </div>
                        <div>
                            <div className='flex items-center gap-2 '>
                            <span><IoLocation  className=' text-green-600'/></span>
                                    <span className='text-gray-800  font-semibold'>{postdata?.address}</span>
                            </div>
                            <button className='w-full h-9 border bg-red-800 text-white rounded-md mt-2 '>For {postdata?.type}</button>
                        </div>
                        <div className='mt-3'>
                            <span className='font-semibold text-black'>Description - </span>
                                <span>{postdata?.description}</span>
                        </div>
                        <div className='mt-3'>
                            <span className='mr-6  text-green-900'>
                                <span><FaBed className=' inline-block'/>&nbsp;</span>
                                    <span>{postdata?.bedrooms} beds</span>
                            </span>
                            <span className='mr-6 text-green-900'>
                                <span><FaBath className=' inline-block'/>&nbsp;</span>
                                    <span>{postdata?.bathrooms} baths</span>
                            </span>
                            <span className='mr-6 text-green-900'>
                                    <span><FaParking className=' inline-block' />&nbsp;</span>
                                    {postdata?.parking==true?<span>Parking Spot</span>:<span>No parking</span>}
                            </span>
                            <span className='mr-6 text-green-900'>
                                <span><MdChair className=' inline-block'/>&nbsp;</span>
                                    {postdata?.furnished==true?<span>Furnished</span>:<span>Not Furnished</span>}
                            </span>
                        </div>
                        <div className='my-5 w-full flex justify-center border bg-gray-700 text-white h-12 rounded-lg'>
                            <button>CONTACT LANDLORD</button>
                        </div>
        
        
                    </div>            
        
    </>
}

export default Listingpage
