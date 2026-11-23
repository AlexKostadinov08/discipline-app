import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from 'react-native';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { CATEGORIES } from '../constants/categories';
import { colors } from '../constants/theme';
import { createTask, getTaskById, updateTask } from '../services/tasksService';
import { formatDate, fromDateString, toDateString } from '../utils/dates';
import {
    hasErrors,
    validateCategory,
    validateDeadline,
    validateDescription,
    validateTitle,
} from '../utils/validators';

const INITIAL_VALUES = {
    title: '',
    description: '',
    category: '',
    difficulty: 3,
    deadline: null,
    is_daily: false,
    is_active: true,
};

function validate(values) {
    return {
        title: validateTitle(values.title),
        description: validateDescription(values.description),
        category: validateCategory(values.category),
        deadline: validateDeadline(values.deadline, values.is_daily),
    };
}

export default function TaskFormScreen({ navigation, route }) {
    const taskId = route.params?.taskId;
    const isEditMode = Boolean(taskId);

    const [values, setValues] = useState(INITIAL_VALUES);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(isEditMode);
    const [isSaving, setIsSaving] = useState(false);
    const [loadError, setLoadError] = useState(null);
    const [serverError, setServerError] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const errors = submitted ? validate(values) : {};

    useEffect(() => {
        navigation.setOptions({ title: isEditMode ? 'Редакция' : 'Нова задача' });
    }, [navigation, isEditMode]);

    useEffect(() => {
        if (!isEditMode) return;

        getTaskById(taskId)
            .then((task) => {
                setValues({
                    title: task.title,
                    description: task.description ?? '',
                    category: task.category,
                    difficulty: task.difficulty,
                    deadline: task.deadline,
                    is_daily: task.is_daily,
                    is_active: task.is_active,
                });
            })
            .catch((err) => setLoadError(err.message))
            .finally(() => setIsLoading(false));
    }, [isEditMode, taskId]);

    const setField = (field, value) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setServerError(null);
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);

        if (event.type === 'set' && selectedDate) {
            setField('deadline', toDateString(selectedDate));
        }
    };

    const handleSubmit = async () => {
        setSubmitted(true);
        if (hasErrors(validate(values))) return;

        const task = {
            title: values.title.trim(),
            description: values.description.trim() || null,
            category: values.category,
            difficulty: values.difficulty,
            is_daily: values.is_daily,
            deadline: values.is_daily ? null : values.deadline,
            is_active: values.is_active,
        };

        setIsSaving(true);
        try {
            if (isEditMode) {
                await updateTask(taskId, task);
            } else {
                await createTask(task);
            }
            navigation.goBack();
        } catch (err) {
            setServerError(err.message);
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (loadError) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{loadError}</Text>
                <PrimaryButton title="Back" onPress={() => navigation.goBack()} />
            </View>
        );
    }

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
                <FormInput
                    label="Заглавие"
                    value={values.title}
                    onChangeText={(text) => setField('title', text)}
                    error={errors.title}
                    placeholder="for example Workout 30 min"
                />

                <FormInput
                    label="Описание (по желание)"
                    value={values.description}
                    onChangeText={(text) => setField('description', text)}
                    error={errors.description}
                    placeholder="What exactly needs to be photographed as evidence?"
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                />

                <Text style={styles.label}>Категория</Text>
                <View style={styles.chips}>
                    {CATEGORIES.map((category) => {
                        const isSelected = values.category === category.value;

                        return (
                            <Pressable
                                key={category.value}
                                onPress={() => setField('category', category.value)}
                                style={[styles.chip, isSelected && styles.chipSelected]}
                            >
                                <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                                    {category.label}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
                {errors.category ? <Text style={styles.fieldError}>{errors.category}</Text> : null}

                <Text style={[styles.label, styles.spaced]}>
                    Difficulty: {values.difficulty} out of 5
                </Text>
                <Slider
                    minimumValue={1}
                    maximumValue={5}
                    step={1}
                    value={values.difficulty}
                    onValueChange={(value) => setField('difficulty', value)}
                    minimumTrackTintColor={colors.accent}
                    thumbTintColor={colors.accent}
                />

                <View style={[styles.switchRow, styles.spaced]}>
                    <View style={styles.switchText}>
                        <Text style={styles.label}>Every day</Text>
                        <Text style={styles.hint}>An everyday proof is needed without a deadline</Text>
                    </View>
                    <Switch
                        value={values.is_daily}
                        onValueChange={(value) => setField('is_daily', value)}
                        trackColor={{ true: colors.accent }}
                    />
                </View>

                {!values.is_daily ? (
                    <View style={styles.spaced}>
                        <Text style={styles.label}>Deadline (optional)</Text>
                        <View style={styles.dateRow}>
                            <Pressable
                                onPress={() => setShowDatePicker(true)}
                                style={[styles.dateButton, errors.deadline && styles.dateButtonError]}
                            >
                                <Text style={values.deadline ? styles.dateText : styles.datePlaceholder}>
                                    {values.deadline ? formatDate(values.deadline) : 'Избери дата'}
                                </Text>
                            </Pressable>
                            {values.deadline ? (
                                <Pressable onPress={() => setField('deadline', null)}>
                                    <Text style={styles.clearText}>Remove</Text>
                                </Pressable>
                            ) : null}
                        </View>
                        {errors.deadline ? <Text style={styles.fieldError}>{errors.deadline}</Text> : null}
                    </View>
                ) : null}

                {showDatePicker ? (
                    <DateTimePicker
                        mode="date"
                        value={values.deadline ? fromDateString(values.deadline) : new Date()}
                        minimumDate={new Date()}
                        onChange={handleDateChange}
                    />
                ) : null}

                {isEditMode ? (
                    <View style={[styles.switchRow, styles.spaced]}>
                        <View style={styles.switchText}>
                            <Text style={styles.label}>Активна</Text>
                            <Text style={styles.hint}>Изключи, за да я сложиш на пауза</Text>
                        </View>
                        <Switch
                            value={values.is_active}
                            onValueChange={(value) => setField('is_active', value)}
                            trackColor={{ true: colors.accent }}
                        />
                    </View>
                ) : null}

                {serverError ? <Text style={styles.serverError}>{serverError}</Text> : null}

                <View style={styles.submit}>
                    <PrimaryButton
                        title={isEditMode ? 'Запази промените' : 'Създай задача'}
                        onPress={handleSubmit}
                        isLoading={isSaving}
                    />
                </View>
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
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        gap: 16,
        backgroundColor: colors.background,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 8,
    },
    hint: {
        fontSize: 13,
        color: colors.muted,
    },
    spaced: {
        marginTop: 20,
    },
    chips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: colors.muted,
        backgroundColor: colors.surface,
    },
    chipSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    chipText: {
        fontSize: 14,
        color: colors.text,
    },
    chipTextSelected: {
        color: colors.onPrimary,
        fontWeight: '700',
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
    },
    switchText: {
        flex: 1,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    dateButton: {
        flex: 1,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.muted,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    dateButtonError: {
        borderColor: colors.danger,
    },
    dateText: {
        fontSize: 16,
        color: colors.text,
    },
    datePlaceholder: {
        fontSize: 16,
        color: colors.muted,
    },
    clearText: {
        color: colors.accent,
        fontWeight: '700',
    },
    fieldError: {
        color: colors.danger,
        fontSize: 13,
        marginTop: 6,
    },
    errorText: {
        fontSize: 15,
        color: colors.danger,
        textAlign: 'center',
    },
    serverError: {
        color: colors.danger,
        textAlign: 'center',
        marginTop: 20,
    },
    submit: {
        marginTop: 28,
    },
});
