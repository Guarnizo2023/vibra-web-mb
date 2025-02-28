import useAuth from '@/hooks/useAuth';
import { MaterialIcons } from '@expo/vector-icons';
import { Tabs, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import CustomButton from '../ui/CustomButton';
import SearchInput from '../ui/SearchInput';
import { useState } from 'react';
const mainLogo = require('../../assets/logo-vibra.png');

interface Event {
    id: number;
    title: string;
    date: string;
    location: string;
}

const sampleEvents: Event[] = [
    { id: 1, title: "Conferencia de Innovación", date: "2024-02-15", location: "Auditorio Principal" },
    { id: 2, title: "Taller de Liderazgo", date: "2024-02-20", location: "Sala 201" },
    { id: 3, title: "Seminario de Desarrollo", date: "2024-02-25", location: "Sala Virtual" },
    { id: 4, title: "Encuentro de Networking", date: "2024-03-01", location: "Terraza" },
];

export default function TabsLayout() {
    const tailwind = useTailwind();
    const { logout } = useAuth();
    const pathname = usePathname();
    const [filteredEvents, setFilteredEvents] = useState<Event[]>(sampleEvents);

    const getTabStyle = (tabName: string) => {
        const isStart = pathname.includes(tabName);
        return {
            borderStartStartRadius: 10,
            borderStartEndRadius: 10,
            borderTopStartRadius: 10,
            borderTopLeftRadius: 10,
            marginTop: Platform.OS == 'ios' ? -4 : 0,
            paddingTop: Platform.OS == 'ios' ? -10 : 0,
            marginBottom: Platform.OS == 'ios' ? -10 : 0,
        };
    };

    const getTabTextStyle = (tabName: string) => {
        console.log('pathname:', pathname);
        const isSelected = pathname.includes(tabName);
        return {
            color: isSelected ? '#0066CC' : '#666666',
            fontSize: 14,
        };
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar style={Platform.OS == 'android' ? 'dark' : 'inverted'} backgroundColor='#EAEAEA' />
            <View style={{ flexDirection: Platform.OS == 'ios' || Platform.OS == 'android' ? 'row' : 'column', alignItems: 'center', padding: 10 }}>
                <Image
                    source={mainLogo}
                    style={{ width: 100, height: 100, marginTop: Platform.OS == 'android' ? 40 : 16 }}
                />
                <Text style={[{ paddingLeft: 10, paddingTop: Platform.OS == 'ios' || Platform.OS == 'android' ? 25 : 0 }, tailwind("text-6xl text-white")]}> Vibra </Text>
                {Platform.OS == 'ios' || Platform.OS == 'android' && <Text style={[{ paddingRight: -10, paddingTop: 50, fontStyle: 'italic', color: '#EAEAEA' }, tailwind("text-xl text-white")]}> Emociones </Text>}
            </View>
            <View style={{ marginHorizontal: 20 }} >
                <SearchInput
                    data={sampleEvents}
                    onSearch={setFilteredEvents}
                    searchKey="title"
                    placeholder="Buscar eventos..."
                    containerStyle={{ backgroundColor: '#ffffff', borderRadius: 10 }}
                />
            </View>
            <Tabs screenOptions={{
                tabBarPosition: 'top',
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    width: '90%',
                    height: 64,
                    marginInline: 'auto',
                    //borderStartStartRadius: 10,
                    //borderStartEndRadius: 10,
                    borderTopStartRadius: 10,
                    borderTopEndRadius: 10,
                    //borderTopLeftRadius: 10,
                    marginTop: Platform.OS == 'ios' ? -4 : 0,
                    paddingTop: Platform.OS == 'ios' ? -10 : 0,
                    marginBottom: Platform.OS == 'ios' ? -10 : 0,
                },
                tabBarIconStyle: {
                    marginBottom: Platform.OS == 'ios' ? -2 : 0,
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    marginTop: 0
                },
                tabBarActiveTintColor: '#0066CC',
                tabBarInactiveTintColor: '#666666',
                tabBarActiveBackgroundColor: '#EAEAEA',
                headerStyle: {
                    backgroundColor: '#EAEAEA',
                    /*shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 3,*/
                    height: 80,
                    borderBottomColor: '#EAEAEA',
                },
                headerTitleStyle: {
                    fontSize: Platform.OS == "android" ? 30 : 18,
                    fontWeight: 'bold',
                    marginLeft: (() => {
                        if (Platform.OS === "android") return 30;
                        if (Platform.OS === "ios") return -30;
                        return 0;
                    })(),
                    marginTop: Platform.OS == "android" ? -36 : 0,
                },
                headerRight: () => (
                    <CustomButton title="Desconectar" variantColor="red" onPress={logout} />
                ),
            }}>
                <Tabs.Screen
                    name="one"
                    options={{
                        title: 'Eventos',
                        tabBarLabelStyle: getTabTextStyle('/components/one'),
                        tabBarItemStyle: {
                            borderTopStartRadius: 10,
                            //borderTopLeftRadius: 10,
                            //borderStartStartRadius: 10,
                        },
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons name="calendar-month" size={24} color={color} />
                        ),
                        /*headerLeft: () => (
                            <CustomButton title="Vibrar" onPress={logout} />
                        ),*/
                    }}
                />
                <Tabs.Screen
                    name="two"
                    options={{
                        title: 'Retos',
                        tabBarLabelStyle: getTabTextStyle('/components/two'),
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons name="power" size={24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="three"
                    options={{
                        title: 'E-Personal',
                        tabBarLabelStyle: getTabTextStyle('/components/three'),
                        tabBarItemStyle: {
                            borderTopEndRadius: 10,
                        },
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons name="person" size={24} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </View >
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        top: 0,
        paddingHorizontal: 8,
        width: 120,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});