const express = require("express");
const router = express.Router();
var admin = require("firebase-admin");
const auth = require("../../middleware/auth")
const User = require("../../model/User")
var serviceAccount = require("../../config/pi-web-mernstak-firebase-adminsdk-b6is1-7e77121a49.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:"https://pi-web-mernstak.firebaseio.com",
});

module.exports.admin = admin;
router.post("/",auth,(req, res) => {
  const user =  User.findById({_id:req.user._id})
  const registrationToken = req.body.registrationToken;
  const message = req.body.message;
  const payload = {
    notification: {
      title: "Request",
      body: message,
      icon: ""
    }
  }
  console.log(registrationToken)
  admin
    .messaging()
    .sendToDevice(registrationToken, payload)
    .then((response) => {
      res.status(200).send("Notification sent successfully");
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = router;