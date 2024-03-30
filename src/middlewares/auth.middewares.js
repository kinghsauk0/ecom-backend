import ApiError from "../utits/ApiError.js";
import AsncHandler from "../utits/AsyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user/User.models.js";

export const verifyJWT = AsncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        // Attach the user object to the request for further use
        req.user = user;
        next();
    } catch (error) {
        // Instead of rethrowing a new ApiError, you can simply pass the existing error
        next(error);
    }
});
