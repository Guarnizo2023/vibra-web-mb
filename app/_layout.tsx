import * as Notifications from 'expo-notifications';
import { router, Slot, useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from "react";
import { ImageBackground, Platform, StyleSheet } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import '../global.css';
import utilities from "../tailwind.json";
import { UserProvider } from './context/UserContext';
import useAuth from "./hooks/useAuth";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

const queryClient = new QueryClient();

export default function RootLayout() {
  console.log("en RootLayout:");
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth().then((authenticated: any) => {
      console.log("Authenticated:", authenticated);
      if (isAuthenticated) {
        router.replace('/components/(tabs)/one');
        //router.replace('/components/ui/RankingScreen');
      } else {
        //router.push("/");
        router.replace('/components/(tabs)/emotion');
        //router.push("/components/ui/MediaPlayer");
      }
    });
  }, []);

  useNotificationObserver();
  return (
    <QueryClientProvider client={queryClient}>
      <TailwindProvider utilities={utilities}>
        <UserProvider>
          <ImageBackground
            source={require("./assets/sponsors/fondo_vibra_new.jpg")}
            style={styles.background}
            resizeMode="cover"
          >
            <StatusBar style="inverted" />
            <Slot />
          </ImageBackground>
        </UserProvider>
      </TailwindProvider>
    </QueryClientProvider>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
