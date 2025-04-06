import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { db } from '@/utils/firebase';
import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { doc, getDoc } from 'firebase/firestore';
import { auth } from '@/utils/firebase';

interface ProfileContextType {
  signIn: () => void;
}

const ProfileContext = createContext<ProfileContextType | any>(null);

export const useProfileSetup = (): ProfileContextType | null => {
  return useContext(ProfileContext);
};

interface ProfileSetupProviderProps {
  children: ReactNode;
}

const ProfileSetupProvider = ({ children }: ProfileSetupProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [isProfileSetup, setIsProfileSetup] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const { uid }: any = auth.currentUser
      const { setup }: any = (await getDoc(doc(db, 'users', uid))).data()

      if (setup) setIsProfileSetup(true);
      else setIsProfileSetup(false);

      setLoading(false);
    }

    getProfile()
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!isProfileSetup) router.replace('/(app)/(profileSetup)/patient');
      else router.replace("/(app)/home");
    }
  }, [isProfileSetup, loading]);

  if (loading) {
    return (
      <ThemedView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ThemedText type="title">Loading User...</ThemedText>
      </ThemedView>
    )
  }

  return (
    <ProfileContext.Provider
      value={{
        isProfileSetup,
        signIn: async (): Promise<void> => {
          setIsProfileSetup(true);
        }
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileSetupProvider;
