import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    const mockLogin = async (email: string, password: string) => {
        if (email === 'user@test.com' && password === '123456') {
            //await SecureStore.setItemAsync('authToken', 'mock-token');
            setIsAuthenticated(true);
            Alert.alert('Éxito', 'Inicio de sesión exitoso.'); //
        } else {
            Alert.alert('Error', 'Credenciales incorrectas o error en la conexión.');
            setIsAuthenticated(false);
            // throw new Error('Credenciales inválidas');
        }
    };

    const checkAuth = async () => {
        const token = '....' //await SecureStore.getItemAsync('authToken');
        setIsAuthenticated(!!token);
        return !!token;
    };

    const logout = async () => {
        //await SecureStore.deleteItemAsync('authToken');
        setIsAuthenticated(false);
        router.replace('/');
    };

    return { isAuthenticated, login: mockLogin, checkAuth, logout };
};


export default useAuth;