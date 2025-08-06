import {v2 as cloudinary} from "cloudinary";

const connectCloudinary=async ()=>{
    cloudinary.config(
        {
    cloud_name:process.env.COLUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLODINARY_API_SECRET,
        }

    )
   
}

export default connectCloudinary;