import React from 'react'
import MotionComp from '../components/MotionComp'
import NewCollection from '../components/NewCollection'
// import ClothingQuoteSection from '../components/ClothingQuoteSection'
// import TrendingNow from '../components/TrendingNow'
import ClothingQuoteSection from '../components/ClothingQuoteSection'
import LatestCollection from '../components/LatestCollection'
const Home = () => {
  return (
    <div>
      <MotionComp/>
      <NewCollection/>
      <LatestCollection/>
      {/* <HeroCircleTex/> */}
       <ClothingQuoteSection/>
             <MotionComp/>

    </div>
  )
}

export default Home
