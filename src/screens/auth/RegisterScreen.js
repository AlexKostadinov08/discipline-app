import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import FormInput from '../../components/FormInput';
import PrimaryButton from '../../components/PrimaryButton';
import {
  hasErrors,
  validateEmail,
  validatePassword,
  validateRepeatPassword,
  validateUsername,
} from '../../utils/validators';
import { colors } from '../../constants/theme';

function validate(values) {
  return {
    username: validateUsername(values.username),
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    repeatPassword: validateRepeatPassword(values.password, values.repeatPassword),
  };
}

const INITIAL_VALUES = {
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
};

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();

  const [values, setValues] = useState(INITIAL_VALUES);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const errors = submitted ? validate(values) : {};

  const handleChange = (field) => (text) => {
    setValues((prev) => ({ ...prev, [field]: text }));
    setServerError(null);
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    if (hasErrors(validate(values))) return;

    setIsLoading(true);
    try {
      const isLoggedIn = await register(values.username, values.email, values.password);

      if (!isLoggedIn) {
        setIsLoading(false);
        Alert.alert('Почти готово', 'Потвърди имейла си и после влез.');
        navigation.navigate('Login');
      }
    } catch (err) {
      setServerError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.intro}>
          Създай акаунт и започни да доказваш, че държиш на думата си.
        </Text>

        <FormInput
          label="Потребителско име"
          value={values.username}
          onChangeText={handleChange('username')}
          error={errors.username}
          placeholder="например alex_08"
          autoCapitalize="none"
        />

        <FormInput
          label="Имейл"
          value={values.email}
          onChangeText={handleChange('email')}
          error={errors.email}
          placeholder="ime@primer.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <FormInput
          label="Парола"
          value={values.password}
          onChangeText={handleChange('password')}
          error={errors.password}
          placeholder="Поне 6 символа и една цифра"
          secureTextEntry
          autoCapitalize="none"
        />

        <FormInput
          label="Повтори паролата"
          value={values.repeatPassword}
          onChangeText={handleChange('repeatPassword')}
          error={errors.repeatPassword}
          placeholder="Същата парола"
          secureTextEntry
          autoCapitalize="none"
        />

        {serverError ? <Text style={styles.serverError}>{serverError}</Text> : null}

        <PrimaryButton title="Регистрация" onPress={handleSubmit} isLoading={isLoading} />

        <Pressable onPress={() => navigation.goBack()} style={styles.link}>
          <Text style={styles.linkText}>
            Имаш акаунт? <Text style={styles.linkAccent}>Влез</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  screen: {
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  intro: {
    fontSize: 15,
    color: colors.muted,
    marginBottom: 24,
  },
  serverError: {
    color: colors.danger,
    textAlign: 'center',
    marginBottom: 12,
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: colors.muted,
    fontSize: 15,
  },
  linkAccent: {
    color: colors.accent,
    fontWeight: '700',
  },
});
