import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodayStack from './TodayStack';
import TasksStack from './TaskStack';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="TodayTab" component={TodayStack} options={{ title: 'Днес' }} />
      <Tab.Screen name="TasksTab" component={TasksStack} options={{ title: 'Задачи' }} />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ title: 'Профил', headerShown: true }}
      />
    </Tab.Navigator>
  );
}