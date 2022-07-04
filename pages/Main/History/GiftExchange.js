import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useIsFocused } from '@react-navigation/native';
import CustomStatusBar from '../../../components/CustomStatusBar';
import { View, Dimensions } from 'react-native';
// import

import GiftExchangeMoney from './GiftExchangeMoney';
import GiftExchangeProduct from './GiftExchangeProduct';

const Tab = createMaterialTopTabNavigator();

const { width, height } = Dimensions.get('window');

const GiftExchange = () => {
    const isFocused = useIsFocused();

    return (
        <>
            {isFocused ? <CustomStatusBar barStyle="dark-content" /> : null}
            {/* {isFocused ?  : null} */}
            <Tab.Navigator
                style={{
                    height: height,
                    position: 'absolute',
                    // top: 0,
                    left: 0,
                    right: 0,
                }}>
                <Tab.Screen
                    name="Đổi điểm thành tiền"
                    component={GiftExchangeMoney}
                    options={{
                        tabBarLabelStyle: { fontSize: 11.5, fontWeight: '400' },
                        tabBarActiveTintColor: 'red',
                        tabBarInactiveTintColor: 'black',
                    }}
                />
                <Tab.Screen
                    name="Đổi điểm thành quà"
                    component={GiftExchangeProduct}
                    options={{
                        tabBarLabelStyle: { fontSize: 11.5, fontWeight: '400' },
                        tabBarActiveTintColor: 'red',
                        tabBarInactiveTintColor: 'black',
                    }}
                />
            </Tab.Navigator>
        </>
    );
};

export default GiftExchange;
