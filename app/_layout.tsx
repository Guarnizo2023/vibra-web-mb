import { Slot, useRouter } from 'expo-router';
import useAuth from './hooks/useAuth';
import React, { useEffect } from 'react';

export default function RootLayout() {
    const router = useRouter();
    const { isAuthenticated, checkAuth } = useAuth();

    useEffect(() => {
        console.log('en RootLayout:', isAuthenticated);
        checkAuth().then((authenticated: any) => {
            console.log('Authenticated:', authenticated);
            if (authenticated) {
                // router.replace('/(tabs)');
            } else {
                router.push('/LoginForm');
            }
        });
    }, []);

    return <Slot />;
}