import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// import

import CompleteOrder from './CompleteOrder';
import WaitingDelivery from './WaitingDelivery';
import WaitingConfirm from './WaitingConfirm';
import { useIsFocused } from '@react-navigation/native';
import CustomStatusBar from '../../../components/CustomStatusBar';
import { View, Dimensions } from 'react-native';

const Tab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get('window');

const HistoryOrder = () => {
    const isFocused = useIsFocused();

    return (
        <>
            {isFocused ? <CustomStatusBar barStyle="dark-content" /> : null}

            <Tab.Navigator
                style={{
                    height: height,
                    position: 'absolute',
                    // top: 0,
                    left: 0,
                    right: 0,
                }}>
                <Tab.Screen
                    name="Chờ xác nhận"
                    component={WaitingConfirm}
                    options={{
                        tabBarLabelStyle: { fontSize: 11.5, fontWeight: '400' },
                        tabBarActiveTintColor: 'red',
                        tabBarInactiveTintColor: 'black',
                    }}
                />
                <Tab.Screen
                    name="Chờ giao hàng"
                    component={WaitingDelivery}
                    options={{
                        tabBarLabelStyle: { fontSize: 11.5, fontWeight: '400' },
                        tabBarActiveTintColor: 'red',
                        tabBarInactiveTintColor: 'black',
                    }}
                />
                <Tab.Screen
                    name="Đã hoàn thành"
                    component={CompleteOrder}
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

export default HistoryOrder;
