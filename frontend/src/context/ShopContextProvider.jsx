import React,{useState} from 'react'
import { createContext } from 'react';
import { products } from "../assets/frontend_assets/assets";
export const abcContext=createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
  const [search, setSearch] = useState('');
  const [showsearch, setShowSearch] = useState(false);
  const [cartitems, setCartItems] = useState({});

  const addToCart = async (itemId, size) => {
    if (!size) {
      alert(" Please select a size before adding to cart.");
      return;
    }

    setCartItems(prevCartItems => {
      let cartData = structuredClone(prevCartItems);

      if (cartData[itemId]) {
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1;
        } else {
          cartData[itemId][size] = 1;
        }
      } else {
        cartData[itemId] = { [size]: 1 };
      }

      return cartData;
    });

    // alert("Product added to cart successfully!");
  };
  // totalCount += cartitems[itemId][size]; // ✅ Corrected this line

  const getCartCount=()=>{
    let totalCount=0;
    for(const items in cartitems){
      for(const item in cartitems[items])
        try{
            if(cartitems[items][item]>0){
              totalCount+=cartitems[items][item];
            }
        }catch(error){

        }
    }
    return totalCount;
  }

  // useEffect(() => {
  //   console.log("Updated Cart:", cartitems);
  // }, [cartitems]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showsearch,
    setShowSearch,
    cartitems,
    addToCart, 
    getCartCount
  };

  return (
    <div>
      <abcContext.Provider value={value}>
          {props.children}
      </abcContext.Provider>
    </div>
  )
}

export default ShopContextProvider
