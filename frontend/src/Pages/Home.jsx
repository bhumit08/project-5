import React from 'react'
import MotionComp from '../components/MotionComp'
import NewCollection from '../components/NewCollection'
// import ClothingQuoteSection from '../components/ClothingQuoteSection'
// import TrendingNow from '../components/TrendingNow'
import ClothingQuoteSection from '../components/ClothingQuoteSection'
import LatestCollection from '../components/LatestCollection'
// import HeroVideo from "../components/HeroVideo";
import BrandMarquee from "../components/BrandMarquee";
import BestSeller from '../components/BestSeller'
const Home = () => {
  return (
    <div>
      <MotionComp/>
      {/* <NewCollection/> */}
      <LatestCollection/>
      {/* <HeroCircleTex/> */}
       <ClothingQuoteSection/>
          {/* <HeroVideo /> */}
             {/* <MotionComp/> */}
             <BrandMarquee/>
             <BestSeller/>

    </div>
  )
}

export default Home
