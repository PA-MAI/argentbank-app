// src/redux/store.js
// Ce fichier configure le store Redux global de l'application.
// Il contient tous les "reducers" (ici, uniquement userReducer).

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// Configuration du store avec un seul reducer pour le moment : "user"
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});