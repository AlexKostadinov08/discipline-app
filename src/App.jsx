import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './contexts/AuthContext';
import RootNavigator from './navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <GestureHandlerRootView>
                    <NavigationContainer>
                        <RootNavigator />
                    </NavigationContainer>
                </GestureHandlerRootView>
            </AuthProvider>
            <StatusBar style="dark" />
        </SafeAreaProvider>
    );
}
