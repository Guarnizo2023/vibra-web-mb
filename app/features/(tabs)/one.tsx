import useAuth from '@/shared/hooks/useAuth';
import { Animated, ScrollView, StyleSheet } from 'react-native';
//import { useTailwind } from 'tailwind-rn';
import { useEffect, useRef, useState } from 'react';
import { useTailwind } from 'tailwind-rn';
import CardComponent from '../../shared/components/ui/CardComponent';
import ProgressBarVibra from '../../shared/components/ui/ProgressBar';
import CustomButton from '../../shared/components/ui/CustomButton';
import FloatButton from '../../shared/components/ui/animation/FloatButton';

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

        <ScrollView style={[styles.scrollView, tailwind('bg-gray-50 p-4')]}>
            <CardComponent />
            {/*
            <FloatButton />
            <WelcomeScreen navigation={undefined} />
            <View style={{ flex: 1, paddingHorizontal: 20, top: 0 }}>
                <Text>Datos mockeados: {mockDashboardData.tabOne}</Text>
            <UploadFile />
                <ReproductorMedia />
                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => setAnimate(true)}>
                        <Animated.View style={[styles.box, { transform: [{ scale: escala }] }]} />
                    </TouchableOpacity>
                </View>
            </View>*/}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#EAEAEA',
        padding: 4,
        borderColor: 'transparent',
    },
});