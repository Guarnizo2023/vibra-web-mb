import React from 'react';
import { FlatList, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useActivities } from './queries/activity';
import { useTailwind } from 'tailwind-rn';
import EmotionBadge from './EmotionBadge';

export const ActivityHistoryList = () => {
    const tailwind = useTailwind();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, error, isLoading } = useActivities();

    if (isLoading) {
        return (
            <View style={tailwind("flex-1 justify-center items-center")}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (isError) {
        return (
            <View style={tailwind("flex-1 justify-center items-center")}>
                <Text style={tailwind("text-red-500")}>Error: {error?.message || 'Something went wrong'}</Text>
            </View>
        );
    }

    const activities = data?.docs.flatMap((page: any) => page) || [];

    return (
        <FlatList
            data={activities}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
                <TouchableOpacity style={tailwind("p-4 bg-white mb-2 rounded-lg shadow-sm")}>
                    <View style={tailwind("flex-row justify-between items-center")}>
                        <EmotionBadge emotion={item.emotion?.name} />
                        <Text style={tailwind("text-gray-500")}>{new Date(item.createdAt).toLocaleDateString()}</Text>
                    </View>
                    <Text style={tailwind("text-lg font-semibold mt-2")}>{item.title}</Text>
                    <View style={tailwind("flex-row mt-2")}>
                        <Text style={tailwind("text-blue-500")}>{item.resources.length} {item.resources.length === 1 ? 'recurso' : 'recursos'} </Text>
                        <Text style={tailwind("ml-4 text-green-600")}>{item.questions.length} {item.questions.length === 1 ? 'pregunta' : 'preguntas'}</Text>
                    </View>
                </TouchableOpacity>
            )}
            onEndReached={() => hasNextPage && fetchNextPage()}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => isFetchingNextPage && <ActivityIndicator />}
        />
    );
};