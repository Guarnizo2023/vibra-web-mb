// app/(tabs)/one.tsx
import { View, Text } from 'react-native';
import { mockDashboardData } from '../../../utils/mockData';
import CalendarComponent from '../ui/CalendarComponent';

export default function TabTwo() {
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text>Bienvenido al Dashboard</Text>
            <Text>Datos mockeados: {mockDashboardData.tabOne}</Text>
            <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
                <CalendarComponent />
            </View>
        </View>
    );
}