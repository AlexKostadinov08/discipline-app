import { StyleSheet, Text, View } from 'react-native';

export default function TaskFormScreen() {
  return (
    <View style={styles.container}>
      <Text>Форма за задача</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
});
