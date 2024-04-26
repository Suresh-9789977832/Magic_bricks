import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { IoLocation } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';


function Searchcards({ final, width, height }) {

    let navigate = useNavigate()
    
    const [sidebar, setsidebar] = useState({
        searchterm: "",
        type: 'all',
        parking: false,
        furnished: false,
        
    })

    function navigatetolist(id) {
        navigate(`listing/${id}`)
    }

    return <>
        <> <Card className=' shadow-lg box max-3ssm:smallbox' onClick={()=>{navigatetolist(final._id)}} >           
                      <Card.Img variant="top" src={'https://magic-bricks.onrender.com/'+final.imgurls[0]} className="img"/>
              
                <p className=" text-blue-600 font-semibold mt-2">{final.name}</p>
                <span className='flex items-center mb-2'>
                    <span className='text-green-600'><IoLocation/></span>&nbsp;
                   <span className=' text-sm truncate text-gray-700'>{final.address}</span> 
                </span>
                <p className=' text-sm text-gray-700 truncate'>{final.description}</p>
                <p variant="primary">${final.regularprice}</p>
                <p className='font-semibold'>
                    <span>{final.bedrooms}</span>&nbsp;<span>Beds</span>&nbsp;&nbsp;
                    <span>{final.bathrooms}</span>&nbsp;<span>Baths</span>
                </p>
        </Card>
        </>
    </>
}

export default Searchcards
