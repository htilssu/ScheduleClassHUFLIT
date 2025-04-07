import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, // Lấy từ biến môi trường
    api_key: process.env.CLOUDINARY_API_KEY, // Lấy từ biến môi trường
    api_secret: process.env.CLOUDINARY_API_SECRET, // Lấy từ biến môi trường
});

export const deleteImage = async (publicId: string) => {
    try {
        await cloudinary.uploader.destroy(publicId);
        return true;
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        return false;
    }
};

export default cloudinary;