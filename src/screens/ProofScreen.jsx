import { StyleSheet, Text, View } from 'react-native';
import CameraDemo from '../components/CameraDemo';

export default function ProofScreen() {
    return (
        <View style={styles.container}>
            <Text>Photo proof</Text>
            <CameraDemo />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
});
