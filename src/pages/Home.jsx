import React from 'react'
import Carousel from '../componets/Carousel'
import ProductCard from '../context/ProductCard'
import OurCoreValue from '../componets/OurCoreValue'
import Reviews from '../componets/Review'

const Home = () => {
  return (
   <>
   <div className='w-full h-screen'>
   <Carousel/>
   <ProductCard/>
   <OurCoreValue/>
   <Reviews/>
   </div>
   </>
  )
}

export default Home