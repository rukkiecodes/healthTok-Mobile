import { Easing } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { useColorScheme } from '@/hooks/useColorScheme'
import { accent, appDark, dark, light } from '@/utils/colors'
import { ThemedView } from '@/components/ThemedView'
import { Image } from 'expo-image'
import { ThemedText } from '@/components/ThemedText'

export default function _layout () {
  const theme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: theme == 'dark' ? `${light}80` : `${dark}80`,
        tabBarActiveTintColor: theme == 'dark' ? light : accent,
        animation: 'fade',
        transitionSpec: {
          animation: 'timing',
          config: {
            duration: 300,
            easing: Easing.inOut(Easing.ease),
          },
        },
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0
        },
        sceneStyle: {
          backgroundColor: theme == 'dark' ? appDark : light
        },
        tabBarBackground: () => <ThemedView style={{ flex: 1 }} />,
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: '',
          tabBarIcon: ({ focused, color }) => 
            <Image
              source={focused ? require('@/assets/images/icons/homeFilled.png') : require('@/assets/images/icons/home.png')}
              tintColor={color}
              contentFit='contain'
              style={{
                width: 30,
                height: 30
              }}
            />,
          tabBarLabel: ({ color }) => <ThemedText style={{ display: 'none' }}></ThemedText>
        }}
      />
      <Tabs.Screen
        name='conversations'
        options={{
          title: '',
          tabBarIcon: ({ focused, color }) => 
            <Image
              source={focused ? require('@/assets/images/icons/messageFilled.png') : require('@/assets/images/icons/message.png')}
              tintColor={color}
              contentFit='contain'
              style={{
                width: 30,
                height: 30
              }}
            />,
          tabBarLabel: ({ color }) => <ThemedText style={{ display: 'none' }}></ThemedText>
        }}
      />
      <Tabs.Screen
        name='schedule'
        options={{
          title: '',
          tabBarIcon: ({ focused, color }) => 
            <Image
              source={focused ? require('@/assets/images/icons/calendarFilled.png') : require('@/assets/images/icons/calendar.png')}
              tintColor={color}
              contentFit='contain'
              style={{
                width: 30,
                height: 30
              }}
            />,
          tabBarLabel: ({ color }) => <ThemedText style={{ display: 'none' }}></ThemedText>
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: '',
          tabBarIcon: ({ focused, color }) => 
            <Image
              source={focused ? require('@/assets/images/icons/profileFilled.png') : require('@/assets/images/icons/profile.png')}
              tintColor={color}
              contentFit='contain'
              style={{
                width: 30,
                height: 30
              }}
            />,
          tabBarLabel: ({ color }) => <ThemedText style={{ display: 'none' }}></ThemedText>
        }}
      />
    </Tabs>
  )
}