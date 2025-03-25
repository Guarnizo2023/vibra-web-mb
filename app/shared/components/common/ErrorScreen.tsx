import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Ionicons } from '@expo/vector-icons';

interface ErrorScreenProps {
    message?: string;
    onRetry?: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({
    message = 'Algo salió mal. Por favor, inténtalo de nuevo.',
    onRetry
}) => {
    const tailwind = useTailwind();

    return (
        <View style={[{ width: "auto" }, tailwind('flex-1 justify-center items-center p-2 bg-gray-50')]}>
            <View style={tailwind('bg-white rounded-2xl p-8 shadow-lg items-center max-w-full')}>
                <View style={tailwind('w-10 h-10 bg-red-100 rounded-full items-center justify-center mb-6')}>
                    <Ionicons name="alert-circle" size={40} color="#EF4444" />
                </View>

                <Text style={tailwind('text-xl font-bold text-gray-800 text-center mb-3')}>
                    ¡Algo salio mal!
                </Text>

                <Text style={tailwind('text-gray-600 text-center mb-6')}>
                    {message}
                </Text>

                {onRetry && (
                    <TouchableOpacity
                        onPress={onRetry}
                        style={tailwind('bg-blue-500 py-3 px-6 rounded-lg w-full')}
                    >
                        <Text style={tailwind('text-white text-center font-semibold')}>
                            Intentar de nuevo
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default ErrorScreen;