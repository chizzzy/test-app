import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { productSlice } from './modules/product';

export const store = configureStore({
  reducer: productSlice.reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
