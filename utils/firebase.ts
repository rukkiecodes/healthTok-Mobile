import { initializeApp, FirebaseApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  onAuthStateChanged,
  Auth,
} from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
} = Constants.expoConfig?.extra?.expoPublic || {};




// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

// Initialize Firebase app
const app: FirebaseApp = initializeApp(firebaseConfig);

// Firebase Auth initialization with persistence for React Native
const auth: Auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db: Firestore = getFirestore(app);

// Firebase state persistence: Check if user is already logged in
const setupAuthStatePersistence = (onUserChange: (user: any) => void) => {
  onAuthStateChanged(auth, (user: any) => {
    onUserChange(user);
  });
};

export { auth, db, setupAuthStatePersistence, onAuthStateChanged, firebaseConfig };