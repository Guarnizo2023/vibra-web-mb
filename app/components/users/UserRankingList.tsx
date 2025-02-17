import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useTailwind } from 'tailwind-rn';
import socket from '../../../socket';


const UserRankingList = () => {
    const tailwind = useTailwind();
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [items, setItems] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Escuchar el evento "customEvent" desde el backend
        socket.on('customEvent', (data) => {
            setMessage(data.message);
            Alert.alert('Evento Recibido', data.message);
        });

        // Enviar un evento al backend
        socket.emit('clientEvent', 'Hola desde el cliente');

        // Limpiar la suscripción al desmontar el componente
        return () => {
            socket.off('customEvent');
        };
    }, []);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const roleResponse: any = await axios.get('http://localhost:4000/users/all');
                console.log('roleResponse?.data:', roleResponse?.data);
                setItems([...roleResponse.data,
                {
                    username: 'Juan Perez',
                    documentNumber: '123456789',
                    typeDocument: 'DNI',
                    email: 'juan.perez@example.com',
                    keepSessionActive: true,
                    role: 'Estudiante',
                    avatar: 'https://via.placeholder.com/150', // URL de la imagen del avatar
                    course: 'Matemáticas',
                },
                {
                    username: 'Yovany Suarez Silva',
                    documentNumber: '987654321',
                    typeDocument: 'Tarjeta de identidad',
                    email: 'maria.gomez@example.com',
                    keepSessionActive: false,
                    role: 'Estudiante',
                    avatar: '../../assets/avatars/03.jpg',
                    course: 'Primero A',
                }]);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, [message]);

    const handleUserPress = (user: any) => {
        setSelectedUser(user);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red' }}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={tailwind('flex-1 h-full p-2 bg-gray-100')}>
            <ScrollView>
                {items.map((user: any, index: number) => (
                    <TouchableOpacity
                        key={index + 1}
                        onPress={() => handleUserPress(user)}
                        style={tailwind('bg-white p-2 mb-2 px-4 rounded-lg shadow-sm flex-row items-center')}
                    >
                        <View style={tailwind('flex-1')}>
                            <Text style={tailwind('text-lg font-bold text-gray-800')}>
                                {user.username}
                            </Text>
                            <Text style={tailwind('text-sm text-gray-600')}>
                                {user.course}
                            </Text>
                        </View>
                        <Image
                            source={require('../../assets/avatars/03.jpg')}
                            style={tailwind('w-10 h-10 rounded-full')}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {/*<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Text>Mensaje del servidor: {message}</Text>
                <Button
                    title="Emitir Evento"
                    onPress={() => socket.emit('clientEvent', 'Nuevo mensaje desde el cliente')}
                />
            </View>*/}
            {/* Modal para mostrar la información completa del usuario */}
            <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
                <View style={tailwind('bg-white p-6 rounded-lg')}>
                    {selectedUser && (
                        <>
                            <Text style={tailwind('text-xl font-bold mb-4 text-gray-800')}>
                                Información del Usuario
                            </Text>
                            <Image
                                source={{ uri: selectedUser.avatar }}
                                style={tailwind('w-24 h-24 rounded-full mx-auto mb-4')}
                            />
                            <Text style={tailwind('text-lg font-medium text-gray-800')}>
                                Nombre: {selectedUser.username}
                            </Text>
                            <Text style={tailwind('text-sm text-gray-600')}>
                                Documento: {selectedUser.typeDocument} {selectedUser.documentNumber}
                            </Text>
                            <Text style={tailwind('text-sm text-gray-600')}>
                                Email: {selectedUser.email}
                            </Text>
                            <Text style={tailwind('text-sm text-gray-600')}>
                                Rol: {selectedUser.role}
                            </Text>
                            <Text style={tailwind('text-sm text-gray-600')}>
                                Sesión Activa: {selectedUser.keepSessionActive ? 'Sí' : 'No'}
                            </Text>
                            <Text style={tailwind('text-sm text-gray-600')}>
                                Curso: {selectedUser.course}
                            </Text>
                            <TouchableOpacity
                                onPress={closeModal}
                                style={tailwind('mt-4 bg-blue-500 p-3 rounded-lg items-center')}
                            >
                                <Text style={tailwind('text-white font-bold')}>Cerrar</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </Modal>
        </View>
    );
};

export default UserRankingList;