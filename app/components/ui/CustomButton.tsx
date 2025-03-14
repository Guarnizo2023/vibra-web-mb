import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn';

type Props = {
    title: string;
    variantColor?: string;
    onPress: () => void;
    style?: any;
};

const CustomButton = ({ title, variantColor = 'blue', onPress, style = {} }: Props) => {
    const [isPressed, setIsPressed] = useState(false);
    const tailwind = useTailwind();

    return (
        <TouchableOpacity
            style={[
                style,
                styles.button,
                isPressed ? styles.buttonPressed : styles.buttonNormal,
                tailwind(`bg-${variantColor}-500 p-3 mx-3 rounded-md items-center text-center justify-between`)
            ]}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={onPress}
            activeOpacity={1}
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
        width: 'auto',
    },
    buttonNormal: {
        backgroundColor: '#007AFF',
    },
    buttonPressed: {
        backgroundColor: '#0056A3',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'ultralight',
    },
});

export default CustomButton;