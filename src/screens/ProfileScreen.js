import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../constants/theme';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Името идва от user_metadata, което записахме при регистрацията
  const username = user?.user_metadata?.username ?? 'Без име';

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
    } catch (err) {
      setIsLoading(false);
      Alert.alert('Грешка', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <View style={styles.buttonWrapper}>
        <PrimaryButton title="Изход" onPress={handleLogout} isLoading={isLoading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background,
  },
  username: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
  },
  email: {
    fontSize: 15,
    color: colors.muted,
    marginTop: 4,
  },
  buttonWrapper: {
    marginTop: 32,
  },
});
