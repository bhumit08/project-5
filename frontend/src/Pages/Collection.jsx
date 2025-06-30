import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { abcContext } from '../context/ShopContextProvider'
import ProductItem from '../components/ProductItem'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'

const Collection = () => {
  const {products,search,showsearch}=useContext(abcContext);
  const[showfilter,setShowFilter]=useState(false);
  const[filterproducts,setFilterProducts]=useState([]);
  const[category,setCategory]=useState([]);
  const[subcategory,setSubCategory]=useState([]);
  const[sortType,setSortType]=useState('relavent')

  const toggleCategory=(e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=>item!=e.target.value))
    }
    else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }

  const toggleSubCategory=(e)=>{
    if(subcategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(item =>item!=e.target.value))
    }
    else{
      setSubCategory(prev =>[...prev,e.target.value])
    }
  }

  const applyFilter = () => {
    let filteredProducts = [...products];
  
    console.log("Selected Categories:", category);
    console.log("Selected Subcategories:", subcategory);

    if (showsearch && search) {
      filteredProducts = filteredProducts.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );      
    }
  
    if (category.length > 0) {
      filteredProducts = filteredProducts.filter(item => category.includes(item.category));
    }
  
    if (subcategory.length > 0) {
      filteredProducts = filteredProducts.filter(item => subcategory.includes(item.subcategory));
    }
  
    console.log("Filtered Products after applying filters:", filteredProducts);
  
    setFilterProducts(filteredProducts);
  };
  

  const sortProduct=()=>{
    let fpCopy=filterproducts.slice();
    switch(sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price-b.price)))
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price-a.price)))
        break;

      default:
        applyFilter();
        break;
    }

  }
  useEffect(() => {
    console.log("Applying filters after state change...");
    applyFilter();
  }, [category, subcategory,search,showsearch]);

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className="flex flex-col sm:flex-row sm:gap-10 pt-10 border-t">
      {/* filter option*/}
      <div className='min-w-60'>
        <p  onClick={()=>setShowFilter(!showfilter)}  className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showfilter?'rotate-90':''}`}/>
        </p>

        {/* Category Filter*/}
        <div className={`border border-b-gray-300 pl-5 py-3 mt-6 ${showfilter?'':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type='checkbox' value={'Men'} className='w-3' onChange={toggleCategory}/>Men
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' value={'Women'} className='w-3' onChange={toggleCategory}/>Women
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' value={'Kids'} className='w-3' onChange={toggleCategory}/>Kids
            </p>
          </div>
        </div>
        {/* SubCategory Filter*/}
        <div className={`border border-b-gray-300 pl-5 py-3 my-5 ${showfilter?'':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type='checkbox' value={'Topwear'} className='w-3' onChange={toggleSubCategory}/>Topwear
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' value={'Bottomwear'} className='w-3' onChange={toggleSubCategory}/>Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' value={'Winterwear'} className='w-3' onChange={toggleSubCategory}/>Winterwear
            </p>
          </div>
        </div>
      </div>

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTION'}/>
          {/* Product Sort*/}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by:Relavent</option>
            <option value="low-high">Sort by:Low to High</option>
            <option value="high-low">Sort by:High to Low</option>
          </select>
          </div>
          {/* Map Products*/}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
              filterproducts.map((item,index)=>(
                  <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
              ))
            }
          </div>
      </div>
    </div>
  )
}

export default Collection
