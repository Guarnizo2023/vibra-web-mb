import useActivityStore from '@/stores/activity.store';
import React, { useEffect } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, Text, StyleSheet, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import calculateScore, { calculateMaxScore } from '../../utils/scoreUtils';
import ErrorScreen from '../common/ErrorScreen';
import MediaPlayer from '../ui/MediaPlayer';
import ProgressBarII from '../ui/ProgressBarNew';
import { useDailyActivity, useSubmitResponse } from './queries/activity';
import QuestionSection from './QuestionSection';
import ScoreCounter from './ScoreCounter';
import { router } from 'expo-router';
import useUser from '@/context/UserContext';

const DailyActivityScreen = () => {
    const tailwind = useTailwind();
    const { user } = useUser();
    const { data, isLoading, error } = useDailyActivity();
    const { mutate } = useSubmitResponse();
    const { currentStep, responses, actions } = useActivityStore();
    const startTime = 60;

    const currentScore = calculateScore(responses as any);
    const maxScore = calculateMaxScore(data?.activity?.questions?.length || 0);

    useEffect(() => {
        if (data) {
            console.log("Data received:", data.activity);
            console.log("Current Step:", currentStep);
            //actions.reset();
        }
    }, [data]);

    const handleSubmit = async (answers: Record<string, string>) => {
        if (!data) return;

        console.log("Submitting response:", user);
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
        console.log("Submitting response:", responseDto);
        mutate(responseDto, {
            onSuccess: () => {
                if (currentStep === data.activity.questions?.length - 1) {
                    actions.reset();
                    Alert.alert('¡Respuestas enviadas!');
                    router.push('/components/(tabs)/one');
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

    return (
        <SafeAreaView style={tailwind("flex-1 p-2 bg-gray-50 w-full px-4")}>

            <View style={styles.container}>
                <View style={styles.headerContainer}>

                    <Text style={[{ fontSize: 20, textAlign: 'center' }, tailwind('mb-2 font-semibold')]}>Emoción: {data.activity.emotion?.name}</Text>
                    <ProgressBarII total={data.activity.resources?.length} current={currentStep} />
                </View>
                <View style={styles.listContainer}>
                    <MediaPlayer
                        resource={data.activity.resources[currentStep]}
                        onComplete={() => currentStep < data.activity.resources?.length - 1 &&
                            actions.nextStep()}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <QuestionSection
                        questions={data.activity.questions[currentStep]}
                        onSubmit={handleSubmit}
                    />
                    <ScoreCounter
                        currentScore={currentScore}
                        maxScore={maxScore}
                    />
                </View>
            </View>
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
    },
    buttonContainer: {
        padding: 4,
        elevation: 8,
    },
});

export default DailyActivityScreen;