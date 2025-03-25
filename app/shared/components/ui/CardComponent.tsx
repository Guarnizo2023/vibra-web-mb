import useUser from '@/context/UserContext';
import useCurrentDate from '@/shared/hooks/currentDate';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import CustomButton from './CustomButton';
import ProgressBarVibra from './ProgressBar';
import ActivityHistoryList from '@/features/activity/screens/ActivityHistoryList';

const CardComponent = ({ emotion }: any) => {
  const { user } = useUser();
  const router = useRouter();
  const tailwind = useTailwind();
  const currentDate = useCurrentDate();
  const [historyActivate, setHistoryActivate] = React.useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <View style={tailwind('w-full p-2 bg-white rounded-lg shadow-sm dark:bg-white')}>
      {!historyActivate && <>
        <View style={{ alignItems: 'center', padding: 10 }}>
          <Text style={tailwind('text-xl font-bold text-gray-600 mb-4')}>
            {currentDate}
          </Text>
          <Image
            source={require('../../../assets/sponsors/menu_emotions.png')}
            style={[{ width: 200, height: 200 }, tailwind('align-center text-gray-500 dark:text-gray-400 mb-3 justify-center')]}
          />
        </View>
        <Text style={tailwind('font-bold text-lg text-gray-500 dark:text-gray-400 px-4')}>Hola {user.username}</Text>
        <Text style={tailwind('mb-3 font-normal text-lg text-gray-500 dark:text-gray-400 p-4')}>
          ¿Que tal tu dia! ¿Como te sientes hoy? Enseñanos tus emociones y asi podemos ayudarte a equilibrar tu salud mental.
        </Text>

        <ProgressBarVibra />

        <View style={tailwind('flex-row justify-between items-center mt-4 w-full')}>
          <CustomButton
            neonEffect={true}
            title={loading ? 'Cargando...' : 'Actividad diaria'}
            variantColor='blue'
            onPress={() => {
              router.push("/features/activity/screens/emotion");
            }}
            icon='play-arrow'
            disabled={loading}
            style={tailwind('text-xl text-white')}
          />
          <CustomButton
            neonEffect={true}
            title={loading ? 'Cargando...' : 'Historial'}
            variantColor='green'
            onPress={() => {
              setHistoryActivate(true);
            }}
            icon='history'
            disabled={loading}
            style={tailwind('text-xl text-white')}
          />
        </View>
      </>
      }
      {historyActivate && <>
        <Text style={tailwind('font-bold text-lg text-gray-500 dark:text-gray-400 px-4')}>Hola {user.username}</Text>
        <Text style={tailwind('mb-3 font-normal text-lg text-gray-500 dark:text-gray-400 p-4')}>
          Tu historial de emociones.
        </Text>
        <ActivityHistoryList />
      </>}
    </View>
  );
};

export default CardComponent;