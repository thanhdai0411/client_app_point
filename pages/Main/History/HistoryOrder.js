import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const HistoryOrder = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Tích diểm" component={HistoryPoint} />
            <Tab.Screen name="Quản lý đơn hàng" component={HistoryOrder} />
        </Tab.Navigator>
    );
};

export default HistoryOrder;
