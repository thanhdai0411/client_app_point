import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './reducers/cardSlice';
import pointReducer from './reducers/pointSlice';
import userReducer from './reducers/userSlice';

const store = configureStore({
    reducer: {
        cardReducer,
        pointReducer,
        userReducer,
    },
});

export default store;
