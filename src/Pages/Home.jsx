import React from 'react'
import HeroBanner from '../Components/Layout Components/HeroBanner'
import BestSeller from '../Components/Layout Components/BestSeller'
import CollectionList from '../Components/Layout Components/CollectionList'
import SalePromo from '../Components/Layout Components/SalePromo'
import MotivationalQuote from '../Components/Layout Components/MotivationalQuote'
import Testimonial from '../Components/Layout Components/Testimonial'
import Footer from '../Components/Layout Components/Footer'

const Home = () => {
  return (
    <>
      <HeroBanner/>
      <BestSeller/>
      <CollectionList/>
      <MotivationalQuote/>
      <SalePromo/>
      <Testimonial/>
      <Footer/>
    </>
  )
}

export default Home
