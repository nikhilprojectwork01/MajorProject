const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


// now we are try to link backedn with the storage
cloudinary.config({
       cloud_name:process.env.CLOUD_NAME,
       api_key:process.env.CLOUD_API_KEY,
       api_secret:process.env.CLOUD_API_SECRET
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'airbnb_DEV',
      allowedFormat: async (req, file) => ["png" , "jpg" , "jpeg"], // supports promises as well
    },
  });


module.exports = {
    cloudinary,
    storage
}