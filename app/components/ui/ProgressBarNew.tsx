import React from 'react';
import { View, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export const ProgressBarII = ({ total, current }: any) => {

    const tailwind = useTailwind();
    const progress = (current / total) * 100;

    return (
        <View style={tailwind("mb-4 mx-4")}>
            <View style={tailwind("w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner")}>
                <View
                    style={[{ width: `${progress}%` }, tailwind("h-full bg-blue-500 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 ease-in-out")]}
                />
            </View>
            <Text style={tailwind("text-sm text-gray-600 mt-2 text-center")}>
                Pregunta {current + 1} de {total}
            </Text>
        </View>
    );
};

/*
<View style={tailwind("flex flex-col items-center mb-6")}>
<View style={tailwind("w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner")}>
    <View
        style={[
            { width: `${progress}%` },
            tailwind("h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-300 ease-in-out transform hover:scale-x-[1.02]")
        ]}
    />
</View>
<Text style={tailwind("text-sm font-medium text-gray-600 mt-2 text-center")}>
    Paso {current + 1} de {total}
</Text>
</View>
*/