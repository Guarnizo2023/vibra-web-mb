import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import useAuth from '../../hooks/useAuth';
import { getSafeKeyObjectFromStorage } from '../../../utils/safe-token-storage';
import { StatusBar } from 'expo-status-bar';
const mainLogo = require('../../assets/logo-vibra.png');

interface EmailFormData {
    to: string;
    subject: string;
    message: string;
}

const LoginForm: React.FC = () => {

    const keepSessionActive: string = JSON.parse(getSafeKeyObjectFromStorage('keepSessionActive')) ?? {};
    const tailwind = useTailwind();
    const [password, setPassword] = useState('123456');
    const [email, setEmail] = useState('user@test.com');
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    //const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const { login, isAuthenticated } = useAuth();
    const [formData, setFormData] = useState<EmailFormData>({
        to: 'yovanysuarezsilva@gmail.com',
        subject: 'Prueba desde React Native',
        message: '¡Este es un correo de prueba! 🚀',
    });

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        localStorage.setItem("keepSessionActive", `${!isEnabled}`);
        console.log("keepSessionActive:", `${!isEnabled}`);
    };

    useEffect(() => {
        console.log('keepSessionActive in useEffect', keepSessionActive);
        setIsEnabled(Boolean(keepSessionActive));
    }, [keepSessionActive])

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/components/(tabs)/one');
        }
    }, [isAuthenticated])

    const handlePasswordRecovery = async () => {
        try {
            const response = await fetch('http://192.168.101.71:4000/email/send-email-recovery-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: formData.to,
                    html: `<p>Nueva contraseña: ${formData.message}</p>`,
                }),
            });

            const result = await response.json();
            setModalVisible(false);
            Alert.alert(result.message || result.error);
        } catch (error) {
            Alert.alert('Error de conexión');
        }
    };

    const handleNext = async () => {
        /*if (!isAuthenticated) {
            console.log('Por favor, inicie una sesión');
            //Alert.alert('Error', 'Por favor, inicie una sesión');
            return;
        }*/
        router.push('/components/(tabs)/one')

    };

    const handleLogin = async () => {
        if (!email || !password) {
            console.log('Por favor, inicie una sesión');
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        setLoading(true);

        try {
            await login(email, password);
        } catch (error) {
            Alert.alert('Error', 'Credenciales incorrectas o error en la conexión.');
            //console.error('Error en la solicitud:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        router.push('/components/users/RegisterForm'); // Navegación usando el router
    }

    return (
        <View style={styles.container}>
            <StatusBar style="inverted" />
            <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 60 }}>
                <Image
                    source={mainLogo}
                    style={{ width: 150, height: 150, alignItems: 'center', marginTop: 20 }}
                />
            </View>
            {isEnabled && <>
                <Text style={tailwind('text-2xl font-bold text-center mb-2 text-white mt-4')}>
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
            <Text style={[styles.link, tailwind('mt-6')]} onPress={() => setModalVisible(true)}>
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
                            value={formData.to}
                            onChangeText={(text) => setFormData({ ...formData, to: text })}
                        />
                        <View style={tailwind('flex-row justify-between items-center mt-4 w-full')}>
                            <TouchableOpacity
                                style={tailwind('bg-gray-500 p-3 rounded-md items-center')}
                                onPress={() => setModalVisible(false)}
                                disabled={loading}
                            >
                                <Text style={tailwind('text-white font-bold text-center')}>
                                    {loading ? 'Cargando...' : 'Cancelar'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={tailwind('bg-red-500 p-3 rounded-md items-center')}
                                onPress={handlePasswordRecovery}
                                disabled={loading}
                            >
                                <Text style={tailwind('text-white font-bold text-center')}>
                                    {loading ? 'Cargando...' : 'Recuperar'}
                                </Text>
                            </TouchableOpacity>
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
        color: 'white',
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