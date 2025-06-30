import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { abcContext } from '../context/ShopContextProvider';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products,currency,addToCart} = useContext(abcContext);
  const [productdata, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const[size,setSize]=useState('')

  useEffect(() => {
    const foundProduct = products.find(item => item._id === productId);
    
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]); // Set first image initially
    }
  }, [productId, products]);

  return productdata ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[17.7%] w-full'>
            {
              productdata.image.map((item, index) => (
                <img 
                  onClick={() => setImage(item)} 
                  src={item} 
                  key={index} 
                  className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                  alt={`Thumbnail ${index}`}
                />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt='Selected product' className='w-full h-auto' />
          </div>
        </div>

        {/* Product Info*/}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productdata.name}</h1>
          <div className='flex itme-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productdata.price}</p>
          <p className='mt-5 text-gray-500 md:w-3/4'>{productdata.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
             {productdata.sizes.map((item,index)=>(
              <button onClick={()=>setSize(item)} key={index} className={`bordxer py-2 px-4 bg-gray-100 ${item===size?'border-orange-500':''}`}>{item}</button>
             ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productdata._id,size)}  className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 flex flex-col gap-1'>
             <p>100% Original Product.</p>
             <p>Cash on delivery is available on this product.</p>
             <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/*Description & Review section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-gray-500'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus sapiente voluptatibus esse amet rem nam, obcaecati reiciendis facere, ex quam facilis ad tempora mollitia nihil eius blanditiis hic repellendus nesciunt.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat voluptas dolorum, temporibus animi facilis veritatis harum tempore optio voluptates dolores iste, quod ullam, at eos dolorem corrupti nobis placeat? Vitae.</p>
        </div>

      </div>

      {/* related products*/}
         <RelatedProducts category={productdata.category} subCategory={productdata.subCategory}/>
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
}

export default Product;
