import AsncHandler from "../utits/AsyncHandler.js";
import ApiError from "../utits/ApiError.js";
import { uploadOneCloudinary } from "../utits/cloudinary.js";
import Product from "../models/productSlide/Product.model.js";
import ApiResponse from "../utits/ApiResponse.js";

const uplodeProduct = AsncHandler(async(req,res) => {
   const slideLocalPath= await req.files?.slide[0]?.path
   if(!slideLocalPath){
      throw new ApiError(400, "slide image is required")
   }
   const slide= await uploadOneCloudinary(slideLocalPath)
   if(!slide){
    throw new ApiError(400, "slide image is required")
 }
   const product = await Product.create({
        slide: slide.url
    })
   const createdProduct = await Product.findById(product._id)
   if(!createdProduct){
    throw new ApiError(500, "some thing is wrong when created img")
   }

   return res.status(201).json(
    new ApiResponse(200, createdProduct, "Product created")
   )
})

export {uplodeProduct}