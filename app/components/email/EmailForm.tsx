import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

interface EmailFormData {
    to: string;
    subject: string;
    message: string;
}

export const EmailForm = () => {
    const [formData, setFormData] = useState<EmailFormData>({
        to: 'yovanysuarezsilva@gmail.com', // Datos de prueba
        subject: 'Prueba desde React Native',
        message: '¡Este es un correo de prueba! 🚀',
    });

    const handleSend = async () => {
        try {
            const response = await fetch('http://localhost:4000/email/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: formData.to,
                    subject: formData.subject,
                    html: `<p>${formData.message}</p>`,
                }),
            });

            const result = await response.json();
            Alert.alert(result.message || result.error);
        } catch (error) {
            Alert.alert('Error de conexión');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Para"
                value={formData.to}
                onChangeText={(text) => setFormData({ ...formData, to: text })}
            />
            <TextInput
                placeholder="Asunto"
                value={formData.subject}
                onChangeText={(text) => setFormData({ ...formData, subject: text })}
            />
            <TextInput
                placeholder="Mensaje"
                multiline
                value={formData.message}
                onChangeText={(text) => setFormData({ ...formData, message: text })}
            />
            <Button title="Enviar Correo" onPress={handleSend} />
        </View>
    );
};