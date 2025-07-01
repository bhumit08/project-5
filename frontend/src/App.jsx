import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Collection from './Pages/Collection'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Product from './Pages/Product'
import PlaceOrder from './Pages/PlaceOrder'
import Orders from './Pages/Orders' // ✅ match folder case
import Login from './Pages/Login'



const App = () => {
  return (
    <div>
      <Navbar/>
      <hr className='border 2xl'/>
      <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/about' element={<About/>}/>
         <Route path='/Collection' element={<Collection/>}/>
         <Route path='/contact' element={<Contact/>}/>
         <Route path='/cart' element={<Cart/>}/>
         <Route path='/product/:productId' element={<Product/>}/>
         <Route path='/cart' element={<Cart/>}/>
         <Route path='/place-order' element={<PlaceOrder/>}/>
         <Route path='/orders' element={<Orders/>}/>
         <Route path='/login' element={<Login/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
