const { Expo } = require("expo-server-sdk");

const sendPushnotification = async (message, expoPushToken) => {
  if (!Expo.isExpoPushToken(expoPushToken)) {
    console.error(`Push token ${expoPushToken} is not a valid Expo push token`);
  }

  const expo = new Expo();
  const chunks = expo.chunkPushNotifications([
    { to: expoPushToken, sound: "default", body: message },
  ]);
  let tickets = [];

  const sendChunks = async () => {
    chunks.forEach(async (chunk) => {
      console.log("Sending chunk ", chunk);

      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.log(error);
      }
    });
  };
  sendChunks();
  let receiptIds = [];
  for (let ticket of tickets) {
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }

  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  (async () => {
    for (let chunk of receiptIdChunks) {
      try {
        let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        console.log(receipts);
        for (let receiptId in receipts) {
          let { status, message, details } = receipts[receiptId];
          if (status === "ok") {
            continue;
          } else if (status === "error") {
            console.error(
              `There was an error sending a notification: ${message}`
            );
            if (details && details.error) {
              console.error(`The error code is ${details.error}`);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  })();
};

module.exports = sendPushnotification;
