import { supabase } from './supabase';

// Всички заявки за задачите са тук. Екраните не говорят директно със Supabase,
// а викат тези функции - така логиката за данните е на едно място.
//
// Не филтрираме по user_id: RLS правилото "own tasks" в Supabase
// така или иначе връща само задачите на логнатия потребител.

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

// GET - всички задачи, най-новите първи
export async function getTasks() {
    const { data, error } = await supabase
        .from('tasks')
        .select(TASK_FIELDS)
        .order('created_at', { ascending: false });

    if (error) throw toFriendlyError(error);
    return data;
}

// GET - една задача по id (за детайлите и за формата при редакция)
export async function getTaskById(taskId) {
    const { data, error } = await supabase
        .from('tasks')
        .select(TASK_FIELDS)
        .eq('id', taskId)
        .single();

    if (error) throw toFriendlyError(error);
    return data;
}

// POST - нова задача. user_id се попълва сам от default auth.uid() в базата.
export async function createTask(task) {
    const { data, error } = await supabase
        .from('tasks')
        .insert(task)
        .select(TASK_FIELDS)
        .single();

    if (error) throw toFriendlyError(error);
    return data;
}

// PATCH - променяме само подадените полета
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

// DELETE - доказателствата се трият заедно със задачата (on delete cascade)
export async function deleteTask(taskId) {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);

    if (error) throw toFriendlyError(error);
}
