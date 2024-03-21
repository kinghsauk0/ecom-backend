import AsncHandler from "../utits/AsyncHandler.js";
import ApiError from "../utits/ApiError.js";
import { uploadOneCloudinary } from "../utits/cloudinary.js";
import ApiResponse from "../utits/ApiResponse.js";
import Banner from "../models/banner/Banner.model.js";

const uplodeBanner = AsncHandler(async(req,res) => {
   const bannerLocalPath= await req.files?.banner[0]?.path
   //console.log(bannerLocalPath)
   if(!bannerLocalPath){
      throw new ApiError(400, "slide image is required")
   }
   const slide= await uploadOneCloudinary(bannerLocalPath)
   if(!slide){
    throw new ApiError(400, "slide image is required")
 }
   const product = await Banner.create({
      banner: slide.url
    })
   const createdProduct = await Banner.findById(product._id)
   if(!createdProduct){
    throw new ApiError(500, "some thing is wrong when created img")
   }

   return res.status(201).json(
    new ApiResponse(200, createdProduct, "Banner created")
   )
})


const getBanner = AsncHandler(async(req,res) =>{
   const storeBanner = await Banner.find({}).limit(10)
   if(!storeBanner){
       throw new ApiError(500,"banner is not found")
   }

   return res.status(200).json(
       new ApiResponse(200, "found all banner ",storeBanner,storeBanner.length)
   )
})


const deletedBanner = AsncHandler(async (req, res) => {
   const para = await req.params.id
   if(!para){
      throw new ApiError(401, "id is not found")
   }
   const dBanner = await Banner.findByIdAndDelete(para);
   console.log(dBanner)
   if (!dBanner) {
      throw new ApiError(500, "Banner not deleted");
   }
   return res.status(200).json(new ApiResponse(200, "Banner deleted",para));
});

export {uplodeBanner,getBanner,deletedBanner}