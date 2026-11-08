// TodayStack.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodayScreen from '../screens/TodayScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';
import ProofScreen from '../screens/ProofScreen';

const Stack = createNativeStackNavigator();

export default function TodayStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Today" component={TodayScreen} options={{ title: 'Днес' }} />
      <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} options={{ title: 'Задача' }} />
      <Stack.Screen name="Proof" component={ProofScreen} options={{ title: 'Доказателство' }} />
    </Stack.Navigator>
  );
}