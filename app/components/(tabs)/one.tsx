// app/(tabs)/one.tsx
import useAuth from '@/hooks/useAuth';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { mockDashboardData } from '../../../utils/mockData';
import CardComponent from '../ui/CardComponent';
import UserRankingList from '../users/UserRankingList';
import UploadFile from '../ui/UploadFile';

export default function TabOne() {
    const tailwind = useTailwind();
    const { logout } = useAuth();
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={tailwind('text-lg mb-4')}>Bienvenido Ermes</Text>
            {/*<Text>Datos mockeados: {mockDashboardData.tabOne}</Text>
            <UploadFile />*/}

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
                <CardComponent />
            </View>
            <TouchableOpacity
                style={tailwind('w-full bg-red-500 p-3 rounded-md items-center mt-30')}
                onPress={logout}
                disabled={false}
            >
                <Text style={tailwind('text-white font-bold text-center')}>
                    {'Cerrar sesión'}
                </Text>
            </TouchableOpacity>

        </View>
    );
}