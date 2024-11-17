const { Firestore } = require("@google-cloud/firestore");
const path = require("path");

const db = new Firestore({
  projectId: "nutricheck-441702",
  keyFilename: path.join(__dirname, "./key.json"),
  databaseId: "nutricheckdb",
});

module.exports =  db ;
