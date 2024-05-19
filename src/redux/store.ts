import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './moviesReducer';

const store = configureStore({
    reducer: rootReducer,
});

export default store;