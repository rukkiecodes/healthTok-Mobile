import React, { useEffect } from 'react'
import { Slot } from 'expo-router'
import ProfileSetupProvider from '@/context/profileSetupContext'
import { fetchProfile } from '@/store/actions/fetchProfileAction';
import { useDispatch } from 'react-redux';

const _layout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = dispatch(fetchProfile());

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [dispatch]);

  return (
    <ProfileSetupProvider>
      <Slot />
    </ProfileSetupProvider>
  )
}

export default _layout