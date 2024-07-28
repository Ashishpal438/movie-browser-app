// store/store.js
import {configureStore} from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export default store;
