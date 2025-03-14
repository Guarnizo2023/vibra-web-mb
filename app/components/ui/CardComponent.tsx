import { useUser } from '@/context/UserContext';
import { useCurrentDate } from '@/hooks/currentDate';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import CustomButton from './CustomButton';

const CardComponent = ({ emotion: any }: any) => {
  const { user } = useUser();
  const router = useRouter();
  const tailwind = useTailwind();
  const currentDate = useCurrentDate();

  return (
    <View style={tailwind('w-full p-2 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-white dark:border-gray-400')}>
      <View style={{ alignItems: 'center', padding: 10 }}>
        <Text style={tailwind('text-xl font-bold text-gray-600 mb-4')}>
          {currentDate}
        </Text>
        <Image
          source={require('../../assets/sponsors/menu_emotions.png')}
          style={[{ width: 200, height: 200 }, tailwind('align-center text-gray-500 dark:text-gray-400 mb-3 justify-center')]}
        />
      </View>
      <Text style={tailwind('mb-3 font-normal text-gray-500 dark:text-gray-400 px-3')}>
        ¿Que tal tu dia! ¿Como te sientes hoy? Enseñanos tus emociones y asi podemos ayudarte a equilibrar tu salud mental.
      </Text>
      <CustomButton
        style={{ fontSize: 22 }}
        title="Iniciar actividad diaria"
        variantColor="red"
        onPress={() => router.push("/components/(tabs)/emotion")}
      />
    </View>
  );
};

export default CardComponent;