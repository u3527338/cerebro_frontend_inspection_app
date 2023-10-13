import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { API_push_notification } from "../global/constants";

const usePushNotification = () => {
  const initPushNotificationConfig = () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  };

  const sendPushNotification = async (message) => {
    console.log("send push notification");
    await fetch(API_push_notification, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }).then((response) => console.log("response", response));
  };

  const getReceipts = async () => {
    await fetch("https://exp.host/--/api/v2/push/getReceipts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: [
          "D5B3F03A-3557-4938-BD4E-CE91B42F02D1",
          "7627c497-3096-4a09-8946-32dc2c1999b9",
        ],
      }),
    }).then((response) => console.log("receipts", response));
  };

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }
    return token;
  };

  return {
    initPushNotificationConfig,
    sendPushNotification,
    registerForPushNotificationsAsync,
    getReceipts,
  };
};

export default usePushNotification;
