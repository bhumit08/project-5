import React, { useContext } from "react";
// import { abcContext } from '../context/shopContextProvider'
import {abcContext} from '../context/ShopContextProvider'

const Collection = () => {
   const {products} = useContext(abcContext);
   console.log(products);
  return (
    <div>
      <div className="flex flex-wrap">
        {products &&products.map((item, index) => (
            <div key={item._id || index} className="w-1/5 p-4">
              <img
                src={item.image}
                alt={item.brand}
                className="w-full h-35 mb-2"
              />
              <h4>{item.brand}</h4>
              <p>{item.category}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Collection;
