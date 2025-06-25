// import React, { useEffect, useState } from "react";
// import {products} from './assets/frontend_assets/assets'

// const App = () => {

//   const showMen=(product)=>{
//       product.filter((val)=>val.category==='Men')
//       .map((ans)=>(
//         <img src="ans.image"/>
//       ))
//   }


//   return (
//     <>
//     Men <input type="checkbox" onClick={()=>showMen(products)}/><br/>
//     Women <input type="checkbox"/><br/>
//     Kids <input type="checkbox"/>



//     <div className="flex flex-wrap">
//     {
//       products.map((val,key)=>(
//         <ul key={val._id}>
//           <img src={val.image} alt={'product'} className="m-10 size-30"/>
//           <h4 className="ml-20">{val.brand}</h4>
//         </ul>          
//       ))
//     }
//     </div>

//         </>

//    );
// };

// export default App;

import React, { useState } from "react";
import { products } from './assets/frontend_assets/assets';

const App = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };
  products.filter((product)=>product.category=="men");
  arr[1,2,3].includes(2);
  
  const filteredProducts = selectedCategories.length === 0
    ? products
    : products.filter(product => selectedCategories.includes(product.category));

  return (
    <>
      Men <input type="checkbox" onChange={() => handleCategoryChange('Men')} /><br />
      Women <input type="checkbox" onChange={() => handleCategoryChange('Women')} /><br />
      Kids <input type="checkbox" onChange={() => handleCategoryChange('Kids')} /><br />

      <div className="flex flex-wrap">
        {filteredProducts.map((val) => (
          <ul key={val._id}>
            <img src={val.image} alt={'product'} className="m-10 size-30" />
            <h4 className="ml-20">{val.brand}</h4>
          </ul>
        ))}
      </div>
    </>
  );
};

export default App;