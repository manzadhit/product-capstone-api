const admin = require("firebase-admin");
const path = require("path");

admin.initializeApp({
  projectId: "nutricheck-441702",
  credential: admin.credential.cert(path.join(__dirname, "./key.json")),
});

module.exports = admin ;
