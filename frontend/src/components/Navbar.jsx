import React from 'react'
import {Link,NavLink} from 'react-router-dom'
import { assets } from "../assets/frontend_assets/assets";

const Navbar = () => {
  return (
    <div className="flex items-center justify-evenly py-5 font-medium bg-[#F1F1F0]">
        
        <Link to='/'><img src={assets.logo} alt="" className="w-36"/></Link>

         <ul className="hidden sm:flex gap-10 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
    </div>
  )
}

export default Navbar
