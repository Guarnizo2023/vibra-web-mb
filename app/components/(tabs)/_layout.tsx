import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
    return (
        <Tabs>
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
    );
}