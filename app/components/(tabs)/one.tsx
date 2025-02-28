// app/(tabs)/one.tsx
import useAuth from '@/hooks/useAuth';
import { Text, TouchableOpacity, View, StyleSheet, ScrollView, Animated } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { mockDashboardData } from '../../../utils/mockData';
import CardComponent from '../ui/CardComponent';
import UserRankingList from '../users/UserRankingList';
import UploadFile from '../ui/UploadFile';
import { useState, useRef, useEffect } from 'react';
import ProgressBar from '../ui/ProgressBar';

export default function TabOne() {
    const tailwind = useTailwind();
    const { logout } = useAuth();
    const [animate, setAnimate] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (animate) {
            Animated.timing(animation, {
                toValue: 1, // Valor final de la animación
                duration: 500, // Duración en milisegundos
                useNativeDriver: true, // Importante para rendimiento
            }).start(() => setAnimate(false)); // Reset al finalizar
        } else {
            Animated.timing(animation, {
                toValue: 0, // Regresa al valor inicial
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [animate, animation]);

    const escala = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.8], // Escala de 1 a 1.5
    });

    return (
        <ScrollView style={styles.scrollView}>
            <View style={{ flex: 1, paddingHorizontal: 20, top: 0 }}>
                {/*<Text>Datos mockeados: {mockDashboardData.tabOne}</Text>
            <UploadFile />*/}
                <CardComponent />
                <ProgressBar />
                {/*<View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => setAnimate(true)}>
                        <Animated.View style={[styles.cuadro, { transform: [{ scale: escala }] }]} />
                    </TouchableOpacity>
                </View>*/}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#EAEAEA',
        padding: 4,
        borderColor: 'transparent',
    },
    input: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        top: 0,
        paddingHorizontal: 8,
        width: 120,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cuadro: {
        marginTop: 20,
        width: 10,
        height: 10,
        backgroundColor: '#FFFFFF',
    },
});