import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './reducers/cardSlice';
import pointReducer from './reducers/pointSlice';
import userReducer from './reducers/userSlice';
import giftReducer from './reducers/giftSlice';

const store = configureStore({
    reducer: {
        cardReducer,
        pointReducer,
        userReducer,
        giftReducer,
    },
});

export default store;
