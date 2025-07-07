import React, { Suspense, lazy } from 'react'
import Carousel from '../componets/Carousel' // Hero Section – load early

const ProductCard = lazy(() => import('../context/ProductCard'))
const OurCoreValue = lazy(() => import('../componets/OurCoreValue'))
const Review = lazy(() => import('../componets/Review'))
const Footer = lazy(() => import('../componets/Footer'))

const Home = () => {
  return (
    <>
      <div className='w-full h-screen'>
        <Carousel />
        <Suspense>
          <ProductCard />
        </Suspense>
        <Suspense>
          <OurCoreValue />
        </Suspense>
        <Suspense>
          <Review />
        </Suspense>
        <Suspense>
          <Footer />
        </Suspense>
      </div>
    </>
  )
}

export default Home
