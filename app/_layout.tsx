import * as Notifications from 'expo-notifications';
import { router, Slot, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, Platform } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import utilities from "../tailwind.json";
import useAuth from "./hooks/useAuth";

function useNotificationObserver() {
  useEffect(() => {
    let isMounted = true;

    function redirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.url;
      if (url) {
        router.push(url);
      }
    }
    if (Platform.OS !== 'web') {
      Notifications.getLastNotificationResponseAsync()
        .then(response => {
          if (!isMounted || !response?.notification) {
            return;
          }
          redirect(response?.notification);
        });
    }
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      redirect(response.notification);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}

export default function RootLayout() {
  console.log("en RootLayout:");
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth().then((authenticated: any) => {
      console.log("Authenticated:", authenticated);
      if (isAuthenticated) {
        router.replace('/components/(tabs)/one');
      } else {
        router.push("/");
      }
    });
  }, []);

  useNotificationObserver();
  return (
    <TailwindProvider utilities={utilities}>
      <ImageBackground
        source={require("./assets/bg-2.jpeg")}
        style={styles.background}
        resizeMode="cover"
      >
        <Slot />
      </ImageBackground >
    </TailwindProvider>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
