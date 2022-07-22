import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import request from '../../utils/request';
import { ActivityIndicator, View } from 'react-native';
const initialState = {
    user: {
        login: false,
        intro: true,
        info_user: {
            phone_number: '',
        },
        loadingRedux: false,
    },
};

export const getPhoneNumber = createAsyncThunk('user/get_store', async () => {
    const phoneNumber = await SecureStore.getItemAsync('phone_number');
    return phoneNumber;
});

export const getUserDB = createAsyncThunk('user/get_db', async (phone) => {
    try {
        const phone_number = await SecureStore.getItemAsync('phone_number');
        console.log({ phone_number_store: phone_number });
        if (phone_number) {
            const res = await request.get(`user/get_phone/${phone_number}`);
            const data = res && res.data ? res.data.data : {};
            return data;
        } else {
            const res = await request.get(`user/get_phone/${phone}`);
            const data = res && res.data ? res.data.data : {};
            return data;
        }
    } catch (err) {
        console.log({ err: err.message });
    }
});

const userSlide = createSlice({
    name: 'user_success',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const { login, intro } = action.payload;

            state.user = {
                ...state.user,
                login: login,
                intro: intro,
            };
        },
    },
    extraReducers: {
        [getPhoneNumber.pending]: (state, action) => {
            console.log('Fetching loading...');
            state.user.loadingRedux = true;
        },
        [getPhoneNumber.fulfilled]: (state, action) => {
            console.log('Fetching done ...');
            // console.log(action.payload);
            if (action.payload) {
                state.user = {
                    login: true,
                    intro: false,
                    info_user: {
                        phone_number: action.payload,
                    },
                    loadingRedux: false,
                };
            } else {
                state.user = {
                    login: false,
                    intro: true,
                    info_user: {
                        phone_number: '',
                    },
                    loadingRedux: false,
                };
            }
        },
        [getPhoneNumber.rejected]: (state, action) => {
            console.log('Fetching fail ...');
            state.user = {
                login: false,
                intro: true,
                info_user: {
                    phone_number: action.payload,
                },
                loadingRedux: false,
            };
        },

        // getUserDB
        [getUserDB.pending]: (state, action) => {
            console.log('Fetching getDB loading...');
            state.user.loadingRedux = true;
        },
        [getUserDB.fulfilled]: (state, action) => {
            console.log('Fetching getDB done ...');

            if (action.payload) {
                (async () => {
                    try {
                        await SecureStore.setItemAsync(
                            'username',
                            action.payload.username
                        );
                        await SecureStore.setItemAsync(
                            'phone_number',
                            action.payload.phone_number
                        );
                        // console.log('save username success');
                    } catch (err) {
                        console.log({ save_username: err.message });
                    }
                })();

                state.user = {
                    login: true,
                    intro: false,
                    info_user: action.payload,
                    loadingRedux: false,
                };
            }
        },
        [getUserDB.rejected]: (state, action) => {
            state.user.loadingRedux = false;
            console.log('Fetching getDB fail ...');
        },
    },
});

// action
export const { loginSuccess } = userSlide.actions;

// reducer
const userReducer = userSlide.reducer;

// selector
export const userSelector = (state) => state.userReducer.user;

export default userReducer;
