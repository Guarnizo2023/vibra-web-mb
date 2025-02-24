import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useId, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import api from '../../services/api';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const RegisterForm = () => {
    const tailwind = useTailwind();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [typeDocument, setTypeDocument] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [hightSchool, setHightSchool] = useState('0');
    const [course, setCourse] = useState('');
    const [typeDocumentOptions, setTypeDocumentOptions] = useState([]);
    const [roleOptions, setRoleOptions] = useState<any>([]);
    const [hightSchoolOptions, setHightSchoolOptions] = useState<any>([]);
    const [courseOptions, setCourseOptions] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [isValidateForm, setIsValidateForm] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (username && password && documentNumber && typeDocument && email && role && course) {
            setIsValidateForm(true);
        }

    }, [username, password, documentNumber, typeDocument, email, role, course]);

    useEffect(() => {
        const fetchOptions_ = async () => {
            if (hightSchool != '0') {
                const hightSchoolResponse: any = await axios.get(`http://localhost:4000/courses/allByHightSchool/${hightSchool}`);
                setCourseOptions([{ _id: '0', name: 'Seleccione un curso' }, ...hightSchoolResponse.data]);
            }
        }
        fetchOptions_();

    }, [hightSchool]);

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
                const hightSchoolResponse: any = await axios.get('http://localhost:4000/hightSchools/all');
                //const cursosResponse: any = await axios.get('http://localhost:4000/courses/allByHightSchool');
                console.log('roleResponse?.data:', roleResponse?.data);
                setTypeDocumentOptions(typeDocumentResponse?.data);
                setRoleOptions([{ _id: '0', name: 'Seleccione un tipo' }, ...roleResponse.data]);
                setHightSchoolOptions([{ _id: '0', name: 'Seleccione una institución' }, ...hightSchoolResponse.data]);
                //setCourseOptions([{ id: '0', name: 'Seleccione un curso' }, ...cursosResponse.data ]);
            } catch (error) {
                console.error('Error fetching options', error);
            }
        };

        fetchOptions();
    }, []);

    const handleCancel = async () => {
        router.push('/');
    }

    const handleRegister = async () => {
        if (!username || !password || !documentNumber || !typeDocument || !email || !role || !course) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        setLoading(true);
        const uniqueID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        try {
            // console.log('data:',{ username, password, documentNumber, typeDocument, email, role, course, hightSchool});
            const response = await api.post('/users/create', { id: uniqueID, username, password, documentNumber, typeDocument, email, role, course, hightSchool, avatar: '04.jpg' });
            if (response) {
                Alert.alert('Éxito', 'Registro de usuario exitoso.');
                console.log('Respuesta de la API:', response.data);
                router.push('/');
            }
        } catch (error) {
            Alert.alert('Error', 'Campos incompletos');
            console.error('Error en la solicitud:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} >
                <ScrollView style={styles.scrollView}>
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
                            <Picker.Item key={option._id} label={option.name} value={option._id} />
                        ))}
                    </Picker>
                    <Text style={tailwind('text-10 font-bold text-left mb-0 text-white mt-2')}>
                        Institución educativa
                    </Text>
                    <Picker
                        selectedValue={hightSchool}
                        style={[styles.input, tailwind('w-full px-3 py-2 border border-gray-300 rounded-md mb-4 my-1 bg-white')]}
                        onValueChange={(itemValue: any) => {
                            console.log('itemValue: ', itemValue);
                            setHightSchool(itemValue);
                        }}
                    >
                        {hightSchoolOptions.map((option: any) => (
                            <Picker.Item key={option._id} label={option.name} value={option._id} />
                        ))}
                    </Picker>
                    {hightSchool !== '0' && <>
                        <Text style={tailwind('text-10 font-bold text-left mb-0 text-white mt-2')}>
                            Curso
                        </Text>
                        <Picker
                            selectedValue={course}
                            style={[styles.input, tailwind('w-full px-3 py-2 border border-gray-300 rounded-md mb-4 my-2 bg-white')]}
                            onValueChange={(itemValue) => setCourse(itemValue)}
                        >
                            {courseOptions.map((option: any) => (
                                <Picker.Item key={option._id} label={option.name} value={option._id} />
                            ))}
                        </Picker>
                    </>}
                    <View style={tailwind('flex-row justify-center items-center mt-4 w-full')}>
                        <TouchableOpacity
                            style={tailwind('flex-1 w-full bg-gray-500 p-3 rounded-md items-center mr-3')}
                            onPress={handleCancel}
                            disabled={false}
                        >
                            <Text style={tailwind('text-white font-bold text-center')}>
                                {'Cancelar'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={tailwind(`flex-1 w-full ${isValidateForm ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'} p-3 rounded-md items-center`)}
                            onPress={handleRegister}
                            disabled={false}
                        >
                            <Text style={tailwind(`font-bold text-center ${isValidateForm ? 'text-white' : 'text-black'}`)}>
                                {'Generar usuario'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
    },
    scrollView: {
        //backgroundColor: 'pink',
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