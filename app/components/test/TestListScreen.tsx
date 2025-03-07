import { useUser } from '@/context/UserContext';
import api from '@/services/api';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, List } from "react-native-paper";
import { useTailwind } from "tailwind-rn";
import CustomButton from "../ui/CustomButton";

const TESTS = [
    { id: "1", title: "Test de personalidad", description: "Test de ... ", started: true },
    { id: "2", title: "Test de tecnologia", description: "Test de conocimientos tecnológicos", started: false },
    { id: "3", title: "Test de cultura general", description: "Test de cultura general", started: false },
];

const TestListScreen = () => {
    const { user } = useUser();
    const tailwind = useTailwind();
    const [testList, setTestList] = useState<any[]>([]);
    const [results, setResults] = useState<any[]>([]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const response = await api.get('/pretest/search/user/' + user?.id, {
                    params: {
                        userId: user?.id,
                    },
                });
                console.log(response.data);
                if (response) {
                    setResults(response.data);
                    const newTestList = TESTS.map((test) => {
                        const result = response.data.find((r: any) => r.testId === test.id);
                        return {
                            ...test,
                            started: !!result,
                        };
                    });
                    setTestList(newTestList);
                }
            } catch (error) {
                console.error('Error fetching test results:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [TESTS]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator animating={true} size="large" color="#4a90e2" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity>
                    <Image
                        source={require('../../assets/logo-vibra.png')}
                        style={[{ margin: 'auto', top: 30, alignItems: 'center', width: 100, height: 100, marginVertical: 'auto' }, tailwind('rounded-t-lg')]}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <View style={tailwind('p-5 m-6')}>
                    <TouchableOpacity>
                        <Text style={tailwind('mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white')}>
                            Tests para Vibra
                        </Text>
                    </TouchableOpacity>
                    <Text style={tailwind('mb-3 font-normal text-lg')}>
                        Muestra tu vibra inicial a traves de estos sencillos test de emotividad.
                    </Text>
                    <TouchableOpacity
                        style={tailwind('inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800')}
                    >
                        <Text style={tailwind('text-white')}>Leer mas acerca de los test en vibra</Text>
                        {/*<Image
                            source={require('../../assets/favicon.png')}
                            style={tailwind('w-3.5 h-3.5 ms-2 rtl:rotate-180')}
                        />*/}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={testList}
                    style={tailwind('max-w-full mx-2 my-6 rounded-lg')}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <List.Item
                            style={{ marginInline: 26, marginBottom: 6, padding: 4, backgroundColor: "#f0f0f0", borderRadius: 8 }}
                            title={item.title}
                            right={() => (<>
                                {!item.started && <Button mode="contained"
                                    style={{ backgroundColor: "#007AFF", paddingTop: 2, borderRadius: 8, alignItems: 'center', justifyContent: 'center', height: 42, width: 80 }}
                                    onPress={() => router.push({
                                        pathname: "/components/test/TestModalScreen",
                                        params: { testId: item.id }
                                    })}>
                                    <Ionicons style={{ paddingTop: 10 }} name="play-circle-outline" size={24} color="white" />
                                </Button>}
                                {item.started &&
                                    <Button mode="contained"
                                        style={{ backgroundColor: "green", paddingTop: 2, borderRadius: 8, alignItems: 'center', justifyContent: 'center', height: 42, width: 80 }}
                                        onPress={() => router.push({
                                            pathname: "/components/test/TestResultsListScreen",
                                            params: { testId: item.id }
                                        })}>
                                        <FontAwesome style={{ paddingTop: 10 }} name="check-square-o" size={24} color="white" />
                                    </Button>
                                }
                            </>
                            )}
                        />
                    )}
                />
            </View>
            <View style={styles.buttonContainer}>
                <View>
                    <CustomButton
                        style={{ fontSize: 22 }}
                        title="Continuar"
                        variantColor="red"
                        onPress={() => router.push("/components/(tabs)/one")}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 8,
    },
    headerContainer: {
        paddingVertical: 10,
        elevation: 4,
    },
    header: {
        color: 'white',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    listContainer: {
        flex: 1,
    },
    listContent: {
        padding: 16,
    },
    card: {
        marginBottom: 12,
        borderRadius: 12,
        elevation: 2,
        backgroundColor: 'white',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        padding: 16,
        maxHeight: 100,
        elevation: 4,
    },
});

export default TestListScreen;
