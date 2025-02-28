import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const CardComponent = ({ emotion: any }: any) => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('w-full p-2 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-white dark:border-gray-400')}>
      <View style={{ alignItems: 'center', padding: 10 }}>
        <Image
          source={require('../../assets/emotions.png')}
          style={[{ width: 200, height: 200 }, tailwind('align-center text-gray-500 dark:text-gray-400 mb-3 justify-center')]}
        />
      </View>
      {/*<TouchableOpacity>
        <Text style={tailwind('mb-2 text-2xl font-semibold tracking-tight text-gray-900')}>
          Emociónes
        </Text>
      </TouchableOpacity>*/}
      <Text style={tailwind('mb-3 font-normal text-gray-500 dark:text-gray-400 px-3')}>
        ¿Que tal tu dia! ¿Como te sientes hoy? Enseñanos tus emociones y asi podemos ayudarte a equilibrar tu salud mental.
      </Text>
      <TouchableOpacity style={tailwind('flex inline-flex font-medium items-center text-blue-600 hover:underline text-center')}>
        <Text style={tailwind('text-blue-600')}>Continuar con la actividad!</Text>
        <Image
          source={require('../../assets/logo-vibra.png')}
          style={tailwind('w-4 h-4 ms-2.5 rtl:rotate-[270deg]')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CardComponent;