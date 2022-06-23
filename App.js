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
import AntDesign from 'react-native-vector-icons/AntDesign';
import InfoShop from './pages/Main/InfoShop';
import ShowAllSlider from './pages/Main/AllSlider';
import DetailSlide from './pages/Main/DetailSlide';
import OrderProduct from './pages/Main/Cart/OrderProduct';
import InfoOrder from './pages/Main/InfoOrder/InfoOrder';

//
//

export default function App() {
    let isLoginSuccess = true;
    let isDealerLogin = false;

    //==================

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Navigator>
                    {isLoginSuccess ? (
                        <>
                            {/* <Screen
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
                                }}
                            />
                            <Screen
                                name="OrderProduct"
                                component={OrderProduct}
                                options={{
                                    headerShown: false,
                                }}
                            /> */}
                            <Screen
                                name="InfoOrder"
                                component={InfoOrder}
                                options={{
                                    title:"ĐdAI chi",
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
