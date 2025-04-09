import React from 'react'
import { Stack } from "expo-router";
import { useColorScheme } from '@/hooks/useColorScheme';
import { appDark, light } from '@/utils/colors';

export default function AuthStack () {
  const theme = useColorScheme()

  return <Stack
    screenOptions={{
      headerShown: false,
      animation: 'fade_from_bottom',
      contentStyle: {
        backgroundColor: theme == 'dark' ? appDark : light
      }
    }}
  >
    <Stack.Screen name="stap1" />
    <Stack.Screen name="step2" />
    <Stack.Screen name="step3" />
    <Stack.Screen name="getStarted" />
    <Stack.Screen name="login" />
    <Stack.Screen name="forgotPassword" />
    <Stack.Screen name="signup" />
  </Stack>
}