import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import previewsReducer from '../features/previews/previewsSlice';
import recipesReducer from '../features/recipes/recipesSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    previews: previewsReducer,
    recipes: recipesReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
