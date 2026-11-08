import { Button, StyleSheet, Text, View } from 'react-native';

export default function TasksScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Списък със задачи</Text>
      <Button
        title="Отвори тестова задача"
        onPress={() => navigation.navigate('TaskDetails', { taskId: 'test-123' })}
      />
      <Button title="Нова задача" onPress={() => navigation.navigate('TaskForm')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
});