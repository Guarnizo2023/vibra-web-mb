import api from '@/services/api';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Alert } from 'react-native';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>();

    const router = useRouter();

    const actionLogin = async (email: string, password: string) => {
        if (email !== '' && password !== '') {
            try {
                const response = await api.post('/users/login/userValidate', {
                    email,
                    password,
                });
                console.log('response: ', response);

                if (response) {
                    setUser(response.data?.user)
                    setIsAuthenticated(true);
                    // Alert.alert('Éxito', 'Inicio de sesión exitoso.');
                    const token = response.data?.access_token;
                    await SecureStore.setItemAsync('authToken', token);
                    return response.data?.user;
                }
            } catch (error) {
                Alert.alert('Error', 'Credenciales incorrectas o error en la conexión.');
                setIsAuthenticated(false);
                throw new Error('Credenciales inválidas');
            }
        } else {
            Alert.alert('Error', 'Credenciales incorrectas o error en la conexión.');
            setIsAuthenticated(false);
            // throw new Error('Credenciales inválidas');
        }
        return null
    };

    const checkAuth = async () => {
        const token = await SecureStore.getItemAsync('authToken');
        setIsAuthenticated(!!token);
        return !!token;
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync('authToken');
        setIsAuthenticated(false);
        router.replace('/');
    };

    return { isAuthenticated, login: actionLogin, checkAuth, logout, user };
};


export default useAuth;