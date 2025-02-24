import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Text, TouchableOpacity, View, Image } from 'react-native';

export default function TabsLayout() {
    return (
    <>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image 
                source={require('../../assets/logo-vibra.jpg')} 
                style={{ width: 200, height: 200 }} 
            />
            {/*<UserRankingList />*/}
        </View>
        <Tabs screenOptions={{
                tabBarPosition: 'top', // Esto posiciona las pestañas en la parte superior
                tabBarStyle: {
                backgroundColor: '#fff', // Color de fondo de la barra de pestañas
                },
                tabBarLabelStyle: {
                fontSize: 16, // Estilo de las etiquetas
                },
            }}>
            <Tabs.Screen
                name="one"
                options={{
                    title: 'Eventos',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="calendar-month" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="two"
                options={{
                    title: 'Retos',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="power" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="three"
                options={{
                    title: 'E-Personal',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="person" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    </>
    );
}