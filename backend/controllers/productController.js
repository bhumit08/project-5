// import{v2 as cloudinary} from 'cloudinary'
// import productModel from '../models/productModel.js';
// const addProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, subcategory, size, bestseller } = req.body;

//     // Images from multer
//     // const image2 = req.files?.image2?.[0]?.filename || null;
//     // const image3 = req.files?.image3?.[0]?.filename || null;
//     // const image4 = req.files?.image4?.[0]?.filename || null;

//     const image1 = req.files.image1 && req.files.image1[0]
//     const image2 = req.files.image2 && req.files.image2[0]
//     const image3 = req.files.image3 && req.files.image3[0]
//     const image4 = req.files.image4 && req.files.image4[0]

//     const images=[image1,image2,image3,image4].filter((item)=>item !==undefined || null)

//     const imagesUrl=await Promise.all(
//       images.map(async(item)=>{
//         let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'})
//         return result.secure_url
//       })
//     )

//       const ProductData={
//         name,
//         description,
//         category,
//         price:Number(price),
//         subcategory,
//         bestseller:Boolean==="true",
//         size:JSON.parse(size),
//         image:imagesUrl,
//         date:Date.now()
//       }
//       console.log(ProductData);

//       const product=new productModel(ProductData);
//       await product.save()
//       res.json({success:true,message:"product added"})  


//     // Return success response with filenames
//     res.json({
//       success: true,
//       message: "Product added successfully",
//       images: { image1, image2, image3, image4 }
//     });

//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Other handlers can remain empty for now
// const listProduct = async (req, res) => {
//       try{
//         const products=await productModel.find({});
//         res.json({success:true,products})
//         // console.log(products)
//       }catch(error){
//         console.log(error)
//         res.json({success:false,message:error.message})
//       }
// };
// const removeProduct = async (req, res) => {
//   try{
//     await productModel.findByIdAndDelete(req.body.id)
//     res.json({success:true,message:"product removed"})
//   }catch(error){
//     console.log(error)
//     res.json({success:false,message:error.message})
//   }
// };
// const singleProduct = async (req, res) => {
//     try{
//       const{productId}=req.body
//       const product=await productModel.findById(productId)
//       res.json({success:true,product})
//     }catch(error){
//        console.log(error)
//     res.json({success:false,message:error.message})
//     }
// };

// export { listProduct, addProduct, removeProduct, singleProduct };


// import { v2 as cloudinary } from 'cloudinary';
// import productModel from '../models/productModel.js';

// const addProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, subcategory, size, bestseller } = req.body;

//     // Handle image files from multer
//     const image1 = req.files.image1 && req.files.image1[0];
//     const image2 = req.files.image2 && req.files.image2[0];
//     const image3 = req.files.image3 && req.files.image3[0];
//     const image4 = req.files.image4 && req.files.image4[0];

//     // Filter only defined images
//     const images = [image1, image2, image3, image4].filter((img) => img !== undefined && img !== null);

//     // Upload all images to Cloudinary
//     const imagesUrl = await Promise.all(
//       images.map(async (item) => {
//         const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
//         return result.secure_url;
//       })
//     );

//     // Convert bestseller string to boolean (robust way)
//     const bestsellerBoolean = ["true", "on", true, "1", 1].includes(bestseller);

//     // Create product data
//     const ProductData = {
//       name,
//       description,
//       category,
//       price: Number(price),
//       subcategory,
//       bestseller: bestsellerBoolean,
//       size: JSON.parse(size),
//       image: imagesUrl,
//       date: Date.now(),
//     };

//     console.log("Product being saved:", ProductData);

//     // Save to MongoDB
//     const product = new productModel(ProductData);
//     await product.save();

//     res.json({ success: true, message: "Product added successfully" });
//   } catch (error) {
//     console.error("Error adding product:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subcategory, size, bestseller } = req.body;

    // Handle image files from multer
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((img) => img !== undefined && img !== null);

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    // ✅ Fix bestseller parsing
    let bestsellerBoolean = false;
    if (typeof bestseller === 'string') {
      bestsellerBoolean = bestseller.toLowerCase() === 'true';
    } else if (typeof bestseller === 'boolean') {
      bestsellerBoolean = bestseller;
    }

    console.log("Received Bestseller:", bestseller);
    console.log("Parsed Bestseller:", bestsellerBoolean);

    const ProductData = {
      name,
      description,
      category,
      price: Number(price),
      subcategory,
      bestseller: bestsellerBoolean, // ✅ Final boolean value
      size: JSON.parse(size),
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(ProductData);
    await product.save();

    res.json({ success: true, message: 'Product added successfully' });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Other functions can remain the same
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Product removed' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { listProduct, addProduct, removeProduct, singleProduct };
