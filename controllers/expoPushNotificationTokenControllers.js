const HttpError = require("../models/httpError");
const User = require("../models/user");
const sendPushnotification = require("../utils/expoPushNotification");
const savePushNotificationToken = async (req, res, next) => {
  // if (!req.userId) return next(new HttpError("User unauthenticated", 400));

  const { token, email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return next(new HttpError("No user found", 404));

    user.expoPushNotificationtoken = token;
    await user.save();
    res.status(200).json({ token: user.expoPushNotificationtoken });
  } catch (error) {
    return next(
      new HttpError(
        "Something went wrong with save push notification token",
        500
      )
    );
  }
};

const sendPushNotification = async (req, res, next) => {
  const { message } = req.body;
};

exports.savePushNotificationToken = savePushNotificationToken;

exports.sendPushNotification = sendPushnotification;
