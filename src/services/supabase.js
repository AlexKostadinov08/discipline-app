import 'react-native-url-polyfill/auto';
import { AppState } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';

// SecureStore не обича стойности над ~2 KB, а сесията на Supabase
// често е по-голяма. Затова я режем на парчета и пазим колко са.
const CHUNK_SIZE = 1000;

async function removeItem(key) {
    const count = await SecureStore.getItemAsync(`${key}_count`);
    if (!count) return;

    for (let i = 0; i < Number(count); i++) {
        await SecureStore.deleteItemAsync(`${key}_${i}`);
    }
    await SecureStore.deleteItemAsync(`${key}_count`);
}

async function getItem(key) {
    const count = await SecureStore.getItemAsync(`${key}_count`);
    if (!count) return null;

    let value = '';
    for (let i = 0; i < Number(count); i++) {
        const part = await SecureStore.getItemAsync(`${key}_${i}`);
        if (part === null) return null;
        value += part;
    }
    return value;
}

async function setItem(key, value) {
    await removeItem(key);

    const chunks = Math.ceil(value.length / CHUNK_SIZE);
    for (let i = 0; i < chunks; i++) {
        const part = value.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
        await SecureStore.setItemAsync(`${key}_${i}`, part);
    }
    await SecureStore.setItemAsync(`${key}_count`, String(chunks));
}

export const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL,
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    {
        auth: {
            storage: { getItem, setItem, removeItem },
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    }
);

// Опресняваме токена само докато приложението е на преден план
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
});