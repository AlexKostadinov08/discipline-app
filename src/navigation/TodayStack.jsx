import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodayScreen from '../screens/TodayScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';
import TaskFormScreen from '../screens/TaskFormScreen';
import ProofScreen from '../screens/ProofScreen';

const Stack = createNativeStackNavigator();

export default function TodayStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Today" component={TodayScreen} options={{ title: 'Today' }} />
            <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} options={{ title: 'Task' }} />
            <Stack.Screen name="TaskForm" component={TaskFormScreen} options={{ title: 'Task' }} />
            <Stack.Screen name="Proof" component={ProofScreen} options={{ title: 'Proof' }} />
        </Stack.Navigator>
    );
}