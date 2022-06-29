import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const { Navigator, Screen } = createNativeStackNavigator();

import Introduce from './pages/Introduce';
import Login from './pages/Authentication/Login';
import Main from './pages/Main/Main';
import ProductDetail from './pages/Main/ProductDetail/ProducDetail';
import InfoShop from './pages/Main/InfoShop';
import ShowAllSlider from './pages/Main/AllSlider';
import DetailSlide from './pages/Main/DetailSlide';
import OrderProduct from './pages/Main/Cart/OrderProduct';
import InfoOrder from './pages/Main/InfoOrder/InfoOrder';
import AllProduct from './pages/Main/ProductDetail/AllProduct';
import Notify from './pages/Main/Notify';
import InfoUser from './pages/Main/AccountPage/InfoUser';
import InviteCode from './pages/Main/AccountPage/InviteCode';
import Contact from './pages/Main/AccountPage/Contact';
import HowPoint from './pages/Main/AccountPage/HowPoint';
import Terms from './pages/Main/AccountPage/Terms';
import Security from './pages/Main/AccountPage/Security';
import RegisterDealer from './pages/Main/AccountPage/RegisterDealer';

export default function App() {
    let header_color = '#178dde';

    let isLoginSuccess = true;
    let isDealerLogin = false;

    //==================

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Navigator>
                    {isLoginSuccess ? (
                        <>
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
                                    headerShown: true,
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
                        </>
                    ) : (
                        <>
                            <Screen
                                name="Introduce"
                                component={Introduce}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Screen
                                name="Login"
                                component={Login}
                                options={{ headerShown: false }}
                            />
                        </>
                    )}
                </Navigator>
            </NavigationContainer>
        </Provider>
    );
}
