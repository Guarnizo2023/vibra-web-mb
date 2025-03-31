import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Question from '../../../shared/types/activity';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '@/shared/components/ui/CustomButton';
import useActivityStore from '@/shared/store/activity.store';

interface QuestionSectionProps {
    questions: Question;
    onSubmit: (answers: Record<string, string>) => void;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({ questions, onSubmit }) => {
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
    const [openAnswer, setOpenAnswer] = useState('');
    const [error, setError] = useState('');
    const { actions } = useActivityStore();
    const startTime = Date.now();

    useEffect(() => {
        setSelectedAnswers({});
        setOpenAnswer('');
        setError('');
    }, [questions]);

    const handleSubmit = () => {
        if (questions?.type === 'open' && !openAnswer.trim()) {
            setError('Por favor escribe tu respuesta');
            return;
        }

        if (questions?.type === 'multiple' && !selectedAnswers[questions?.id!]) {
            setError('Por favor selecciona una respuesta');
            return;
        }

        const answers = questions?.type === 'multiple'
            ? selectedAnswers
            : { [questions?.id!]: openAnswer };

        const responseTime = (Date.now() - startTime) / 1000; // Convertir a segundos
        const isCorrect = questions?.type === 'multiple'
            ? selectedAnswers[questions?.id!] === questions?.correctAnswer
            : openAnswer.toLowerCase().trim() === questions?.correctAnswer?.toLowerCase().trim();

        actions.addResponse({
            questionId: questions?.id!,
            isCorrect,
            points: isCorrect ? 1 : 0,
            responseTime
        });

        console.log("Answers:", answers);
        onSubmit(answers);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Text style={styles.questionText}>{questions?.questionText}</Text>

            {questions?.type === 'multiple' ? (
                <View style={styles.optionsContainer}>
                    {questions?.options?.map((option: any, index: any) => (
                        <TouchableOpacity
                            key={index + 1}
                            style={[
                                styles.optionButton,
                                selectedAnswers[questions?.id!] === option && styles.selectedOption
                            ]}
                            onPress={() => setSelectedAnswers({ [questions?.id!]: option })}
                        >
                            <Text style={styles.optionText}>{option}...</Text>
                            {selectedAnswers[questions?.id!] === option && (
                                <Ionicons name="checkmark-circle" size={24} color="#4F46E5" />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            ) : (
                <TextInput
                    style={styles.input}
                    placeholder="Escribe tu respuesta aquí..."
                    multiline
                    numberOfLines={4}
                    value={openAnswer}
                    onChangeText={setOpenAnswer}
                    textAlignVertical="top"
                />
            )}

            {error ? <Text style={styles.errorText}><Ionicons style={{ top: 6 }} name="information-circle" size={22} color="red" /> {error}</Text> : null}

            <CustomButton
                title="Continuar"
                variantColor='blue'
                neonEffect={true}
                style={styles.submitButtonText}
                onPress={handleSubmit}
                icon="arrow-forward"
                disabled={questions?.type === 'multiple' && !selectedAnswers[questions?.id!]}
            />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        marginTop: 20,
    },
    questionText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        color: '#1F2937',
    },
    optionsContainer: {
        marginBottom: 20,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F3F4F6',
        padding: 10,
        borderRadius: 12,
        marginBottom: 12,
    },
    selectedOption: {
        backgroundColor: '#E0E7FF',
        borderWidth: 1,
        borderColor: '#4F46E5',
    },
    optionText: {
        fontSize: 16,
        color: '#1F2937',
        flex: 1,
    },
    input: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        marginBottom: 20,
        minHeight: 100,
        textAlignVertical: 'top',
    },
    submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3353E4FF',
        padding: 16,
        borderRadius: 12,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    },
    errorText: {
        color: '#EF4444',
        marginBottom: 14,
        textAlign: 'center',
    },
});

export default QuestionSection;