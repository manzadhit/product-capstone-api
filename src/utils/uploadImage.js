const { storage } = require("../config/googleStorage");
const config = require("../config/config");

const uploadImageToStorage = async (file) => {
  const timestamp = Date.now();
  const fileName = `news_images/${timestamp}_${file.originalname}`;
  const bucketName = config.bucket.bucketName;

  const bucket = storage.bucket(bucketName);
  const fileUpload = bucket.file(fileName);

  return new Promise((resolve, reject) => {
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on("error", (err) => {
      reject(err);
    });

    stream.on("finish", () => {
      const imageUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      resolve(imageUrl);
    });

    stream.end(file.buffer);
  });
};

module.exports = { uploadImageToStorage };
