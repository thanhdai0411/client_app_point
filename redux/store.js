import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './reducers/Card/cardSlice';
import scorePointReducer from './reducers/scorePointSlice';

const store = configureStore({
    reducer: {
        cardReducer,
        scorePointReducer,
    },
});

export default store;
