import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import api from '../services/api';
import { useTailwind } from 'tailwind-rn';
import useAuth from '../hooks/useAuth';

const RegisterForm = () => {
    const tailwind = useTailwind();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [typeDocument, setTypeDocument] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [hightSchool, setHightSchool] = useState('');
    const [course, setCourse] = useState('');
    const [typeDocumentOptions, setTypeDocumentOptions] = useState([]);
    const [roleOptions, setRoleOptions] = useState<any>([]);
    const [hightSchoolOptions, setHightSchoolOptions] = useState<any>([]);
    const [courseOptions, setCourseOptions] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const typeDocumentResponse: any = {
                    data : [
                        { value: '0', label:'Seleccione un tipo' },  
                        { value: '1', label:'Documento de identidad' },
                        { value: '2', label:'Registro civil' },
                        { value: '3', label:'Cedula de ciudadania' }
                    ]
                };
                const roleResponse: any = { 
                    data : [] 
                }; //await axios.get('http://localhost:4000/roles/all');
                console.log('roleResponse?.data:', roleResponse?.data);
                setTypeDocumentOptions(typeDocumentResponse?.data);
                setRoleOptions([...roleResponse?.data, { id: '0', name:'Seleccione un tipo' }]);
                setHightSchoolOptions([...roleResponse?.data, { id: '0', name:'Seleccione una institución' }]);
                setCourseOptions([...roleResponse?.data, { id: '0', name:'Seleccione un curso' }]);
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
            <Text style={tailwind('text-2xl font-bold text-center mb-2 text-white mt-30')}>
                Registro de usuario
            </Text>
            <Text style={tailwind('text-10 font-bold text-left mb-1 text-white mt-4')}>
                Nombre de usuario
            </Text>
            <TextInput
                style={[styles.input, tailwind('w-full p-3 border border-gray-300 rounded-md mb-4 my-2 bg-white')]}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={[styles.input, tailwind('w-full p-3 border border-gray-300 rounded-md mb-4 my-2 bg-white')]}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={[styles.input, tailwind('w-full p-3 border border-gray-300 rounded-md mb-4 my-2 bg-white')]}
                placeholder="Document Number"
                value={documentNumber}
                onChangeText={setDocumentNumber}
            />
            <Text style={tailwind('text-10 font-bold text-left mb-1 text-white mt-4')}>
                Tipo de documento
            </Text>
            <Picker
                selectedValue={typeDocument}
                style={[styles.input, tailwind('w-full p-3 border border-gray-300 rounded-md mb-4 my-2 bg-white')]}
                onValueChange={(itemValue) => setTypeDocument(itemValue)}
            >
                {typeDocumentOptions.map((option: any) => (
                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
            </Picker>
            <TextInput
                style={[styles.input, tailwind('w-full p-3 border border-gray-300 rounded-md mb-4 my-2 bg-white')]}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Picker
                selectedValue={role}
                style={[styles.input, tailwind('w-full p-3 border border-gray-300 rounded-md mb-4 my-2 bg-white')]}
                onValueChange={(itemValue) => setRole(itemValue)}
            >
                {roleOptions?.map((option: any) => (
                    <Picker.Item key={option.id} label={option.name} value={option.id} />
                ))}
            </Picker>
            <Text style={tailwind('text-10 font-bold text-left mb-1 text-white mt-4')}>
                Institución educativa
            </Text>
            <Picker
                selectedValue={hightSchool}
                style={[styles.input, tailwind('w-full p-3 border border-gray-300 rounded-md mb-4 my-2 bg-white')]}
                onValueChange={(itemValue) => setTypeDocument(itemValue)}
            >
                {typeDocumentOptions.map((option: any) => (
                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
            </Picker>
            {typeDocument == "3" && <>
            <Text style={tailwind('text-10 font-bold text-left mb-1 text-white mt-4')}>
                Curso
            </Text>
            <Picker
                selectedValue={course}
                style={[styles.input, tailwind('w-full p-3 border border-gray-300 rounded-md mb-4 my-2 bg-white')]}
                onValueChange={(itemValue) => setTypeDocument(itemValue)}
            >
                {courseOptions.map((option: any) => (
                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
            </Picker>
            </>}
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