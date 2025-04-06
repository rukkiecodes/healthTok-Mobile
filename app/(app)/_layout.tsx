import React from 'react'
import { Slot } from 'expo-router'
import ProfileSetupProvider from '@/context/profileSetupContext'

const _layout = () => {
  return (
    <ProfileSetupProvider>
      <Slot />
    </ProfileSetupProvider>
  )
}

export default _layout