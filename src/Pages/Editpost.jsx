import React from 'react'
import axios from 'axios';
import {  useEffect, useState } from 'react'
import { env } from '../env'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function Editpost() {

    const token=sessionStorage.getItem('token')
    const [error, seterror] = useState(false)
    const [userpost,setuserpost]=useState([])
    const parama = useParams()
    let id=parama.id
    
    const [formdata, setformdata] = useState({
        imgurls: [],   
        name: "",
        description: "",
        address: "",
        type: "",
        bedrooms: 1,
        bathrooms: 1,
        regularprice: 0,
        parking: false,
        furnished: false
    })
    const navigate = useNavigate()
    

        let getpostbyid = async() => {
            try {
                let res = await axios.get(`${env.BASE_URL}/post/getbyid/${token}/${id}`)
                let datakeys=Object.keys(formdata)
                for (let key of datakeys) {
                    if (key in res.data) {
                        formdata[key]=res.data[key]
                    }
                }
                setformdata({...formdata})
            } catch (error) {
                if (error?.response?.status === 401) {
                    logout
                }
                if (error?.response?.status === 500) {
                    logout
                }
            }
        }

    useEffect(() => {
        getpostbyid()
    }, [id])
    
    console.log(formdata)
    
 








    const uploadfile = async(e) => {
        const uploadfile = e.target.files
        const data= new FormData()
        for (let i = 0; i < uploadfile.length; i++){
            data.append('images', uploadfile[i])
        }
        let res = await axios.post(`${env.BASE_URL}/user/upload`, data, { headers: { "Content-Type": "multipart/form-data" } })
        setformdata({
            ...formdata,
            [e.target.id]:res.data
        })
    }



    function deleteimg(i) {
        const del = formdata.imgurls.filter(e => e != i)
        setformdata({
            ...formdata,
            imgurls:del
        })  
    }

    function handlechange(e) {
        if (e.target.id === 'sale' || e.target.id === 'rent')
            setformdata({
                ...formdata,
                type: e.target.id
            })
        if (e.target.id === 'furnished' || e.target.id === 'parking') {
            setformdata({
                ...formdata,
                [e.target.id]: e.target.checked
            })
        }

        if (e.target.type === 'text' || e.target.type === 'number' || e.target.type==='textarea') {
            setformdata({
                ...formdata,
                [e.target.id]:e.target.value
            })
        }
       
    }

    const handleEdit = async() => {
        try {
            let output = await axios.put(`${env.BASE_URL}/post/edituserpost/${token}/${id}`, { formdata })
            if (output.status === 200) {
                toast.success(output.data.message)
                setformdata(formdata.address = "")
                setformdata(formdata.name="")
                setformdata(formdata.description="")
                setformdata(formdata.imgurls="")
                setformdata(formdata.parking="")
                setformdata(formdata.furnished="")
                setformdata(formdata.bedrooms="")
                setformdata(formdata.bathrooms = "")
                setformdata(formdata.regularprice="")
                setformdata(formdata.type="")
            }
            navigate('/')
        } catch (error) {
            if (error?.response?.status === 498) {
                toast.error(error.response.data.message)
            }
            if (error?.response?.status === 500) {
                toast.error(error.response.data.message)
            }
            
        }
    }
   

    useEffect(() => {
        {formdata.imgurls.length >= 6 && seterror('Total number of images must be less than 7 and at least 1 image must be selected')}
 
    },[formdata.imgurls])

    return <>
        <div className='max-w-4xl m-auto'>

<div className='flex justify-center mt-5 '>
    <h2 className='font-bold'>Edit Post</h2>
</div>

<div className="create_flex">
    <div className='w-2/4 flex flex-col gap-3'>
        <input className='w-96 h-12 pl-3 rounded-md border-1 max-3sssm:w-72 max-3ssm:w-80' id='name' type='text' placeholder='Name' onChange={handlechange} value={formdata.name}/>
        <textarea  className='rounded-md w-96 h-20 pl-3 pt-2 border-1 max-3sssm:w-72 max-3ssm:w-80' id='description'  placeholder='Description' onChange={handlechange} value={formdata.description}>
        </textarea>
        <input className='w-96 h-12 px-3 rounded-md mb-3 border-1 max-3sssm:w-72 max-3ssm:w-80' id='address' type='text' placeholder='Address' onChange={handlechange} value={formdata.address}/>

        <div className='create_row'>

        <span className=' flex gap-1 items-center'>
                <input type='checkbox' className='create_checkbox' id='sale' checked={formdata.type==='sale'} onChange={handlechange}/>
        <span>Sell</span>
            </span>
            
            <span className=' flex gap-1 items-center'>
                <input type='checkbox' className='create_checkbox' id='rent' checked={formdata.type === 'rent'} onChange={handlechange} />
        <span>Rent</span>
            </span>
            
            <span className=' flex gap-1 items-center'>
        <input type='checkbox' className='create_checkbox' id='parking' onChange={handlechange} checked={formdata.parking}/>
        <span>Parking spot</span>
            </span>
            
            <span className=' flex gap-1 items-center'>
        <input type='checkbox' className='create_checkbox' id='furnished' onChange={handlechange} checked={formdata.furnished}/>
        <span>Furnished</span>
        </span>

        </div>

        <div>
            
        </div>
        <div className='flex gap-4 max-3sm:flex-col'>
            <div className='flex items-center gap-2'>
                <input className='w-24 h-12 px-2 rounded-lg border-1' type='number' id='bedrooms'  onChange={handlechange} value={formdata.bedrooms}/>
                <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
            <input className='w-24 h-12 px-2 rounded-lg border-1' type='number'id='bathrooms'  onChange={handlechange} value={formdata.bathrooms}/>
                <p>Baths</p>
            </div>

        </div>

        <div className='flex items-center gap-3'>
            <input className='w-36 h-12 border rounded-lg px-3'type='number'id='regularprice' onChange={handlechange} value={formdata.regularprice}/>
            <p>Regular price</p>
        </div>

 </div>
    <div className='w-2/4 flex flex-col gap-3'>
        <div>
            <span className=' font-semibold pr-2'>Images:</span>
            <span className=' text-gray-500'>The first image will be the cover (max 6)</span>
        </div>
        <div className='flex  gap-2 items-center'>
            {
                error?                        <span><input type='file' multiple className=' h-12 border-[1px] border-gray-300 w-80  p-2 rounded-md max-3ssm:w-80 max-3sssm:w-72' disabled onChange={uploadfile} id='imgurls'/></span>
                    :
                    <span><input type='file' multiple className=' h-12 border-[1px] border-gray-300 w-80  p-2 rounded-md max-3ssm:w-80 max-3sssm:w-72' onChange={uploadfile} id='imgurls'/></span>

            }
        </div>
        {error && <p className='text-red-600'>{error}</p>}
        { formdata?.imgurls?.length > 0 && formdata?.imgurls?.map((e, i) => {
             return   <div className='flex justify-between  border-[1px] border-gray-300 w-80 p-2 max-3ssm:w-80 max-3sssm:w-72' key={i}>
            <img src={'https://magic-bricks.onrender.com/'+e} className='w-18 h-14  object-cover'/>
            <button className=" text-red-700" onClick={()=>deleteimg(e)}>DELETE</button>
        </div>
        })}
      
        <div className='flex justify-center w-80 bg-gray-700 p-2 text-white rounded-md cursor-pointer hover:bg-opacity-90 max-3ssm:w-80 max-3sssm:w-72'>
        <button onClick={handleEdit}>EDIT LISTING</button>
    </div>
    </div>

    


</div>


</div>
    </>
}

export default Editpost
