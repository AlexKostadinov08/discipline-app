import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodayStack from './TodayStack';
import TasksStack from './TaskStack';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="TodayTab" component={TodayStack} options={{ title: 'Today' }} />
            <Tab.Screen name="TasksTab" component={TasksStack} options={{ title: 'Tasks' }} />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileScreen}
                options={{ title: 'Profile', headerShown: true }}
            />
        </Tab.Navigator>
    );
}