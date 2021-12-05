const express = require("express");
const expoPushNotificationtokenControllers = require("../controllers/expoPushNotificationTokenControllers");
const router = express.Router();

router.post(
  "/",
  expoPushNotificationtokenControllers.savePushNotificationToken
);

module.exports = router;
