import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function DarkVariantExample({ img }) {
  
  return <>
    {img && img.length > 0?   <Carousel data-bs-theme="dark">
      {
        img.map((e) => {
          return   <Carousel.Item>
          <img
            className="d-block w-100 h-300  3md:h-600 object-cover"
            src={'http://localhost:3000/'+e}
          />
        </Carousel.Item>
        })
      }
    
    </Carousel>:""}
    
 
  </>
}

export default DarkVariantExample;