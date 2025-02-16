import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const BlogCard = () => {
    const tailwind = useTailwind();

    return (
        <View style={tailwind('max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700')}>
            {/* Imagen */}
            <TouchableOpacity>
                <Image
                    source={require('../../assets/bg-2.jpeg')} // Cambia la ruta a tu imagen
                    style={tailwind('w-full h-48 rounded-t-lg')}
                    resizeMode="cover"
                />
            </TouchableOpacity>

            {/* Contenido de la tarjeta */}
            <View style={tailwind('p-5')}>
                {/* Título */}
                <TouchableOpacity>
                    <Text style={tailwind('mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white')}>
                        Noteworthy technology acquisitions 2021
                    </Text>
                </TouchableOpacity>

                {/* Descripción */}
                <Text style={tailwind('mb-3 font-normal text-gray-700 dark:text-gray-400')}>
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                </Text>

                {/* Botón "Read more" */}
                <TouchableOpacity
                    style={tailwind('inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800')}
                >
                    <Text style={tailwind('text-white')}>Read more</Text>
                    {/* Icono SVG (reemplazado por una imagen local o remota) */}
                    <Image
                        source={require('../../assets/favicon.png')} // Cambia la ruta a tu ícono SVG
                        style={tailwind('w-3.5 h-3.5 ms-2 rtl:rotate-180')}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BlogCard;