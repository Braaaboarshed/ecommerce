const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dntjatlwg",
  api_key: "915383894942133",
  api_secret: "fUIxam6Ev5uLplLNDI4yralIl5I",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };


// ClOUDINARY_CLOD_NAME = dntjatlwg
// ClOUDINARY_API_KEY = 835867536235862
// ClOUDINARY_API_SECRET = GxJ5EMSnP_w6n5or3m427daM-LE