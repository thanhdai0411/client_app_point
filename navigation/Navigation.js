import React, { useState, useEffect, useCallback } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const { Navigator, Screen, Group } = createNativeStackNavigator();

import { useSelector, useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

// import
import Introduce from '../screens/Introduce';
import Login from '../screens/Authentication/Login';
import Main from '../screens/Main/Main';
import ProductDetail from '../screens/Main/ProductDetail/ProducDetail';
import InfoShop from '../screens/Main/InfoShop';
import ShowAllSlider from '../screens/Main/AllSlider';
import DetailSlide from '../screens/Main/DetailSlide';
import OrderProduct from '../screens/Main/Cart/OrderProduct';
import InfoOrder from '../screens/Main/InfoOrder/InfoOrder';
import AllProduct from '../screens/Main/ProductDetail/AllProduct';
import Notify from '../screens/Main/Notify';

import InfoUser from '../screens/Main/AccountPage/InfoUser';
import InviteCode from '../screens/Main/AccountPage/InviteCode';
import Contact from '../screens/Main/AccountPage/Contact';
import HowPoint from '../screens/Main/AccountPage/HowPoint';
import Terms from '../screens/Main/AccountPage/Terms';
import Security from '../screens/Main/AccountPage/Security';
import RegisterDealer from '../screens/Main/AccountPage/RegisterDealer';
import InfoBank from '../screens/Main/AccountPage/InfoBank';

import HistoryPoint from '../screens/Main/History/HistoryPoint';
import HistoryOrder from '../screens/Main/History/HistoryOrder';
import WhatAWPoint from '../screens/Main/History/WhatAWPoint';
import GiftExchange from '../screens/Main/History/GiftExchange';
import GiftExchangeMoney from '../screens/Main/History/GiftExchangeMoney';
import GiftExchangeProduct from '../screens/Main/History/GiftExchangeProduct';
import DetailExchange from '../screens/Main/History/DetailExchange';
import TransFer from '../screens/Main/HomePage/TransFer';
import WheelOfFortune1 from '../screens/Main/Game/WheelOfFortune';
import HistorySpinGame from '../screens/Main/Game/HistorySpinGame';

import Otp from '../screens/Authentication/Otp';

// redux

import { userSelector, getPhoneNumber, getUserDB } from '../redux/reducers/userSlice';
import { getGiftDB } from '../redux/reducers/giftSlice';

const Navigation = () => {
    const dispatch = useDispatch();
    // const [loginSuccess, setLoginSuccess] = useState(false);
    let header_color = '#178dde';
    const { login, intro, info_user } = useSelector(userSelector);

    useEffect(() => {
        (async () => {
            const username = await SecureStore.getItemAsync('username');

            if (username) {
                console.log({ StoreUserName: username });
                dispatch(getUserDB());
                dispatch(getGiftDB());
            } else {
                console.log({ StoreUserName: 'Khong co gi' });
                dispatch(getPhoneNumber());
                dispatch(getGiftDB());
            }
        })();
    }, [dispatch]);

    return (
        <NavigationContainer>
            <Navigator>
                {login ? (
                    <Group>
                        <Screen
                            name="Main"
                            component={Main}
                            options={{ headerShown: false }}
                        />
                        <Screen
                            name="ProductDetail"
                            component={ProductDetail}
                            options={{ headerShown: false }}
                        />
                        <Screen
                            name="InfoShop"
                            component={InfoShop}
                            options={{
                                title: 'Thông tin cửa hàng',
                                headerTitleStyle: {
                                    fontSize: 20,
                                    // marginTop: 20
                                },
                            }}
                        />
                        <Screen
                            name="ShowAllSlider"
                            component={ShowAllSlider}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Screen
                            name="DetailSlider"
                            component={DetailSlide}
                            options={{
                                title: 'Chi tiết đổi thưởng',
                                headerTitleStyle: {
                                    fontSize: 18,
                                },
                                headerTintColor: 'black',
                            }}
                        />
                        <Screen
                            name="OrderProduct"
                            component={OrderProduct}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Screen
                            name="InfoOrder"
                            component={InfoOrder}
                            options={{
                                title: 'Địa chỉ giao hàng',
                                headerTitleStyle: {
                                    fontSize: 20,
                                },
                                headerTintColor: 'black',
                            }}
                        />
                        <Screen
                            name="AllProduct"
                            component={AllProduct}
                            options={{
                                title: 'Tất cả sản phẩm',
                                headerTitleStyle: {
                                    fontSize: 20,
                                },
                                headerTintColor: 'black',
                            }}
                        />
                        <Screen
                            name="Thông báo"
                            component={Notify}
                            options={{
                                title: 'Thông báo',
                                headerTitleStyle: {
                                    fontSize: 20,
                                },
                                headerTintColor: 'black',
                            }}
                        />
                        <Screen
                            name="InfoUser"
                            component={InfoUser}
                            options={{
                                headerShown: false,
                                title: 'Thông tin cá nhân',
                                headerShadowVisible: false,
                                headerStyle: {
                                    backgroundColor: header_color,
                                },
                                headerTitleStyle: {
                                    fontSize: 20,
                                },
                                headerTintColor: 'white',
                            }}
                        />
                        <Screen
                            name="InfoBank"
                            component={InfoBank}
                            options={{
                                headerShown: true,
                                title: 'Thông tin ngân hàng',
                                headerShadowVisible: false,

                                headerTitleStyle: {
                                    fontSize: 20,
                                },
                                headerTintColor: 'black',
                            }}
                        />
                        <Screen
                            name="InviteCode"
                            component={InviteCode}
                            options={{
                                title: 'Nhập mã giới thiệu',
                                headerTitleStyle: {
                                    fontSize: 20,
                                },
                                headerTintColor: 'black',
                            }}
                        />
                        <Screen
                            name="Contact"
                            component={Contact}
                            options={{
                                title: 'Thông tin liên hệ',
                                headerTitleStyle: {
                                    fontSize: 20,
                                },
                                headerTintColor: 'black',
                            }}
                        />
                        <Screen
                            name="HowPoint"
                            component={HowPoint}
                            options={{
                                title: 'Cách tích điểm',
                                headerTitleStyle: {
                                    fontSize: 20,
                                },
                                headerTintColor: 'black',
                            }}
                        />
                        <Screen
                            name="RegisterDealer"
                            component={RegisterDealer}
                            options={{
                                title: 'Đăng kí làm đại lý',
                                headerTitleStyle: {
                                    fontSize: 20,
                                },
                                headerTintColor: 'black',
                            }}
                        />
                        <Screen
                            name="Security"
                            component={Security}
                            options={{
                                title: 'Chính sách bảo mật',
                                headerTitleStyle: {
                                    fontSize: 20,
                                },
                                headerTintColor: 'black',
                            }}
                        />
                        <Screen
                            name="Terms"
                            component={Terms}
                            options={{
                                title: 'Điều khoản sử dụng',
                                headerTitleStyle: {
                                    fontSize: 20,
                                },
                                headerTintColor: 'black',
                            }}
                        />
                        <Screen
                            name="HistoryPoint"
                            component={HistoryPoint}
                            options={{
                                title: 'Lịch sử điểm ',
                                headerTitleStyle: {
                                    fontSize: 18,
                                },
                                headerTintColor: 'black',
                                headerShadowVisible: false,
                            }}
                        />

                        <Screen
                            name="HistoryOrder"
                            component={HistoryOrder}
                            options={{
                                title: 'Quản lý đơn hàng',
                                headerTitleStyle: {
                                    fontSize: 17,
                                },
                                headerTintColor: 'black',
                                headerShadowVisible: false,
                            }}
                        />
                        <Screen
                            name="WhatAWPoint"
                            component={WhatAWPoint}
                            options={{
                                title: 'Điểm AWPoint là gì ?',
                                headerTitleStyle: {
                                    fontSize: 20,
                                },
                                headerTintColor: 'black',
                                headerStyle: {
                                    backgroundColor: '#fff',
                                    shadowColor: 'transparent',
                                },
                            }}
                        />
                        <Screen
                            name="GiftExchange"
                            component={GiftExchange}
                            options={{
                                title: 'Đổi điểm',
                                headerTitleStyle: {
                                    fontSize: 20,
                                },
                                headerShadowVisible: false,

                                headerTintColor: 'black',
                            }}
                        />
                        <Screen
                            name="GiftExchangeMoney"
                            component={GiftExchangeMoney}
                            options={{
                                title: 'Đổi điểm thành tiền',
                                headerTitleStyle: {
                                    fontSize: 20,
                                },
                                headerTintColor: 'black',
                            }}
                        />
                        <Screen
                            name="GiftExchangeProduct"
                            component={GiftExchangeProduct}
                            options={{
                                title: 'Đổi điểm thành quà',
                                headerTitleStyle: {
                                    fontSize: 20,
                                },

                                headerTintColor: 'black',
                            }}
                        />
                        <Screen
                            name="DetailExchange"
                            component={DetailExchange}
                            options={{
                                headerShown: false,

                                headerTitleStyle: {
                                    fontSize: 20,
                                },

                                headerTintColor: 'black',
                            }}
                        />
                        <Screen
                            name="TransFer"
                            component={TransFer}
                            options={{
                                // title: 'Đổi ',
                                // headerShown: false,
                                title: 'Chuyển điểm',
                                headerShadowVisible: false,
                                headerStyle: {
                                    backgroundColor: '#CEE5D0',
                                },

                                headerTitleStyle: {
                                    fontSize: 20,
                                    fontWeight: '500',
                                },

                                headerTintColor: 'black',
                            }}
                        />
                        <Screen
                            name="WheelOfFortune1"
                            component={WheelOfFortune1}
                            options={{
                                // title: 'Đổi ',
                                headerShown: false,
                                headerTitleStyle: {
                                    fontSize: 20,
                                },

                                headerTintColor: 'black',
                            }}
                        />
                        <Screen
                            name="HistorySpinGame"
                            component={HistorySpinGame}
                            options={{
                                title: 'Lịch sử vòng quay may mắn',
                                headerShown: true,
                                headerTitleStyle: {
                                    fontSize: 18,
                                },

                                headerTintColor: 'black',
                            }}
                        />
                    </Group>
                ) : (
                    <Group>
                        {intro && (
                            <Screen
                                name="Introduce"
                                component={Introduce}
                                options={{
                                    headerShown: false,
                                }}
                            />
                        )}

                        <Screen
                            name="Login"
                            component={Login}
                            options={{ headerShown: false }}
                        />
                        <Screen
                            name="Otp"
                            component={Otp}
                            options={{ headerShown: false }}
                        />
                    </Group>
                )}
            </Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
