

// //function for add product
// const addProduct=async(req,res)=>{
//     try{
//         const { name, description, price, category, subcategory, size, bestseller } = req.body;

//         const image1=req.files.image1[0]
//         const image2=req.files.image2[0]
//         const image3=req.files.image3[0]
//         const image4=req.files.image4[0]

//         console.log(name,description,price,category,subcategory,size,bestseller)

//         console.log(image1,image2,image3,image4)

//         res.json({})

//     }catch(error){
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }


// //function for list product
// const listProduct=async(req,res)=>{

// }

// //function for add product
// const removeProduct=async(req,res)=>{

// }

// //function for the single product info
// const singleProduct=async(req,res)=>{

// }

// export{listProduct,addProduct,removeProduct,singleProduct}

// backend/controllers/productController.js

import{v2 as cloudinary} from 'cloudinary'
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


    console.log({ name, description, price, category, subcategory, size, bestseller });
    console.log(imagesUrl);

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
const listProduct = async (req, res) => {};
const removeProduct = async (req, res) => {};
const singleProduct = async (req, res) => {};

export { listProduct, addProduct, removeProduct, singleProduct };
