import ApiResponse from "../utits/ApiResponse.js";
import AsncHandler from "../utits/AsyncHandler.js";
import ApiError from "../utits/ApiError.js";
import User from "../models/user/User.models.js";




const RegisterUser = AsncHandler(async(req,res)=>{
    const {username,email,password}=req.body;

    // check if the user has provided all required data
    if (!username || !email || !password) {
        throw new ApiError(404, "User data is incomplete");
    }
    

    // check if the user has provided valid data
    if (username === "" && email === "" && password === "") {
        throw new ApiError(402,"Please provide valid data for all fields");
    }
    

    // check if the user already exists
    const existedUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existedUser) {
        throw new ApiError(409, "User is already registered");
    }

    // create user
    const user = await User.create({
        username,
        email,
        password
    });

    // fetch the created user details from database
    const createdUser = await User.findById(user._id).select("-password");

    if(!createdUser) {
        throw new ApiError(402,"Failed to create user in database");
    }

    return res.status(200).json(new ApiResponse(200,"User created successfully",createdUser));
});



// login user

const LoginUser = AsncHandler(async(req,res) =>{
    const {email, password} = req.body
    // check email or password fild is there
    if (!email || !password) {
        throw new ApiError(404, "User data is incomplete");
    }

    // check email and password filelds are not empty
    if(email==="" && password===""){
        throw new ApiError(402,"data given as a empty fields")
    }

    //find the user
    const user = await User.findOne({email})
    //console.log(user)
    // check password is veryfied
    const isPasswordCorrect =  await user.isPasswordCorrect(password)
    if(!isPasswordCorrect){
        throw new ApiError(404,"password is not right")
    }

    //console.log(isPasswordCorrect)

    // generated token
    const accessToken = await user.generateAccessToken()
    if (!accessToken){
        throw new ApiError(505,"token is not genarated")
    }
    
    // remove password
    const createdLogin = await User.findById(user._id).select("-password")
    // make cookie
    const options = {
        httpOnly: true,
        secure: true
    }

    // send respons
    //console.log(accessToken)
    return res.status(200).cookie("accessToken",accessToken,options)
    .json(
        new ApiResponse(
            200,
            "user is Login proparly",
            {
                user: createdLogin,
                accessToken,
                
            },
        )
    )
    
}) 



// forgetPassword
const ForgetPassword = AsncHandler(async (req,res) =>{
    const {oldPassword,newPassword} = req.body

    if(!oldPassword && !newPassword){
        throw new ApiError(404,"password fields are not given")
    }

    if(oldPassword==="" && newPassword===""){
        throw new ApiError(404,"password fields are empty")
    }
    const comparePassword = await user.isPasswordCorrect(oldPassword)

    if(!comparePassword){
        throw new ApiError(404,"password in not right")
    }
    const user = await User.findOne({password:comparePassword})
    if(!user){
        throw new ApiError(404,"user is not found")
    }

    user.password = newPassword
    await user.save({validateBeforeSave:false})


    return res.status(200).json(
        new ApiResponse(200,"password is changend")
    )
})




export {RegisterUser,LoginUser,ForgetPassword};
