const HttpError = require("../models/httpError");
const User = require("../models/user");

const savePushNotificationToken = async (req, res, next) => {
  // if (!req.userId) return next(new HttpError("User unauthenticated", 400));

  const { token, email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return next(new HttpError("No user found", 404));

    user.expoPushNotificationtoken = token;
  } catch (error) {
    return next(
      new HttpError(
        "Something went wrong with save push notification token",
        500
      )
    );
  }
};

exports.savePushNotificationToken = savePushNotificationToken;
