import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    score: 0,
};

const scorePointSlice = createSlice({
    name: 'score_point',
    initialState,
    reducers: {
        addScore: (state, action) => {
            // state.allProduct.unshift(product);

            if (exist) {
                state.allProduct = state.allProduct.map((item) =>
                    item.id == product.id ? { ...item, total: item.total + 1 } : item
                );
            } else state.allProduct = [...state.allProduct, { ...product, total: 1 }];
        },
    },
});

// action
export const { addScore } = scorePointSlice.actions;

// reducer
const scorePointReducer = scorePointSlice.reducer;

// selector
export const scorePointSelector = (state) => state.scorePointReducer.score;

export default scorePointReducer;
