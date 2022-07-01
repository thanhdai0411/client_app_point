import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    point: {
        point_user: 0,
        point_introduce: 0,
    },
};

const pointSlice = createSlice({
    name: 'point',
    initialState,
    reducers: {
        globalPoint: (state, action) => {
            const { user, introduce } = action.payload;
            state.point = {
                point_user: user,
                point_introduce: introduce,
            };
        },
    },
});

// action
export const { globalPoint } = pointSlice.actions;

// reducer
const pointReducer = pointSlice.reducer;

// selector
export const pointSelector = (state) => state.pointReducer.point;

export default pointReducer;
