import { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getTasks } from '../services/tasksService';
import TaskCard from '../components/TaskCard';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../constants/theme';

export default function TasksScreen({ navigation }) {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const loadTasks = useCallback(async () => {
        try {
            setError(null);
            const data = await getTasks();
            setTasks(data);
        } catch (err) {
            setError(err.message);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadTasks().finally(() => setIsLoading(false));
        }, [loadTasks])
    );

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await loadTasks();
        setIsRefreshing(false);
    };

    const handleRetry = () => {
        setIsLoading(true);
        loadTasks().finally(() => setIsLoading(false));
    };

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (error && tasks.length === 0) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error}</Text>
                <PrimaryButton title="Try Again" onPress={handleRetry} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        onPress={() => navigation.navigate('TaskDetails', { taskId: item.id })}
                    />
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={tasks.length === 0 ? styles.emptyContent : styles.listContent}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        colors={[colors.accent]}
                        tintColor={colors.accent}
                    />
                }
                ListHeaderComponent={
                    error ? <Text style={styles.inlineError}>{error}</Text> : null
                }
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyTitle}>No tasks yet</Text>
                        <Text style={styles.emptyText}>
                            Add the first one and start proving that you have finished it
                        </Text>
                    </View>
                }
            />

            <View style={styles.footer}>
                <PrimaryButton title="New Task" onPress={() => navigation.navigate('TaskForm')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        gap: 16,
        backgroundColor: colors.background,
    },
    listContent: {
        padding: 16,
    },
    emptyContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },
    separator: {
        height: 12,
    },
    empty: {
        alignItems: 'center',
        gap: 8,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.text,
    },
    emptyText: {
        fontSize: 15,
        color: colors.muted,
        textAlign: 'center',
    },
    errorText: {
        fontSize: 15,
        color: colors.danger,
        textAlign: 'center',
    },
    inlineError: {
        color: colors.danger,
        textAlign: 'center',
        marginBottom: 12,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.background,
    },
});
