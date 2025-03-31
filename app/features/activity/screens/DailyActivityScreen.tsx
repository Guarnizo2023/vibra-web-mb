import useUser from '@/context/UserContext';
import useActivityStore from '@/shared/store/activity.store';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Animated, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import ErrorScreen from '../../../shared/components/common/ErrorScreen';
import MediaPlayer from '../../../shared/components/media/MediaPlayer';
import ProgressBarII from '../../../shared/components/ui/ProgressBarNew';
import calculateScore, { calculateMaxScore } from '../../../shared/utils/score-utils';
import MatchingConceptsGame from '../components/MatchingConceptsGame';
import QuestionSection from '../components/QuestionSection';
import ScoreCounter from '../components/ScoreCounter';
import WordSearchGame from '../components/WordSearchGame';
import { useDailyActivity, useSubmitResponse } from '../hooks/activity';

const DailyActivityScreen = () => {
    const tailwind = useTailwind();
    const { user } = useUser();
    const { data, isLoading, error } = useDailyActivity();
    const { mutate } = useSubmitResponse();
    const { currentStep, responses, activityType, actions } = useActivityStore();
    const startTime = 60;
    const [timeLeft, setTimeLeft] = useState(startTime);
    const currentScore = calculateScore(responses as any);
    const maxScore = calculateMaxScore(data?.activity?.questions?.length || 0);
    const [animate, setAnimate] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (animate) {
            Animated.timing(animation, {
                toValue: 1, // Valor final de la animación
                duration: 500, // Duración en milisegundos
                useNativeDriver: true, // Importante para rendimiento
            }).start(() => setAnimate(false)); // Reset al finalizar
        } else {
            Animated.timing(animation, {
                toValue: 0, // Regresa al valor inicial
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [animate, animation]);

    const escala = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.8], // Escala de 1 a 1.5
    });

    useEffect(() => {
        console.log("data received:", data);
        if (data) {
            console.log("Data received:", data.activity);
            console.log("Current Step:", currentStep);
            //actions.reset();
        }
    }, [data]);

    const handleSubmit = async (answers: Record<string, string>) => {
        if (!data) return;

        console.log("Submitting user:", user);
        const responseDto: any = {
            activityId: data.activity?._id,
            userId: user.id,
            answers: Object.entries(answers).map(([questionId, answer]) => ({
                questionId,
                answer,
                responseTime: Date.now() - startTime
            }))
        };

        //if (currentStep === data.activity.questions?.length - 1) {
        console.log("Submitting responseDto:", responseDto);
        mutate(responseDto, {
            onSuccess: () => {
                if (currentStep === data.activity.questions?.length - 1) {
                    actions.reset();
                    Alert.alert('¡Respuestas enviadas!');
                    //router.push('/features/(tabs)/one');
                    actions.nextActivityType();
                } else {
                    actions.nextStep();
                }
            },
            onError: () => Alert.alert('Error al enviar respuestas')
        });
        /* } else {
             actions.nextStep();
         }*/
    };

    if (isLoading) return <ActivityIndicator size="large" />;
    if (error) return <ErrorScreen message={error.message} />;

    if (!data || !data.activity) return <ErrorScreen onRetry={() => { router.back() }} message={'Por favor configure una actividad para el día!'} />;

    return (
        <SafeAreaView style={tailwind("flex-1 p-2 bg-gray-50 w-full px-4")}>
            <ScrollView contentContainerStyle={tailwind("flex-grow")} showsVerticalScrollIndicator={true}>
                <View style={styles.container}>
                    {activityType === 'Question' && <>
                        <View style={styles.headerContainer}>
                            <Text style={[{ fontSize: 20, textAlign: 'center' }, tailwind('mb-2 font-semibold')]}>Emoción: {data.activity?.emotion?.name}</Text>
                            <ProgressBarII total={data.activity?.resources?.length} current={currentStep} />
                        </View>
                        <View style={styles.listContainer}>
                            <MediaPlayer
                                resource={data.activity?.resources[currentStep]}
                                onComplete={() => currentStep < data.activity?.resources?.length - 1 &&
                                    actions.nextStep()}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <QuestionSection
                                questions={data.activity?.questions[currentStep]}
                                onSubmit={handleSubmit}
                            />
                            <ScoreCounter
                                currentScore={currentScore}
                                maxScore={maxScore}
                            />
                        </View>
                    </>}

                    {activityType === 'WordSearch' &&
                        <View style={[styles.gameContainer, tailwind('mt-4 mb-6')]}>
                            <Text style={[styles.gameTitle, tailwind('text-xl font-bold mb-2')]}>Sopa de Letras</Text>
                            <Text style={[styles.gameDescription, tailwind('text-sm mb-4')]}>Encuentra todas las palabras ocultas en la cuadrícula para ganar puntos.</Text>
                            <WordSearchGame
                                words={['ESPERANZA', 'HONESTO', 'AMOR', 'EMPATIA', 'VIBRA', 'HUMILDAD']}
                                gridSize={9}
                                timeLimit={300}
                                activityId="word-search-activity"
                            />
                        </View>}

                    {activityType === 'MatchingConcepts' &&
                        <View style={[styles.gameContainer, tailwind('mt-4 mb-6')]}>
                            <Text style={[styles.gameTitle, tailwind('text-xl font-bold mb-2')]}>Emparejar conceptos</Text>
                            <Text style={[styles.gameDescription, tailwind('text-sm mb-4')]}>Relaciona cada concepto con su definición correspondiente para ganar puntos.</Text>
                            <MatchingConceptsGame
                                conceptPairs={[
                                    { id: '1', concept: 'Vibra', match: 'App para captura de emociones' },
                                    { id: '2', concept: 'Actividad', match: 'Accion para medir emociones' },
                                    { id: '3', concept: 'Reto', match: 'Competencias de emociones' },
                                    { id: '4', concept: 'EPersonal', match: 'Eventos personales' },
                                    { id: '5', concept: 'Ranking', match: 'Nivel entre la comunidad' },
                                ]}
                                timeLimit={180}
                                activityId="matching-concepts-activity"
                            />
                        </View>}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
    },
    headerContainer: {
        paddingVertical: 4,
        elevation: 4,
    },
    listContainer: {
        flex: 1,
        height: 220
    },
    buttonContainer: {
        padding: 4,
        elevation: 8,
    },
    gameContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    gameTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    gameDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    box: {
        width: 50,
        height: 50,
        backgroundColor: 'tomato',
        borderRadius: 4,
    },
});

export default DailyActivityScreen;