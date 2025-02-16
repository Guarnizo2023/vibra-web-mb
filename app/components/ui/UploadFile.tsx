import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
//import DocumentPicker from 'react-native-document-picker';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import Video from 'react-native-video';

const API_URL = 'http://192.168.101.72:4000/file-upload'; // Reemplaza con la IP de tu backend

const UploadFile = () => {
    const [file, setFile] = useState<any | null>(null);
    const [fileId, setFileId] = useState<string | null>(null);

    /* const pickFile = async () => {
        try {
            const res: any = await DocumentPicker.pick({});
            if (res && res.length > 0) {
                setFile(res[0]);
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                Alert.alert('Cancelado', 'No se seleccionó ningún archivo.');
            } else {
                Alert.alert('Error', 'No se pudo seleccionar el archivo.');
            }
        }
    }; */
    const pickFile = async () => {
        const result: any = await DocumentPicker.getDocumentAsync({
            type: '*/*',  // o 'application/pdf', 'image/*', etc.
            multiple: false,
        });
        console.log('result:', result);
        if (result) {
            setFile({ uri: result.assets[0].uri, name: result.assets[0].name, type: result.assets[0].mimeType });
        }

        if (result /*&& result.type === 'success'*/) {
            console.log(result);
        } else {
            console.log('cancelado');
        }
    }

    const uploadFile = async () => {
        if (!file) {
            Alert.alert('Error', 'No se ha seleccionado ningún archivo.');
            return;
        }

        const formData: any = new FormData();
        formData.append('file', {
            uri: file.uri,
            filename: file.name,
            type: file.type,
        });

        console.log('formData', formData);

        try {
            const response: any = await axios.post(`${API_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('response.data?.fileId:', response.data?.fileId);
            setFileId(response.data?.fileId);
            Alert.alert('Éxito', 'El archivo se ha subido correctamente.');
        } catch (error) {
            Alert.alert('Error', 'No se pudo subir el archivo.');
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Seleccionar Archivo" onPress={pickFile} />
            {file && <Text style={styles.fileName}>{file.name}</Text>}
            <Button title="Subir Archivo" onPress={uploadFile} />

            {fileId && (
                <Video
                    source={{ uri: `${API_URL}/stream/${fileId}` }}
                    style={styles.video}
                    controls
                    paused
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    fileName: {
        marginVertical: 16,
        fontSize: 16,
    },
    video: {
        width: 300,
        height: 200,
        marginTop: 16,
    },
});

export default UploadFile;