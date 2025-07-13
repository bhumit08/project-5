import React,{useEffect, useState} from 'react'
import { createContext } from 'react';
import { products } from "../assets/frontend_assets/assets";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const abcContext=createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
  const backendURL= import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] = useState('');
  const [showsearch, setShowSearch] = useState(false);
  const [cartitems, setCartItems] = useState({});
  // const [products, setProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate=useNavigate();

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

  const updateQuentity=async(itemId,size,quantity)=>{
    let cartData=structuredClone(cartitems);
    cartData[itemId][size]=quantity;
    setCartItems(cartData)

  }

  const getCartAmount=()=>{
      let totalAmount=0;
      for(const items in cartitems){
        let iteminfo=products.find((product)=>product._id===items);
        for(const item in cartitems[items]){
          try{
            if(cartitems[items][item]>0){
              totalAmount+=iteminfo.price *cartitems[items][item]
            }
          }catch(error){

          }
        }
      }
      return totalAmount;
  }

  // useEffect(() => {
  //   console.log("Updated Cart:", cartitems);
  // }, [cartitems]);

  const getProductData=async()=>{
      try{
          const response=await axios.get(backendURL + '/api/product/list')
          if(response.data.success){
             setProducts(response.data.products);
          }else{
            toast.error(respose.data.message)
          }
      }catch(error){
            console.log(error)
            toast.error(error.message)
      }
  }

  useEffect(()=>{
    getProductData()
  },[])

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
    getCartCount,
    updateQuentity,
    getCartAmount,
    navigate,
    backendURL
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
