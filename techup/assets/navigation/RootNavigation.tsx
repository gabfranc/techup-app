import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../firebase.js';
import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';
import LoadingScreen from '../screens/LoadingScreen';

export default function RootNavigation() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <NavigationContainer>
      {user ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}
