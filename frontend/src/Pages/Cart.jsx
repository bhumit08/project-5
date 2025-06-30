import React, { useContext, useEffect, useState } from 'react'
import { abcContext } from '../context/ShopContextProvider'
import Title from '../components/Title';

const Cart = () => {
  const { products, currency, cartitems } = useContext(ShopContext);
  const [cartdata, setCartData] = useState([]);

  useEffect(() => {
    const tempdata = [];
    for (const itemId in cartitems) {
      for (const size in cartitems[itemId]) {
        if (cartitems[itemId][size] > 0) {
          tempdata.push({
            _id: itemId,
            size: size,
            quantity: cartitems[itemId][size]
          });
        }
      }
    }
    setCartData(tempdata);
  }, [cartitems]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'}/>
      </div>

      <div>
        {cartdata.map((item, index) => {
          const productdata = products.find(product => product._id === item._id);

          if (!productdata) return null; // ✅ Prevents error if product not found

          return (
            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_2fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img src={productdata.image[0]} alt='' className='w-16 sm:w-20'/> {/* ✅ Fixed 'iamge' typo */}
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{productdata.name}</p>
                  <p className='text-sm text-gray-500'>Size: {item.size}</p>
                  <p className='text-sm text-gray-500'>Quantity: {item.quantity}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cart;
