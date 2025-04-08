import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser } from "@/store/types/types";
import { auth, setupAuthStatePersistence } from '@/utils/firebase';
import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { signOut as firebaseSignOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  user: FirebaseUser | null;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | any>(null);

export const useAuth = (): AuthContextType | null => {
  return useContext(AuthContext);
};

interface AuthenticationProviderProps {
  children: ReactNode;
}

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const unsubscribe = setupAuthStatePersistence(firebaseUser => {
        if (firebaseUser)
          setAuthState(true);
        else
          setAuthState(false);

        setLoading(false);
      })

      return unsubscribe;
    }
    initializeAuth();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!authState) router.replace("/(auth)/getStarted");
      else router.replace("/(app)/(tabs)/home");
    }
  }, [authState, loading]);

  if (loading) {
    return (
      <ThemedView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ThemedText type="title">Loading...</ThemedText>
      </ThemedView>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        signIn: async (): Promise<void> => {
          setAuthState(true);
        },
        signOut: async (): Promise<void> => {
          try {
            await firebaseSignOut(auth);
            setAuthState(false);
            await AsyncStorage.removeItem("healthTok_user");
            router.replace("/(auth)/getStarted");
          } catch (error) {
            console.error("Error signing out:", error);
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticationProvider;
