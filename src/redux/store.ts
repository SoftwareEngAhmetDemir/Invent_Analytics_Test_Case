import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session'; // Use sessionStorage
import movieReducer from './movieSlice';

// Persist configuration
const persistConfig = {
  key: 'root', // Key for the storage
  storage: sessionStorage, // Replace localStorage with sessionStorage
  // whitelist: ['movies'], // Only persist the `movies` reducer state
};

// Wrap the reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, movieReducer);

export const store = configureStore({
  reducer: {
    movies: persistedReducer,
  },
});

// Create a persistor instance
export const persistor = persistStore(store);

// Infer types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
