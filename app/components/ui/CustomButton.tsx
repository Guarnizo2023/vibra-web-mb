import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { useTailwind } from 'tailwind-rn';

type Props = {
    title: string;
    variantColor?: string;
    onPress: () => void;
};

const CustomButton = ({ title, variantColor = 'blue', onPress }: Props) => {
    const [isPressed, setIsPressed] = useState(false);
    const tailwind = useTailwind();

    return (
        <TouchableOpacity
            style={[
                styles.button,
                isPressed ? styles.buttonPressed : styles.buttonNormal,
                tailwind(`bg-${variantColor}-500 p-3 mr-4 rounded-md items-center text-center justify-center`)
            ]}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={onPress}
            activeOpacity={1} // Evita el efecto de opacidad por defecto
        >
            <Text style={[styles.buttonText, tailwind('text-white font-bold text-center')]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Platform.OS == "android" ? -30 : 0,
    },
    buttonNormal: {
        backgroundColor: '#007AFF', // Color azul normal
    },
    buttonPressed: {
        backgroundColor: '#0056A3', // Color azul más oscuro al presionar
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'ultralight',
    },
});

export default CustomButton;