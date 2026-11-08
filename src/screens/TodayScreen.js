import { StyleSheet, Text, View } from 'react-native';

export default function TodayScreen() {
  return (
    <View style={styles.container}>
      <Text>Днешните задачи</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
});
