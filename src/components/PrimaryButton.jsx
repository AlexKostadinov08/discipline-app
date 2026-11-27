import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../constants/theme';

export default function PrimaryButton({
    title,
    onPress,
    isLoading = false,
    disabled = false,
    variant = 'primary',
}) {
    const isDisabled = disabled || isLoading;
    const isOutline = variant === 'outline';

    return (
        <Pressable
            onPress={onPress}
            disabled={isDisabled}
            style={({ pressed }) => [
                styles.button,
                variant === 'danger' && styles.danger,
                isOutline && styles.outline,
                pressed && styles.pressed,
                isDisabled && styles.disabled,
            ]}
        >
            {isLoading ? (
                <ActivityIndicator color={isOutline ? colors.primary : colors.onPrimary} />
            ) : (
                <Text style={[styles.text, isOutline && styles.outlineText]}>{title}</Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
    },
    danger: {
        backgroundColor: colors.danger,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: colors.primary,
    },
    pressed: {
        opacity: 0.85,
    },
    disabled: {
        opacity: 0.6,
    },
    text: {
        color: colors.onPrimary,
        fontSize: 16,
        fontWeight: '700',
    },
    outlineText: {
        color: colors.primary,
    },
});
