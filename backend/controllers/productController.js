import{v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js';
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subcategory, size, bestseller } = req.body;

    // Images from multer
    // const image2 = req.files?.image2?.[0]?.filename || null;
    // const image3 = req.files?.image3?.[0]?.filename || null;
    // const image4 = req.files?.image4?.[0]?.filename || null;

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images=[image1,image2,image3,image4].filter((item)=>item !==undefined || null)

    const imagesUrl=await Promise.all(
      images.map(async(item)=>{
        let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'})
        return result.secure_url
      })
    )

      const ProductData={
        name,
        description,
        category,
        price:Number(price),
        subcategory,
        bestseller:Boolean==="true"?true:false,
        size:JSON.parse(size),
        image:imagesUrl,
        date:Date.now()
      }
      console.log(ProductData);

      const product=new productModel(ProductData);
      await product.save()
      res.json({success:true,message:"product added"})  


    // Return success response with filenames
    res.json({
      success: true,
      message: "Product added successfully",
      images: { image1, image2, image3, image4 }
    });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Other handlers can remain empty for now
const listProduct = async (req, res) => {
      try{
        const products=await productModel.find({});
        res.json({success:true,products})
        // console.log(products)
      }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
      }
};
const removeProduct = async (req, res) => {
  try{
    await productModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"product removed"})
  }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  }
};
const singleProduct = async (req, res) => {
    try{
      const{productId}=req.body
      const product=await productModel.findById(productId)
      res.json({success:true,product})
    }catch(error){
       console.log(error)
    res.json({success:false,message:error.message})
    }
};

export { listProduct, addProduct, removeProduct, singleProduct };


// import { v2 as cloudinary } from 'cloudinary';
// import productModel from '../models/productModel.js';

// // ADD PRODUCT
// const addProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, subcategory, size, bestseller } = req.body;

//     // Get images from multer
//     const image1 = req.files?.image1?.[0];
//     const image2 = req.files?.image2?.[0];
//     const image3 = req.files?.image3?.[0];
//     const image4 = req.files?.image4?.[0];

//     const images = [image1, image2, image3, image4].filter((img) => img !== undefined && img !== null);

//     // Upload images to Cloudinary
//     const imagesUrl = await Promise.all(
//       images.map(async (item) => {
//         const result = await cloudinary.uploader.upload(item.path, {
//           resource_type: 'image'
//         });
//         return result.secure_url;
//       })
//     );

//     // Parse size array safely
//     let parsedSize = [];
//     try {
//       parsedSize = JSON.parse(size);
//     } catch (err) {
//       return res.json({ success: false, message: "Size must be a valid JSON array like ['M','L']" });
//     }

//     const ProductData = {
//       name,
//       description,
//       category,
//       price: Number(price),
//       subcategory,
//       bestseller: bestseller === "true",
//       size: parsedSize,
//       image: imagesUrl,
//       date: Date.now()
//     };

//     const product = new productModel(ProductData);
//     await product.save();

//     res.json({
//       success: true,
//       message: "Product added successfully",
//       product
//     });
//   } catch (error) {
//     console.error("Add Product Error:", error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // LIST ALL PRODUCTS
// const listProduct = async (req, res) => {
//   try {
//     const products = await productModel.find({});
//     res.json({ success: true, products });
//   } catch (error) {
//     console.error("List Product Error:", error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // REMOVE PRODUCT
// const removeProduct = async (req, res) => {
//   try {
//     const { id } = req.body;
//     await productModel.findByIdAndDelete(id);
//     res.json({ success: true, message: "Product removed successfully" });
//   } catch (error) {
//     console.error("Remove Product Error:", error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // GET SINGLE PRODUCT
// const singleProduct = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const product = await productModel.findById(productId);
//     if (!product) {
//       return res.json({ success: false, message: "Product not found" });
//     }
//     res.json({ success: true, product });
//   } catch (error) {
//     console.error("Single Product Error:", error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export { listProduct, addProduct, removeProduct, singleProduct };
