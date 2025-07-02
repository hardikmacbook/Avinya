import React from 'react'
import Carousel from '../componets/Carousel'
import ProductCard from '../context/ProductCard'
import OurCoreValue from '../componets/OurCoreValue'

const Home = () => {
  return (
   <>
   <div className='w-full h-screen'>
   <Carousel/>
   <ProductCard/>
   <OurCoreValue/>
   </div>
   </>
  )
}

export default Home