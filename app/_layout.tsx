import { Slot, useRouter } from "expo-router";
import useAuth from "./hooks/useAuth";
import React, { useEffect } from "react";

import utilities from "../tailwind.json";
import { TailwindProvider } from "tailwind-rn";
import { ImageBackground, StyleSheet } from "react-native";

export default function RootLayout() {
  console.log("en RootLayout:");
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth().then((authenticated: any) => {
      console.log("Authenticated:", authenticated);
      if (authenticated) {
        router.replace('/components/(tabs)/one');
      } else {
        //router.push("/Index");
      }
    });
  }, []);

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
