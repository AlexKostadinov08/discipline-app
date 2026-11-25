import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import FormInput from '../../components/FormInput';
import PrimaryButton from '../../components/PrimaryButton';
import { hasErrors, validateEmail } from '../../utils/validators';
import { colors } from '../../constants/theme';

function validate(values) {
    return {
        email: validateEmail(values.email),
        password: values.password ? null : 'Password is required',
    };
}

export default function LoginScreen({ navigation }) {
    const { login } = useAuth();

    const [values, setValues] = useState({ email: '', password: '' });
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
            await login(values.email, values.password);
        } catch (err) {
            setServerError(err.message);
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={styles.title}>Discipline</Text>
                    <Text style={styles.subtitle}>No photo, no finished task.</Text>

                    <FormInput
                        label="Email"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        error={errors.email}
                        placeholder="name@example.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                    />

                    <FormInput
                        label="Password"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        error={errors.password}
                        placeholder="Your password"
                        secureTextEntry
                        autoCapitalize="none"
                    />

                    {serverError ? <Text style={styles.serverError}>{serverError}</Text> : null}

                    <PrimaryButton title="Log in" onPress={handleSubmit} isLoading={isLoading} />

                    <Pressable onPress={() => navigation.navigate('Register')} style={styles.link}>
                        <Text style={styles.linkText}>
                            Don't have an account? <Text style={styles.linkAccent}>Sign up</Text>
                        </Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    flex: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 34,
        fontWeight: '800',
        color: colors.text,
    },
    subtitle: {
        fontSize: 16,
        color: colors.muted,
        marginTop: 6,
        marginBottom: 32,
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
