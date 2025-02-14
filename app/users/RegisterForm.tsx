import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import api from '../services/api';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [typeDocument, setTypeDocument] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [typeDocumentOptions, setTypeDocumentOptions] = useState([]);
    const [roleOptions, setRoleOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const typeDocumentResponse: any = await axios.get('https://api.example.com/typeDocument');
                const roleResponse: any = await axios.get('http://localhost:4000/roles');
                setTypeDocumentOptions(typeDocumentResponse?.data);
                setRoleOptions(roleResponse?.data);
            } catch (error) {
                console.error('Error fetching options', error);
            }
        };

        fetchOptions();
    }, []);

    const handleRegister = async () => {
        if (!username || !password || !documentNumber || !typeDocument || !email || !role) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        setLoading(true);

        try {
            const response = await api.post('/login', { email, password });
            Alert.alert('Éxito', 'Registro de usuario exitoso.');
            console.log('Respuesta de la API:', response.data);
        } catch (error) {
            Alert.alert('Error', 'Campos incompletos');
            console.error('Error en la solicitud:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Document Number"
                value={documentNumber}
                onChangeText={setDocumentNumber}
            />
            <Picker
                selectedValue={typeDocument}
                style={styles.input}
                onValueChange={(itemValue) => setTypeDocument(itemValue)}
            >
                {typeDocumentOptions.map((option: any) => (
                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
            </Picker>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Picker
                selectedValue={role}
                style={styles.input}
                onValueChange={(itemValue) => setRole(itemValue)}
            >
                {roleOptions.map((option: any) => (
                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
            </Picker>
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default RegisterForm;