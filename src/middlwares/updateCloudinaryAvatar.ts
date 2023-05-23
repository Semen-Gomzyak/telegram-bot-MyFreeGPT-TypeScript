import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { Request, Response } from "express";
import middlwares from '.';
dotenv.config();

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
});

const updateCloudinaryImage = async (req: Request, _res: Response): Promise<string> => {
    const name = req.body.name;
    try {
      if (!req.file) {
      throw new Error('No file provided');
    }
        const { path: tmpUpload, originalname } = req.file;
        await middlwares.avatarResize(originalname);
        const imageName = `${name}_${originalname}`;

        const cloudinaryUpload = await cloudinary.uploader.upload(tmpUpload, {
            public_id: middlwares.removePngOrJpgFromString(imageName),
        });

        const imageURL = cloudinaryUpload.secure_url;
        return imageURL;
    } catch (error: any) {
        return ''
    }
}

export default updateCloudinaryImage;