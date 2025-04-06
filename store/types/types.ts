import { ThunkAction, Action } from '@reduxjs/toolkit';
import { store } from '@/store/store';
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export interface User {
  uid: string;
}

export interface UserState {
  user: User | null;
}