import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { translateAuthError } from '../utils/authErrors';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setIsLoading(false);
        });

        const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
        });

        return () => data.subscription.unsubscribe();
    }, []);

    const login = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
        });

        if (error) throw new Error(translateAuthError(error));
    };

    const register = async (username, email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
                data: { username: username.trim() },
            },
        });

        if (error) throw new Error(translateAuthError(error));

        return Boolean(data.session);
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) throw new Error(translateAuthError(error));
    };

    const value = {
        session,
        user: session?.user ?? null,
        isLoading,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
