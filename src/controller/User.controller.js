import ApiResponse from "../utits/ApiResponse.js";
import AsncHandler from "../utits/AsyncHandler.js";
import ApiError from "../utits/ApiError.js";
import User from "../models/user/User.models.js";




const RegisterUser = AsncHandler(async(req,res)=>{
    //
   const {username,email,password}=req.body
    // check the user ginven data
    if (!username && !email && !password) {
        throw new ApiError(404, "User not given data");
    }    
   // if user not send empty string 
   if (username === ""){
    throw new ApiError(402,"do not send enpty filds")
   }
   if (email === ""){
    throw new ApiError(402,"do not send enpty filds")
   }
   if (password === ""){
    throw new ApiError(402,"do not send enpty filds")
   }
   // create user
   const user = await User.create({
    username,
    email,
    password
   })

   const createdUser = await User.findById(user._id).select(
    "-password"
   )

   // remove password form database
   
  // check user in detabase or not
   if(!createdUser) {
    throw new ApiError(402,"User is not created in database")
   }
   return res.status(200).json(
    new ApiResponse(200,"User is secussfuly creted..",createdUser)
   )
})


export {RegisterUser}