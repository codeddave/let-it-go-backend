const express = require("express");
const expoPushNotificationtokenControllers = require("../controllers/expoPushNotificationTokenControllers");
const router = express.Router();

router.post(
  "/",
  expoPushNotificationtokenControllers.savePushNotificationToken
);
router.post(
  "/send-push-notification",
  expoPushNotificationtokenControllers.sendPushNotification
);

module.exports = router;
