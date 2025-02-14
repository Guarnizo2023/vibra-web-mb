import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import LoginForm from './LoginForm';
import utilities from '../tailwind.json';
import { TailwindProvider } from 'tailwind-rn';

const LoginFormPage = () => {
  return (
    <ImageBackground
      source={require('./assets/bg-2.jpeg')} // Ruta de la imagen de fondo
      style={styles.background}
      resizeMode="cover" // Ajusta la imagen al tamaño del contenedor
    >
      <TailwindProvider utilities={utilities}>
        <View style={styles.container}>
          <LoginForm />
          <Text>Desarrollado por equipo Vibra</Text>
          <StatusBar style="auto" />
        </View>
      </TailwindProvider>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1, // Ocupa toda la pantalla
    width: '100%', // Ancho completo
    height: '100%', // Altura completa
  },
});

export default LoginFormPage;