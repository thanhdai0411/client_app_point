import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/request';
const initialState = {
    gift: {
        giftAll: [],
        giftMoney: [],
        giftProduct: [],
    },
};

export const getGiftDB = createAsyncThunk('gift/get_db_all', async () => {
    try {
        const res = await request.get('gift/get_all');
        const data = res && res.data ? res.data.data : [];
        return data;
    } catch (err) {
        console.log({ err_all_gift_redux: err.message });
    }
});

const giftSlide = createSlice({
    name: 'gift',
    initialState,

    extraReducers: {
        // getGiftDB
        [getGiftDB.pending]: (state, action) => {
            console.log(' getGiftDB loading...');
        },
        [getGiftDB.fulfilled]: (state, action) => {
            console.log(' getGiftDB done ...');
            const gifts = action.payload;
            let giftMoney = [];
            let giftProduct = [];
            gifts.map((item) => {
                if (item.type_gift === 'quà') giftProduct.push(item);
                if (item.type_gift === 'tiền') giftMoney.push(item);
            });

            if (action.payload) {
                state.gift = {
                    giftAll: action.payload,
                    giftMoney,
                    giftProduct,
                    // giftMoney:
                };
            }
        },
        [getGiftDB.rejected]: (state, action) => {
            console.log(' getGiftDB fail ...');
        },
    },
});

// reducer
const giftReducer = giftSlide.reducer;

// selector
export const giftSelector = (state) => state.giftReducer.gift;

export default giftReducer;
