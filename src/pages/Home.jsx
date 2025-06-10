import React from 'react'
import Carousel from '../componets/Carousel'
import ProductCard from '../context/ProductCard'
import DetailsAboutShop from '../componets/DetailsAboutShop'

const Home = () => {
  return (
   <>
   <div className='w-full h-screen'>
   <Carousel/>
   <ProductCard/>
   <DetailsAboutShop/>
   </div>
   </>
  )
}

export default Home