// import React, { useContext, useState } from 'react';
// import Title from '../components/Title';
// import CartTotal from '../components/CartTotal';
// import { assets } from '../assets/frontend_assets/assets';
// import { abcContext } from '../context/ShopContextProvider';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const PlaceOrder = () => {
//   const {
//     navigate,
//     backendURL,
//     token,
//     cartitems,
//     setCartItems,
//     getCartAmount,
//     delivery_fee,
//     products,
//   } = useContext(abcContext);

//   const [method, setMethod] = useState('cod');

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     zipcode: '',
//     country: '',
//     phone: '',
//   });

//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     console.log('📦 Submitting order...');

//     try {
//       let orderItems = [];

//       for (const itemId in cartitems) {
//         for (const size in cartitems[itemId]) {
//           if (cartitems[itemId][size] > 0) {
//             const product = products.find((p) => p._id === itemId);
//             if (product) {
//               orderItems.push({
//                 ...product,
//                 size,
//                 quantity: cartitems[itemId][size],
//               });
//             }
//           }
//         }
//       }

//       const orderData = {
//         address: formData,
//         items: orderItems,
//         amount: getCartAmount() + delivery_fee,
//         paymentMethod: method,
//       };

//       console.log('📨 Sending order data:', orderData);

//       switch (method) {
//         case 'cod':
//           const response = await axios.post(`${backendURL}/api/order/place`, orderData, {
//             headers: { token },
//           });

//           if (response.data.success) {
//             toast.success('Order placed successfully!');
//             setCartItems({});
//             navigate('/orders');
//           } else {
//             toast.error(response.data.message || 'Order failed.');
//           }
//           break;

//         case 'stripe':
//             const responseStripe=await axios.post(backendURL + '/api/order/stripe',orderData,{headers:{token}})

//             if(response.data.success){
//               const{session_url} = responseStripe.data
//               window.location.replace(session_url)
//             }else{
//               toast.error(responseStripe.data.message)
//             }
//         break

//         default:
//           toast.warn('Only COD is supported for now.');
//           break;
//       }
//     } catch (error) {
//       console.error('❌ Error placing order:', error);
//       if (error.response) {
//         console.error('📨 Response Error:', error.response.data);
//         toast.error(error.response.data.message || 'Server error.');
//       } else if (error.request) {
//         console.error('📡 No response received:', error.request);
//         toast.error('No response from server.');
//       } else {
//         toast.error('Order error: ' + error.message);
//       }
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t mx-25"
//     >
//       {/* -------- LEFT SIDE: Delivery Info -------- */}
//       <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
//         <div className="text-xl sm:text-2xl my-3">
//           <Title text1="DELIVERY" text2="INFORMATION" />
//         </div>
//         <div className="flex gap-3">
//           <input name="firstName" value={formData.firstName} onChange={onChangeHandler} type="text" placeholder="First name" required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
//           <input name="lastName" value={formData.lastName} onChange={onChangeHandler} type="text" placeholder="Last name" required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
//         </div>
//         <input name="email" value={formData.email} onChange={onChangeHandler} type="email" placeholder="Email address" required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
//         <input name="street" value={formData.street} onChange={onChangeHandler} type="text" placeholder="Street" required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
//         <div className="flex gap-3">
//           <input name="city" value={formData.city} onChange={onChangeHandler} type="text" placeholder="City" required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
//           <input name="state" value={formData.state} onChange={onChangeHandler} type="text" placeholder="State" required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
//         </div>
//         <div className="flex gap-3">
//           <input name="zipcode" value={formData.zipcode} onChange={onChangeHandler} type="number" placeholder="Zipcode" required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
//           <input name="country" value={formData.country} onChange={onChangeHandler} type="text" placeholder="Country" required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
//         </div>
//         <input name="phone" value={formData.phone} onChange={onChangeHandler} type="tel" placeholder="Phone No." required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
//       </div>

//       {/* -------- RIGHT SIDE: Cart + Payment -------- */}
//       <div className="mt-8">
//         <div className="mt-8 min-w-80">
//           <CartTotal />
//         </div>
//         <div className="mt-12">
//           <Title text1="PAYMENT" text2="METHOD" />
//           <div className="flex gap-3 flex-col lg:flex-row">
//             {/* Stripe */}
//             <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
//               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
//               <img src={assets.stripe_logo} className="h-5 mx-4" alt="Stripe" />
//             </div>
//             {/* Razorpay */}
//             <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
//               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
//               <img src={assets.razorpay_logo} className="h-5 mx-4" alt="Razorpay" />
//             </div>
//             {/* COD */}
//             <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
//               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
//               <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
//             </div>
//           </div>
//           <div className="w-full text-end mt-8">
//             <button type="submit" className="bg-black text-white px-15 text-sm py-2">PLACE ORDER</button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;


import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/frontend_assets/assets';
import { abcContext } from '../context/ShopContextProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrder = () => {
  const {
    navigate,
    backendURL,
    token,
    cartitems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(abcContext);

  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      for (const itemId in cartitems) {
        for (const size in cartitems[itemId]) {
          if (cartitems[itemId][size] > 0) {
            const product = products.find((p) => p._id === itemId);
            if (product) {
              orderItems.push({
                ...product,
                size,
                quantity: cartitems[itemId][size],
              });
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
        userId: localStorage.getItem("userId"),
      };

      if (method === 'cod') {
        const response = await axios.post(`${backendURL}/api/order/place`, orderData, {
          headers: { token },
        });

        if (response.data.success) {
          toast.success('Order placed successfully!');
          setCartItems({});
          navigate('/orders');
        } else {
          toast.error(response.data.message || 'Order failed.');
        }
      }

      if (method === 'stripe') {
        const responseStripe = await axios.post(`${backendURL}/api/order/stripe`, orderData, {
          headers: { token },
        });

        if (responseStripe.data.success) {
          const { session_url } = responseStripe.data;
          window.location.replace(session_url);
        } else {
          toast.error(responseStripe.data.message || 'Stripe order failed.');
        }
      }

      if (method === 'razorpay') {
        toast.warn('Razorpay integration is not implemented yet.');
      }
    } catch (error) {
      console.error('Order placement error:', error);
      toast.error(error.response?.data?.message || 'Server error');
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t mx-25"
    >
      {/* -------- LEFT SIDE: Delivery Info -------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-3">
          <input name="firstName" value={formData.firstName} onChange={onChangeHandler} type="text" placeholder="First name" required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input name="lastName" value={formData.lastName} onChange={onChangeHandler} type="text" placeholder="Last name" required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <input name="email" value={formData.email} onChange={onChangeHandler} type="email" placeholder="Email address" required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        <input name="street" value={formData.street} onChange={onChangeHandler} type="text" placeholder="Street" required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        <div className="flex gap-3">
          <input name="city" value={formData.city} onChange={onChangeHandler} type="text" placeholder="City" required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input name="state" value={formData.state} onChange={onChangeHandler} type="text" placeholder="State" required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <div className="flex gap-3">
          <input name="zipcode" value={formData.zipcode} onChange={onChangeHandler} type="number" placeholder="Zipcode" required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input name="country" value={formData.country} onChange={onChangeHandler} type="text" placeholder="Country" required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <input name="phone" value={formData.phone} onChange={onChangeHandler} type="tel" placeholder="Phone No." required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
      </div>

      {/* -------- RIGHT SIDE: Cart + Payment -------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex gap-3 flex-col lg:flex-row">
            {/* Stripe */}
            <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} className="h-5 mx-4" alt="Stripe" />
            </div>
            {/* Razorpay */}
            <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} className="h-5 mx-4" alt="Razorpay" />
            </div>
            {/* COD */}
            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white px-15 text-sm py-2">PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
