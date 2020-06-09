var admin = require("firebase-admin");

var serviceAccount = require("./pi-web-mernstak-firebase-adminsdk-b6is1-7e77121a49.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pi-web-mernstak.firebaseio.com"
});