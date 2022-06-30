import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// import

import CompleteOrder from './CompleteOrder';
import WaitingDelivery from './WaitingDelivery';
import WaitingConfirm from './WaitingConfirm';

const Tab = createMaterialTopTabNavigator();

const HistoryOrder = () => {
    return (
        <Tab.Navigator>
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
    );
};

export default HistoryOrder;
