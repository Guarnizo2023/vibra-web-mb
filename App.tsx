import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginForm from './components/login/LoginForm';
import RegisterForm from './components/users/RegisterForm';

export default function App() {
  return (
    <View style={styles.container}>
      <RegisterForm />
      <Text>Hola Ermes!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
