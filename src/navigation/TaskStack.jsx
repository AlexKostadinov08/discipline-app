import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TasksScreen from '../screens/TasksScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';
import TaskFormScreen from '../screens/TaskFormScreen';
import ProofScreen from '../screens/ProofScreen';

const Stack = createNativeStackNavigator();

export default function TasksStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TasksList" component={TasksScreen} options={{ title: 'My Tasks' }} />
            <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} options={{ title: 'Task' }} />
            <Stack.Screen name="TaskForm" component={TaskFormScreen} options={{ title: 'Task' }} />
            <Stack.Screen name="Proof" component={ProofScreen} options={{ title: 'Proof' }} />
        </Stack.Navigator>
    );
}