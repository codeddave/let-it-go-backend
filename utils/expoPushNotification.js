const { Expo } = require("expo-server-sdk");

const sendPushnotification = (message, expoPushToken) => {
  if (!Expo.isExpoPushToken(expoPushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
  }
};

module.exports = sendPushnotification;
