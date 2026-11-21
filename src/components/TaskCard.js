import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getCategoryLabel } from '../constants/categories';
import { formatDate } from '../utils/dates';
import { colors } from '../constants/theme';

export default function TaskCard({ task, onPress }) {
    const schedule = task.is_daily
        ? 'Всеки ден'
        : task.deadline
            ? `Срок: ${formatDate(task.deadline)}`
            : 'Без срок';

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.card,
                !task.is_active && styles.inactive,
                pressed && styles.pressed,
            ]}
        >
            <View style={styles.row}>
                <Text style={styles.category}>{getCategoryLabel(task.category)}</Text>
                {!task.is_active ? <Text style={styles.paused}>На пауза</Text> : null}
            </View>

            <Text style={styles.title} numberOfLines={2}>
                {task.title}
            </Text>

            <View style={styles.row}>
                <Text style={styles.meta}>{schedule}</Text>
                <Text style={styles.meta}>Трудност {task.difficulty}/5</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        padding: 16,
        gap: 8,
    },
    inactive: {
        opacity: 0.55,
    },
    pressed: {
        opacity: 0.8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    category: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.accent,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    paused: {
        fontSize: 12,
        color: colors.muted,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        color: colors.text,
    },
    meta: {
        fontSize: 13,
        color: colors.muted,
    },
});
