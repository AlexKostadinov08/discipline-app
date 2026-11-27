import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import TodayStack from './TodayStack';
import TasksStack from './TaskStack';
import ProfileScreen from '../screens/ProfileScreen';
import { colors } from '../constants/theme';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
    TodayTab: ['today', 'today-outline'],
    TasksTab: ['checkbox', 'checkbox-outline'],
    ProfileTab: ['person', 'person-outline'],
};

export default function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.accent,
                tabBarInactiveTintColor: colors.muted,
                tabBarIcon: ({ focused, color, size }) => {
                    const [filled, outline] = TAB_ICONS[route.name];
                    return <Ionicons name={focused ? filled : outline} size={size} color={color} />;
                },
            })}
        >
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
