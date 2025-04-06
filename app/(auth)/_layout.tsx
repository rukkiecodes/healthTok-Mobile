import React from 'react'
import { Stack } from "expo-router";
import { useColorScheme } from '@/hooks/useColorScheme';
import { appDark, light } from '@/utils/colors';

export default () => {
  const colorScheme = useColorScheme()

  return <Stack
    screenOptions={{
      headerShown: false,
      animation: 'fade_from_bottom',
      contentStyle: {
        backgroundColor: colorScheme == 'dark' ? appDark : light
      }
    }}
  />
}