const HttpError = require("../models/httpError");
const User = require("../models/user");
const expoPushNotification = require("../utils/expoPushNotification");

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
  const { message, creator } = req.body;

  try {
    const user = await User.findById(creator);

    const pushToken = user.expoPushNotificationtoken;
    expoPushNotification(message, pushToken);

    //user.messages = [...user.messages, message];

    await User.updateOne({ creator }, { $push: { messages: message } });

    res.status(200).json("Message sent!");
  } catch (error) {
    console.log(error);
    return next(new HttpError("Error sending a notification", 500));
  }
};

exports.savePushNotificationToken = savePushNotificationToken;

exports.sendPushNotification = sendPushNotification;
