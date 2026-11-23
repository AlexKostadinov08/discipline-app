import { supabase } from './supabase';

const TASK_FIELDS =
    'id, title, description, category, difficulty, deadline, is_daily, is_active, created_at';

function toFriendlyError(error) {
    console.warn('Supabase error:', error);

    const message = error?.message ?? '';
    const isNetworkError =
        message.includes('Network request failed') || message.includes('Failed to fetch');

    if (isNetworkError) {
        return new Error('Няма връзка със сървъра. Провери интернета.');
    }

    return new Error('Нещо се обърка със сървъра. Опитай отново.');
}

export async function getTasks() {
    const { data, error } = await supabase
        .from('tasks')
        .select(TASK_FIELDS)
        .order('created_at', { ascending: false });

    if (error) throw toFriendlyError(error);
    return data;
}

export async function getTaskById(taskId) {
    const { data, error } = await supabase
        .from('tasks')
        .select(TASK_FIELDS)
        .eq('id', taskId)
        .single();

    if (error) throw toFriendlyError(error);
    return data;
}

export async function createTask(task) {
    const { data, error } = await supabase
        .from('tasks')
        .insert(task)
        .select(TASK_FIELDS)
        .single();

    if (error) throw toFriendlyError(error);
    return data;
}

export async function updateTask(taskId, changes) {
    const { data, error } = await supabase
        .from('tasks')
        .update(changes)
        .eq('id', taskId)
        .select(TASK_FIELDS)
        .single();

    if (error) throw toFriendlyError(error);
    return data;
}

export async function deleteTask(taskId) {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);

    if (error) throw toFriendlyError(error);
}
