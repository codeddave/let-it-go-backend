const { Expo } = require("expo-server-sdk");

const sendPushnotification = async (message, expoPushToken) => {
  if (!Expo.isExpoPushToken(expoPushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
  }

  const expo = new Expo();
  const chunks = expo.chunkPushNotifications([
    { to: expoPushToken, sound: "default", body: message },
  ]);

  const sendChunks = async () => {};
};

module.exports = sendPushnotification;
