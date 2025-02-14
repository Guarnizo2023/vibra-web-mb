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
    console.log("en RootLayout:", isAuthenticated);
    checkAuth().then((authenticated: any) => {
      console.log("Authenticated:", authenticated);
      if (authenticated) {
        // router.replace('/(tabs)');
      } else {
        router.push("/Index");
      }
    });
  }, []);

  return (<>
  <ImageBackground
    source={require("./assets/bg-2.jpeg")} // Ruta de la imagen de fondo
    style={styles.background}
    resizeMode="cover" // Ajusta la imagen al tamaño del contenedor
  >
    <TailwindProvider utilities={utilities}>
      <Slot />
    </TailwindProvider>
  </ImageBackground>
  </>);
}
const styles = StyleSheet.create({
  background: {
    flex: 1, // Ocupa toda la pantalla
    width: "100%", // Ancho completo
    height: "100%", // Altura completa
  },
});
