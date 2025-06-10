import React from 'react'
import Carousel from '../componets/Carousel'
import ProductCard from '../context/ProductCard'
import DetailsAboutShop from '../componets/DetailsAboutShop'
import OurCoreValue from '../componets/OurCoreValue'

const Home = () => {
  return (
   <>
   <div className='w-full h-screen'>
   <Carousel/>
   <ProductCard/>
   <OurCoreValue/>
   <DetailsAboutShop/>
   </div>
   </>
  )
}

export default Home