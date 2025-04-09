import { View, Button, Text } from 'react-native'
import React from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { signOut } from 'firebase/auth';
import { auth } from '@/utils/firebase'


export default function home () {
  const handleLogout = async () => {
    try {
      // Sign out from Google
      await GoogleSignin.signOut();

      // Sign out from Firebase
      await signOut(auth);

      console.log('✅ Logged out successfully');
    } catch (error) {
      console.log('❌ Error signing out:', error);
    }
  };

  return (
    <View>
      <Text>home</Text>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  )
}