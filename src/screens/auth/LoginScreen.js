import { Button, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../services/supabase';

export default function LoginScreen({ navigation }) {
  // ВРЕМЕННО - сменяме го с истинска форма в следващата сесия
  const testLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'test@test.com',
      password: 'asdasd',
    });
    if (error) alert(error.message);
  };

  return (
    <View style={styles.container}>
      <Text>Вход</Text>
      <Button title="Тестов вход" onPress={testLogin} />
      <Button title="Нямам акаунт" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
});
