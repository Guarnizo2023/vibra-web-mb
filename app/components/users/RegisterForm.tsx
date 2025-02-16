import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import api from '../../services/api';

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
                    data: [
                        { value: '0', label: 'Seleccione un tipo' },
                        { value: '1', label: 'Documento de identidad' },
                        { value: '2', label: 'Registro civil' },
                        { value: '3', label: 'Cedula de ciudadania' }
                    ]
                };
                const roleResponse: any = await axios.get('http://localhost:4000/roles/all');
                console.log('roleResponse?.data:', roleResponse?.data);
                setTypeDocumentOptions(typeDocumentResponse?.data);
                setRoleOptions([...roleResponse.data, { id: '0', name: 'Seleccione un tipo' }]);
                setHightSchoolOptions([...roleResponse.data, { id: '0', name: 'Seleccione una institución' }]);
                setCourseOptions([...roleResponse.data, { id: '0', name: 'Seleccione un curso' }]);
            } catch (error) {
                console.error('Error fetching options', error);
            }
        };

        fetchOptions();
    }, []);

    const handleRegister = async () => {
        if (!username || !password || !documentNumber || !typeDocument || !email || !role || !course) {
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
            <Text style={tailwind('text-2xl font-bold text-center mb-2 text-white mt-4')}>
                <Image
                    source={require('../../assets/favicon.png')} // Cambia la ruta a tu ícono SVG
                    style={tailwind('w-4 h-4 ms-2.5 rtl:rotate-[270deg] mr-4 text-center')}
                />
                Registro de usuario
            </Text>
            <Text style={tailwind('text-10 font-bold text-left mb-1 text-white mt-2')}>
                Nombre de usuario
            </Text>
            <TextInput
                style={[styles.input, tailwind('w-full px-3 py-2 border border-gray-300 rounded-md mb-2 my-1 bg-white')]}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <Text style={tailwind('text-10 font-bold text-left mb-0 text-white mt-2')}>
                Contraseña
            </Text>
            <TextInput
                style={[styles.input, tailwind('w-full px-3 py-2 border border-gray-300 rounded-md mb-2 my-1 bg-white')]}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Text style={tailwind('text-10 font-bold text-left mb-0 text-white mt-2')}>
                Tipo de documento
            </Text>
            <Picker
                selectedValue={typeDocument}
                style={[styles.input, tailwind('w-full px-3 py-2 border border-gray-300 rounded-md mb-2 my-1 bg-white')]}
                onValueChange={(itemValue) => setTypeDocument(itemValue)}
            >
                {typeDocumentOptions.map((option: any) => (
                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
            </Picker>
            <Text style={tailwind('text-10 font-bold text-left mb-0 text-white mt-2')}>
                Documento
            </Text>
            <TextInput
                style={[styles.input, tailwind('w-full px-3 py-2 border border-gray-300 rounded-md mb-2 my-1 bg-white')]}
                placeholder="Número de documento"
                value={documentNumber}
                onChangeText={setDocumentNumber}
            />
            <Text style={tailwind('text-10 font-bold text-left mb-0 text-white mt-2')}>
                Correo electrónico
            </Text>
            <TextInput
                style={[styles.input, tailwind('w-full px-3 py-2 border border-gray-300 rounded-md mb-2 my-1 bg-white')]}
                placeholder="email@host.com"
                value={email}
                onChangeText={setEmail}
            />

            <Text style={tailwind('text-10 font-bold text-left mb-1 text-white mt-2')}>
                Rol de usuario
            </Text>
            <Picker
                selectedValue={role}
                style={[styles.input, tailwind('w-full px-3 py-2 border border-gray-300 rounded-md mb-2 my-1 bg-white')]}
                onValueChange={(itemValue) => setRole(itemValue)}
            >
                {roleOptions?.map((option: any) => (
                    <Picker.Item key={option.id} label={option.name} value={option.id} />
                ))}
            </Picker>
            <Text style={tailwind('text-10 font-bold text-left mb-0 text-white mt-2')}>
                Institución educativa
            </Text>
            <Picker
                selectedValue={hightSchool}
                style={[styles.input, tailwind('w-full px-3 py-2 border border-gray-300 rounded-md mb-4 my-1 bg-white')]}
                onValueChange={(itemValue) => setTypeDocument(itemValue)}
            >
                {typeDocumentOptions.map((option: any) => (
                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
            </Picker>
            {typeDocument == "3" && <>
                <Text style={tailwind('text-10 font-bold text-left mb-0 text-white mt-2')}>
                    Curso
                </Text>
                <Picker
                    selectedValue={course}
                    style={[styles.input, tailwind('w-full px-3 py-2 border border-gray-300 rounded-md mb-4 my-2 bg-white')]}
                    onValueChange={(itemValue) => setTypeDocument(itemValue)}
                >
                    {courseOptions.map((option: any) => (
                        <Picker.Item key={option.value} label={option.label} value={option.value} />
                    ))}
                </Picker>
            </>}
            <View style={tailwind('mt-4')}>
                <TouchableOpacity
                    style={tailwind('flex-1 w-full bg-red-500 p-3 rounded-md items-center')}
                    onPress={handleRegister}
                    disabled={false}
                >
                    <Text style={tailwind('text-white font-bold text-center')}>
                        {'Generar nuevo usuario'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
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