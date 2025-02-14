import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, Modal, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import useAuth from './hooks/useAuth';

const LoginForm: React.FC = () => {
    const tailwind = useTailwind();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    const { login } = useAuth();

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const handlePasswordRecovery = () => {
        // Handle password recovery logic
        setModalVisible(false);
    };

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        setLoading(true);

        router.push('/users/RegisterForm');
        try {
            const response: any = await login(email, password);
            Alert.alert('Éxito', 'Inicio de sesión exitoso.');
            console.log('Respuesta de la API:', response.data);
        } catch (error) {
            Alert.alert('Error', 'Credenciales incorrectas o error en la conexión.');
            console.error('Error en la solicitud:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
    }

    return (
        <View style={styles.container}>
            <Text style={tailwind('text-2xl font-bold text-center mb-2 text-gray-500 mt-30')}>
                Iniciar Sesión
            </Text>
            <TextInput
                style={[styles.input, tailwind('w-full p-3 border border-gray-300 rounded-md mb-4 my-2')]}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={[styles.input, tailwind('w-full p-3 border border-gray-300 rounded-md mb-4 my-2')]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity
                style={tailwind('w-full bg-blue-500 p-3 rounded-md items-center')}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={tailwind('text-white font-bold text-center')}>
                    {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={tailwind('w-full bg-blue-500 p-3 rounded-md items-center')}
                onPress={handleRegister}
                disabled={loading}
            >
                <Text style={tailwind('text-white font-bold text-center')}>
                    {loading ? 'Cargando...' : 'Registrarse'}
                </Text>
            </TouchableOpacity>
            <Text style={styles.link} onPress={() => setModalVisible(true)}>
                ¿Olvidaste tu contraseña?
            </Text>
            <View style={styles.switchContainer}>
                <Text style={tailwind('mr-2 text-white')}>Mantener sesión iniciada</Text>
                <Switch
                    style={tailwind('mt-1')}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    value={isEnabled}
                    onValueChange={toggleSwitch}
                />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Recuperar Contraseña</Text>
                        <TextInput
                            style={[styles.input, tailwind('w-full p-3 border border-gray-300 rounded-md mb-4 my-2')]}
                            placeholder="Email"
                            value={recoveryEmail}
                            onChangeText={setRecoveryEmail}
                        />

                        <View style={tailwind('flex-row justify-between items-center mt-4 w-full')}>
                            <Button title="Recuperar" onPress={handlePasswordRecovery} />
                            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        width: "80%"
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    link: {
        color: 'blue',
        textAlign: 'center',
        marginTop: 12,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 16,
    },
});

export default LoginForm;