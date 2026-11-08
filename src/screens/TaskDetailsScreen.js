import { StyleSheet, Text, View } from 'react-native';

export default function TaskDetailsScreen({ route }) {
    const { taskId } = route.params;

    return (
        <View style={styles.container}>
            <Text>Детайли на задача: {taskId}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
});