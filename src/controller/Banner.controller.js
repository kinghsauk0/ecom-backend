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
    new ApiResponse(200,  "Banner created",createdProduct)
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

   const id = req.params.id
  if(!id) {
   throw new ApiError("404", "id is not define")
  }
  const delet = await Banner.deleteOne({_id:id})

  if(!delet) {
   throw new ApiError("404", "banar is not deleted")
  }
  return res.status(201).json(
   new ApiResponse(200,"banner is deleted",)
  )
});


const updateBanner = AsncHandler(async(req, res) =>{
   const bannerLocalPath= await req.files?.banner[0]?.path
   //console.log(bannerLocalPath)
   if(!bannerLocalPath){
      throw new ApiError(400, "slide image is required")
   }
   const slide= await uploadOneCloudinary(bannerLocalPath)
   if(!slide){
    throw new ApiError(400, "slide image is required")
 }
 const id =req.params.id
 const update = await Banner.findByIdAndUpdate({_id:id},
   {
      $set:{
          banner: slide.url
      }
  },
  {new: true}
   )
   return res.status(201).json(
      new ApiResponse(200,"banner is updated",update)
     )
})

export {uplodeBanner,getBanner,deletedBanner,updateBanner}