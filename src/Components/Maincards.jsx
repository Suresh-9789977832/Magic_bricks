import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import axios from 'axios'
import { env } from '../env'


function Maincards({ title, des }) {
    
    let [data, setdata] = useState([])
    let [rent, setrent] = useState([])
    let [sale,setsale]=useState([])

    let token=sessionStorage.getItem('token')

        useEffect(() => {
        const getallpost = async () => {
            let res = await axios.get(`${env.BASE_URL}/post/getallpost/${token}`)
            setdata(res.data)
        }
        getallpost()
        }, [data])
    
    useEffect(() => {
        let last = data.filter((e) => e.type == 'rent') 
        setrent(last)
    }, [data])
    
    useEffect(() => {
        let sale = data.filter((e) => e.type == 'sale') 
        setsale(sale)
    },[data])



    return <>
        <div className='mb-10'>
            <span className='text-2xl text-blue-900'>{'Recent places for rent'}</span><br/>
            <span className='text-md text-blue-800'>{'Show more places for rent'}</span>
        <div className='flex row gap-3 mt-2'>
            
            {   
             rent.map((e) => {
                    return <Cards final={e}  />
                    })
                }
                
            </div>
        </div>

        <div >
            <span className='text-2xl text-blue-900'>{'Recent places for sale'}</span><br/>
            <span className='text-md text-blue-800'>{'Show more places for sale'}</span>
        <div className='flex gap-3 mt-2 row'>
            
            {   
             sale.map((e) => {
                    return <Cards final={e}  />
                    })
                }
                
            </div>
        </div>
       
        
    </>
}

export default Maincards
