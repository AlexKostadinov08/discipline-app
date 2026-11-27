import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { deleteTask, getTaskById } from '../services/tasksService';
import { getCategoryLabel } from '../constants/categories';
import { formatDate } from '../utils/dates';

import { colors } from '../constants/theme';
import PrimaryButton from '../components/PrimaryButton';

export default function TaskDetailsScreen({ route, navigation }) {
    const { taskId } = route.params;
    const [task, setTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const loadTask = useCallback(async () => {
        try {
            setError(null);
            const data = await getTaskById(taskId);
            setTask(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [taskId]);

    useFocusEffect(
        useCallback(() => {
            loadTask();
        }, [loadTask])
    );

    const handleRetry = () => {
        setIsLoading(true);
        loadTask();
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteTask(taskId);
            navigation.goBack();
        } catch (err) {
            setIsDeleting(false);
            Alert.alert('Error', err.message);
        }
    };

    const confirmDelete = () => {
        Alert.alert(
            'Delete task',
            `"${task.title}" and all of its proofs will be deleted. This cannot be undone.`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: handleDelete },
            ]
        );
    };

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={colors.accent} />
                <Text style={styles.loadingText}>Loading task...</Text>
            </View>
        );
    }

    if (error && !task) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error}</Text>
                <PrimaryButton title="Try Again" onPress={handleRetry} />
            </View>
        );
    }

    const schedule = task.is_daily
        ? 'Every day'
        : task.deadline
            ? `Due ${formatDate(task.deadline)}`
            : 'No deadline';

    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
            <Text style={styles.category}>{getCategoryLabel(task.category)}</Text>
            <Text style={styles.title}>{task.title}</Text>

            <View style={styles.badges}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{schedule}</Text>
                </View>
                {!task.is_active ? (
                    <View style={[styles.badge, styles.badgePaused]}>
                        <Text style={styles.badgeText}>Paused</Text>
                    </View>
                ) : null}
            </View>

            {task.description ? (
                <View style={styles.card}>
                    <Text style={styles.cardLabel}>Description</Text>
                    <Text style={styles.description}>{task.description}</Text>
                </View>
            ) : null}

            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.cardLabel}>Difficulty</Text>
                    <View style={styles.difficulty}>
                        {[1, 2, 3, 4, 5].map((level) => (
                            <View
                                key={level}
                                style={[styles.bar, level <= task.difficulty && styles.barFilled]}
                            />
                        ))}
                        <Text style={styles.rowValue}>{task.difficulty}/5</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.row}>
                    <Text style={styles.cardLabel}>Status</Text>
                    <Text style={styles.rowValue}>{task.is_active ? 'Active' : 'Paused'}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.row}>
                    <Text style={styles.cardLabel}>Created</Text>
                    <Text style={styles.rowValue}>{formatDate(task.created_at)}</Text>
                </View>
            </View>

            <View style={styles.actions}>
                <PrimaryButton
                    title="Take proof"
                    onPress={() => navigation.navigate('Proof', { taskId })}
                />
                <PrimaryButton
                    title="Edit"
                    variant="outline"
                    onPress={() => navigation.navigate('TaskForm', { taskId })}
                />
                <PrimaryButton
                    title="Delete"
                    variant="danger"
                    onPress={confirmDelete}
                    isLoading={isDeleting}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.background,
    },
    content: {
        padding: 24,
        paddingBottom: 48,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: 24,
        backgroundColor: colors.background,
    },
    loadingText: {
        fontSize: 14,
        color: colors.muted,
    },
    errorText: {
        fontSize: 15,
        color: colors.danger,
        textAlign: 'center',
    },
    category: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.accent,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        color: colors.text,
        marginTop: 6,
    },
    badges: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 12,
        marginBottom: 20,
    },
    badge: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.muted,
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    badgePaused: {
        borderColor: colors.danger,
    },
    badgeText: {
        fontSize: 13,
        color: colors.text,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    cardLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.muted,
    },
    description: {
        fontSize: 16,
        color: colors.text,
        marginTop: 6,
        lineHeight: 22,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    rowValue: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.text,
    },
    divider: {
        height: 1,
        backgroundColor: colors.background,
        marginVertical: 10,
    },
    difficulty: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    bar: {
        width: 14,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.background,
    },
    barFilled: {
        backgroundColor: colors.accent,
    },
    actions: {
        gap: 12,
        marginTop: 8,
    },
});
