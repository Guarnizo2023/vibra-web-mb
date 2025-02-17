import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const CardComponent = ({ emotion: any} : any) => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700')}>
      {/* Icono SVG (reemplazado por una imagen local o remota) */}
      <Image
        source={require('../../assets/favicon.png')} // Cambia la ruta a tu ícono SVG
        style={tailwind('w-7 h-7 text-gray-500 dark:text-gray-400 mb-3 justify-center')}
      />

      {/* Título */}
      <TouchableOpacity>
        <Text style={tailwind('mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white')}>
          Emoción de la Alegria
        </Text>
      </TouchableOpacity>

      {/* Descripción */}
      <Text style={tailwind('mb-3 font-normal text-gray-500 dark:text-gray-400')}>
        Go to this step by step guideline process on how to certify for your weekly benefits:
      </Text>

      {/* Enlace */}
      <TouchableOpacity style={tailwind('inline-flex font-medium items-center text-blue-600 hover:underline')}>
        <Text style={tailwind('text-blue-600')}>Continue con la actividad!</Text>
        {/* Icono SVG (reemplazado por una imagen local o remota) */}
        <Image
          source={require('../../assets/favicon.png')} // Cambia la ruta a tu ícono SVG
          style={tailwind('w-3 h-3 ms-2.5 rtl:rotate-[270deg]')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CardComponent;