import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './reducers/Card/cardSlice';

const store = configureStore({
    reducer: {
        cardReducer,
    },
});

export default store;
