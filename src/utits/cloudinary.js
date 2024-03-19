
import fs from "fs"

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME, 
  api_key: process.env.CLOUDNARY_API_KEY, 
  api_secret: process.env.CLOUDNARY_API_AECRET 
});


const uploadOneCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null
        const respons= await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        console.log(`fill is uploderd${respons.url}`)
        return respons
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

export {uploadOneCloudinary}