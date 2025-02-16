import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import LoginForm from './components/login/LoginForm';
import utilities from '../tailwind.json';
import { TailwindProvider } from 'tailwind-rn';
//import messaging from '@react-native-firebase/messaging';

// Solicitar permisos para notificaciones (iOS)
/*messaging()
  .requestPermission()
  .then((authStatus: any) => {
    console.log('Estado de autorización:', authStatus);
  })
  .catch((error: any) => {
    console.log('Error al solicitar permisos:', error);
  });

// Escuchar notificaciones en segundo plano (Firebase)
messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
  console.log('Notificación en segundo plano:', remoteMessage);
});*/

const Index = () => {
  return (
    <TailwindProvider utilities={utilities}>
      <ImageBackground
        source={require('./assets/bg-2.jpeg')} // Ruta de la imagen de fondo
        style={styles.background}
        resizeMode="cover" // Ajusta la imagen al tamaño del contenedor
      >

        <View style={styles.container}>
          <LoginForm />
          <Text>Desarrollado por equipo Vibra</Text>
          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default Index;