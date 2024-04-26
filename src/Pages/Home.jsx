import { Carousel } from 'bootstrap'
import React from 'react'
import DarkVariantExample from '../Components/Carosel'
import Maincards from '../Components/Maincards'
import { Link } from 'react-router-dom';

function Home() {
  return <>

    <div>
    <div className='flex max-w-6xl mx-auto my-28 max-3md:justify-center max-3lg:pl-5'>
      <div>
        <div className="font-bold text-slate-700"> 
          <h1 className='font-bold  3md:text-6xl'>Find your next <span className='text-slate-500'>perfect</span></h1>
          <h1 className='font-bold 3md:text-6xl'>place with ease</h1>
          </div>
        <div className="mt-8 text-gray-400">
       <h6>Magic Estate will help you find your home fast, easy and comfortable.</h6> 
        <h6>Our expert support are always available.</h6>
          </div>
        <div className="mt-8 text-blue-800 font-semibold">
          <Link to={'/search'} className='hover:underline' >Let's start now...</Link>
          </div>
      </div>
      </div>

      <div>
        <DarkVariantExample/>
      </div>

      <div className='flex row max-w-6xl mx-auto my-28 max-3md:justify-center max-3lg:max-w-3xl max-3md:px-5 max-3sm:px-10 max-3ssm:px-3'>
        <Maincards title={'Recent places for rent'} des={'Show more places for rent'}/>
      </div>
    </div>
    

    
  </>
}

export default Home
