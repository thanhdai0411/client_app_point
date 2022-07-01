import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './reducers/cardSlice';
import pointReducer from './reducers/pointSlice';

const store = configureStore({
    reducer: {
        cardReducer,
        pointReducer,
    },
});

export default store;
