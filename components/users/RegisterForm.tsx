import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [typeDocument, setTypeDocument] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [typeDocumentOptions, setTypeDocumentOptions] = useState([]);
    const [roleOptions, setRoleOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const typeDocumentResponse: any = await axios.get('https://api.example.com/typeDocument');
                const roleResponse: any = await axios.get('https://api.example.com/roles');
                setTypeDocumentOptions(typeDocumentResponse?.data);
                setRoleOptions(roleResponse?.data);
            } catch (error) {
                console.error('Error fetching options', error);
            }
        };

        fetchOptions();
    }, []);

    const handleRegister = () => {
        // Handle the registration logic here
        console.log({ username, password, documentNumber, typeDocument, email, role });
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