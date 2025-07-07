import React from 'react'
import Carousel from '../componets/Carousel'
import ProductCard from '../context/ProductCard'
import OurCoreValue from '../componets/OurCoreValue'
import Review from '../componets/Review'
import Footer from '../componets/Footer'
const Home = () => {
  return (
   <>
   <div className='w-full h-screen'>
   <Carousel/>
   <ProductCard/>
   <OurCoreValue/>
   <Review/>
   <Footer/>
   </div>
   </>
  )
}

export default Home