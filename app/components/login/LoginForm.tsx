import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Modal, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import useAuth from '../../hooks/useAuth';
import { getSafeKeyObjectFromStorage } from '../../../utils/safe-token-storage';

const LoginForm: React.FC = () => {

    const keepSessionActive: string = JSON.parse(getSafeKeyObjectFromStorage('keepSessionActive')) ?? {};
    const tailwind = useTailwind();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    const { login } = useAuth();

    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        localStorage.setItem("keepSessionActive", `${!isEnabled}`);
        console.log("keepSessionActive:", `${!isEnabled}`);
    };

    useEffect(() => {
        console.log('keepSessionActive in useEffect', keepSessionActive);
        setIsEnabled(Boolean(keepSessionActive));
    }, [keepSessionActive])

    const handlePasswordRecovery = () => {
        // Handle password recovery logic
        setModalVisible(false);
    };

    const handleNext = async () => {
        if (!isAuthenticated) {
            Alert.alert('Error', 'Por favor, inicie una sesión');
        }
        router.push('../components/one')

    };

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        setLoading(true);

        // router.push('/users/RegisterForm');
        try {
            const response: any = await login(email, password);
            if (response) {
                Alert.alert('Éxito', 'Inicio de sesión exitoso.');
                //console.log('Respuesta de la API:', response.data);
            }
        } catch (error) {
            Alert.alert('Error', 'Credenciales incorrectas o error en la conexión.');
            //console.error('Error en la solicitud:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        router.push('../components/users/RegisterForm'); // Navegación usando el router
    }

    return (
        <View style={styles.container}>
            {!isEnabled && <>
                <Text style={tailwind('text-2xl font-bold text-center mb-2 text-gray-500 mt-30')}>
                    Iniciar Sesión
                </Text>
                <TextInput
                    style={[styles.input, tailwind('w-full p-3 border border-gray-300 rounded-md mb-4 my-2 bg-white')]}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={[styles.input, tailwind('w-full p-3 border border-gray-300 rounded-md mb-4 my-2 bg-white')]}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </>}
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
            {!isEnabled && <TouchableOpacity
                style={tailwind('w-full bg-blue-500 p-3 rounded-md items-center mb-4 mt-4')}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={tailwind('text-white font-bold text-center')}>
                    {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </Text>
            </TouchableOpacity>}
            {isEnabled && <TouchableOpacity
                style={tailwind('w-full bg-blue-500 p-3 rounded-md items-center mb-4 mt-4')}
                onPress={handleNext}
                disabled={loading}
            >
                <Text style={tailwind('text-white font-bold text-center')}>
                    {loading ? 'Cargando...' : 'Continuar'}
                </Text>
            </TouchableOpacity>}
            <TouchableOpacity
                style={tailwind('w-full bg-red-500 p-3 rounded-md items-center')}
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
                            placeholder="Correo electrónico"
                            value={recoveryEmail}
                            onChangeText={setRecoveryEmail}
                        />

                        <View style={tailwind('flex-row justify-between items-center mt-4 w-full')}>
                            <Button title="Recuperar" onPress={handlePasswordRecovery} />
                            <Button color={"#767577"} title="Cancelar" onPress={() => setModalVisible(false)} />
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