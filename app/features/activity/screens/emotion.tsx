import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import ReproductorMedia from '../../../shared/components/media/ReproductorMedia';
import RankingScreen from '../../../shared/components/ui/RankingScreen';
import DailyActivityScreen from './DailyActivityScreen';
import MediaPlayer from '../../../shared/components/media/MediaPlayer';
import ActivityHistoryList from './ActivityHistoryList';

interface EmotionScreenProps {
    //
}

export const EmotionScreen: React.FC<EmotionScreenProps> = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.content}>
                {false && <ReproductorMedia />}
                <DailyActivityScreen />
                {false && <ActivityHistoryList />}
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
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 32,
    },
});

export default EmotionScreen;
