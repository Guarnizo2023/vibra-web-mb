import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

interface ScoreCounterProps {
    currentScore: number;
    maxScore?: number;
}

const ScoreCounter: React.FC<ScoreCounterProps> = ({
    currentScore,
    maxScore = 1000
}) => {
    const animatedValue = React.useRef(new Animated.Value(currentScore)).current;
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Animación del número
        Animated.timing(animatedValue, {
            toValue: currentScore,
            duration: 800,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
        }).start();

        // Animación de escala
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.2,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, [currentScore]);

    const progress = animatedValue.interpolate({
        inputRange: [0, maxScore],
        outputRange: [0, 1],
    });

    return (
        <View style={styles.container}>
            <View style={styles.scoreContainer}>
                <Animated.Text style={[styles.scoreText, { transform: [{ scale: scaleAnim }] }]}>
                    {animatedValue.interpolate({
                        inputRange: [0, maxScore],
                        outputRange: ['0', maxScore.toString()],
                    })}
                </Animated.Text>
                <Text style={styles.maxScoreText}>/{maxScore}</Text>
            </View>

            <View style={styles.progressBar}>
                <Animated.View
                    style={[styles.progressFill, {
                        transform: [{ scaleX: progress }],
                        transformOrigin: 'left'
                    }]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 6,
        marginVertical: 8,
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 4,
    },
    scoreText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginRight: 4,
    },
    maxScoreText: {
        fontSize: 16,
        color: '#888',
    },
    progressBar: {
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4CAF50',
    },
});

export default ScoreCounter;