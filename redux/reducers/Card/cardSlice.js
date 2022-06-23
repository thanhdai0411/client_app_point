import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allProduct: [],
    totalProduct: [],
};

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        addCart: (state, action) => {
            let product = action.payload;
            // state.allProduct.unshift(product);

            let exist = state.allProduct.some((item) => item.id == product.id);

            if (exist) {
                state.allProduct = state.allProduct.map((item) =>
                    item.id == product.id ? { ...item, total: item.total + 1 } : item
                );
            } else state.allProduct = [...state.allProduct, { ...product, total: 1 }];
        },
        deleteProduct: (state, action) => {
            let product = action.payload;

            state.allProduct = state.allProduct.filter((item) => item.id != product.id);
        },
        pressPlus: (state, action) => {
            const product = action.payload;
            state.allProduct = state.allProduct.map((item) =>
                item.id == product.id ? { ...item, total: item.total + 1 } : item
            );
            // console.log(product);
        },
        pressSubtract: (state, action) => {
            const product = action.payload;
            state.allProduct = state.allProduct.map((item) =>
                item.id == product.id ? { ...item, total: item.total - 1 } : item
            );
        },
    },
});

// action
export const { addCart, pressPlus, pressSubtract, deleteProduct } = cardSlice.actions;

// reducer
const cardReducer = cardSlice.reducer;

// selector
export const cardSelector = (state) => state.cardReducer.allProduct;

export default cardReducer;
