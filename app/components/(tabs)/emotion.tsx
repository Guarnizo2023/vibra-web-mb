import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import ReproductorMedia from '../ui/ReproductorMedia';

interface EmotionScreenProps {
    //
}

export const EmotionScreen: React.FC<EmotionScreenProps> = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.content}>
                <ReproductorMedia />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default EmotionScreen;
