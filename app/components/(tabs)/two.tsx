import { Text, View } from 'react-native';
import { mockDashboardData } from '../../../utils/mockData';
import BlogCard from '../ui/BlogCard';
import UserRankingList from '../users/UserRankingList';
import ActivityHistoryList from '../activity/ActivityHistoryList';

export default function TabTwo() {
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text>Bienvenido al Dashboard</Text>
            <Text>Datos mockeados: {mockDashboardData.tabOne}</Text>
            <ActivityHistoryList />
            {/*<UserRankingList />*/}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
                {/*<BlogCard />*/}
            </View>
        </View>
    );
}