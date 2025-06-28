import React from 'react'
import { createContext } from 'react';
import { products } from "../assets/frontend_assets/assets";
export const abcContext=createContext();

const ShopContextProvider = (props) => {

const value={
  products
}

  return (
    <div>
      <abcContext.Provider value={value}>
          {props.children}
      </abcContext.Provider>
    </div>
  )
}

export default ShopContextProvider
