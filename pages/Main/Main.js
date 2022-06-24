import { View, Text, TouchableOpacity, Animated, Button } from 'react-native';
import React, { useEffect } from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Home from './HomePage/Home';
import Shopping from './ShoppingPage/Shopping';
import Notify from './Notify';
import Account from './AccountPage/Account';
import Accumulate from './Accumulate';
import HistoryPoint from './History/HistoryPoint';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Main = ({ navigation }) => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Trang chủ"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate('Trang chủ')}>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <MaterialCommunityIcons
                                    name="home-outline"
                                    size={30}
                                    color={focused ? 'red' : 'black'}
                                />
                            </View>
                        </TouchableOpacity>
                    ),
                    tabBarLabelStyle: { fontSize: 13, fontWeight: '400' },
                    tabBarActiveTintColor: 'red',
                    tabBarInactiveTintColor: 'black',
                }}
            />
            <Tab.Screen
                name="Mua sắm"
                component={Shopping}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                                navigation.navigate('Mua sắm');
                            }}>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <AntDesign
                                    name="shoppingcart"
                                    size={30}
                                    color={focused ? 'red' : 'black'}
                                />
                            </View>
                        </TouchableOpacity>
                    ),
                    tabBarLabel: 'Mua sắm',
                    tabBarLabelStyle: { fontSize: 13, fontWeight: '400' },
                    tabBarActiveTintColor: 'red',
                    tabBarInactiveTintColor: 'black',
                }}
            />

            <Tab.Screen
                name="Tích điểm"
                component={Accumulate}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate('Tích điểm')}>
                            <View
                                style={{
                                    width: 55,
                                    height: 55,
                                    backgroundColor: 'red',
                                    borderRadius: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: 25,
                                }}>
                                <MaterialCommunityIcons
                                    name="camera-outline"
                                    size={30}
                                    color="white"
                                />
                            </View>
                        </TouchableOpacity>
                    ),
                    tabBarLabel: 'Tích điểm',
                    tabBarLabelStyle: { fontSize: 13, fontWeight: '400' },
                    tabBarActiveTintColor: 'red',
                    tabBarInactiveTintColor: 'black',
                    title: 'Quét mã tích điểm',
                    headerStyle: {
                        backgroundColor: '#fff',
                        shadowColor: 'transparent',
                    },
                    headerTitleStyle: {
                        fontSize: 25,
                        // marginTop: 20
                    },
                }}
            />
            <Tab.Screen
                name="Lịch sử"
                component={HistoryPoint}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate('Lịch sử')}>
                            <View>
                                <MaterialCommunityIcons
                                    name="clock-outline"
                                    size={30}
                                    color={focused ? 'red' : 'black'}
                                />
                            </View>
                        </TouchableOpacity>
                    ),

                    tabBarLabelStyle: { fontSize: 13, fontWeight: '400' },
                    tabBarActiveTintColor: 'red',
                    tabBarInactiveTintColor: 'black',
                    headerTitleStyle: {
                        fontSize: 25,
                        // marginTop: 20
                    },
                }}
            />
            <Tab.Screen
                name="Tài khoản"
                component={Account}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate('Tài khoản')}>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <MaterialCommunityIcons
                                    name="account-circle-outline"
                                    size={30}
                                    color={focused ? 'red' : 'black'}
                                />
                            </View>
                        </TouchableOpacity>
                    ),
                    tabBarLabelStyle: { fontSize: 13, fontWeight: '400' },
                    tabBarActiveTintColor: 'red',
                    tabBarInactiveTintColor: 'black',
                }}
            />
        </Tab.Navigator>
    );
};

export default Main;
