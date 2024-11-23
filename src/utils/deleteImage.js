const { storage } = require("../config/googleStorage");
const config = require("../config/config");

const deleteImageFromStorage = async (fileName) => {
  const bucketName = config.bucket.bucketName;
  await storage.bucket(bucketName).file(fileName).delete();

};

module.exports = {
  deleteImageFromStorage,
};
