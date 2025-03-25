import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
    title: string;
    variantColor?: string;
    onPress: () => void;
    style?: any;
    neonEffect?: boolean;
    icon?: string | any;
    iconPosition?: 'left' | 'right';
    iconSize?: number;
    disabled?: boolean;
};

const CustomButton = ({
    title,
    variantColor = 'blue',
    onPress,
    style = {},
    neonEffect = false,
    icon,
    iconPosition = 'left',
    iconSize = 24,
    disabled = false
}: Props) => {
    const [isPressed, setIsPressed] = useState(false);
    const tailwind = useTailwind();
    const pulseAnim = useRef(new Animated.Value(1)).current;

    // Animation for the neon glow effect
    useEffect(() => {
        if (neonEffect) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.2,
                        duration: 1000,
                        useNativeDriver: true
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true
                    })
                ])
            ).start();
        }
        return () => {
            pulseAnim.stopAnimation();
        };
    }, [neonEffect]);

    // Get gradient colors based on variant color
    const getGradientColors = () => {
        const colorMap: any = {
            'blue': ['#0066FF', '#0066FF', '#0066FF', '#0066FF', '#00CCFF'],
            'red': ['#FF0000', '#FF0000', '#FF0000', '#FF6666'],
            'green': ['#00CC00', '#00CC00', '#00CC00', '#66FF66'],
            'purple': ['#6600CC', '#CC66FF'],
            'orange': ['#FF6600', '#FFCC00'],
            'yellow': ['#FFCC00', '#FFFF66'],
            'gray': ['#666666', '#666666', '#666666', '#666666', '#CCCCCC']
        };

        return colorMap[variantColor] || colorMap['blue'];
    };

    // Render the button content with or without icon
    const renderButtonContent = () => {
        return (
            <View style={styles.contentContainer}>
                {icon && iconPosition === 'left' && (
                    <MaterialIcons name={icon} size={iconSize} color="white" style={styles.iconLeft} />
                )}
                <Text style={[styles.buttonText, tailwind('text-white font-bold text-center')]}>{title}</Text>
                {icon && iconPosition === 'right' && (
                    <MaterialIcons name={icon} size={iconSize} color="white" style={styles.iconRight} />
                )}
            </View>
        );
    };

    // Render standard button
    if (!neonEffect) {
        return (
            <TouchableOpacity
                style={[
                    style,
                    styles.button,
                    isPressed ? styles.buttonPressed : styles.buttonNormal,
                    tailwind(`bg-${variantColor}-500 p-2 mx-2 rounded-md items-center text-center justify-between`),
                    disabled && styles.buttonDisabled
                ]}
                onPressIn={() => !disabled && setIsPressed(true)}
                onPressOut={() => !disabled && setIsPressed(false)}
                onPress={() => !disabled && onPress()}
                activeOpacity={disabled ? 0.6 : 1}
                disabled={disabled}
            >
                {renderButtonContent()}
            </TouchableOpacity>
        );
    }

    // Render neon effect button
    return (
        <Animated.View
            style={[
                //styles.neonContainer,
                //{ transform: [{ scale: pulseAnim }] }
            ]}
        >
            <TouchableOpacity
                style={[
                    style,
                    styles.button,
                    styles.neonButton,
                    disabled && styles.buttonDisabled
                ]}
                onPressIn={() => !disabled && setIsPressed(true)}
                onPressOut={() => !disabled && setIsPressed(false)}
                onPress={() => !disabled && onPress()}
                activeOpacity={disabled ? 0.6 : 1}
                disabled={disabled}
            >
                <LinearGradient
                    colors={getGradientColors()}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                >
                    {renderButtonContent()}
                </LinearGradient>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Platform.OS == "android" ? -30 : 0,
        marginRight: 10,
        width: 'auto',
        overflow: 'hidden',
        height: 50,
    },
    buttonNormal: {
        backgroundColor: '#007AFF',
    },
    buttonPressed: {
        backgroundColor: '#0056A3',
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconLeft: {
        marginRight: 4,
    },
    iconRight: {
        marginLeft: 4,
    },
    neonContainer: {
        borderRadius: 10,
        shadowColor: '#00CCFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 20,
        //padding: -10,
    },
    neonButton: {
        padding: 0,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: 'transparent',
    },
    gradient: {
        width: '100%',
        height: '100%',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CustomButton;