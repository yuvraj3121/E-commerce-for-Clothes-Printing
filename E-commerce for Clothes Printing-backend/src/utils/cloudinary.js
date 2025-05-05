import dotenv from "dotenv";

dotenv.config({
  path: "././.env",
});

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("file uploaded successfulluy!", response.url);
    return response;
  } catch (error) {
    console.log(process.env.CLOUDINARY_API_KEY);
    console.error("Error uploading file to Cloudinary", error);
    throw new Error("Failed to upload file to Cloudinary");
  }
};

export { uploadOnCloudinary };
