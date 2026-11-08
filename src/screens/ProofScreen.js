import { StyleSheet, Text, View } from 'react-native';

export default function ProofScreen() {
  return (
    <View style={styles.container}>
      <Text>Снимка-доказателство</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
});
