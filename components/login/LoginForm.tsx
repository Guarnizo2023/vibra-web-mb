import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, Switch, StyleSheet } from 'react-native';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);

    const handleLogin = () => {
        // Handle login logic
    };

    const handlePasswordRecovery = () => {
        // Handle password recovery logic
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Iniciar Sesión" onPress={handleLogin} />
            <Text style={styles.link} onPress={() => setModalVisible(true)}>
                ¿Olvidaste tu contraseña?
            </Text>
            <View style={styles.switchContainer}>
                <Text>Mantener sesión iniciada</Text>
                <Switch
                    value={keepLoggedIn}
                    onValueChange={setKeepLoggedIn}
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
                            style={styles.input}
                            placeholder="Email"
                            value={recoveryEmail}
                            onChangeText={setRecoveryEmail}
                        />
                        <Button title="Recuperar" onPress={handlePasswordRecovery} />
                        <Button title="Cancelar" onPress={() => setModalVisible(false)} />
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
        padding: 16,
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
        justifyContent: 'space-between',
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