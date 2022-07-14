import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// import
import { useIsFocused } from '@react-navigation/native';
import CustomStatusBar from '../../../components/CustomStatusBar';
import { View, Dimensions } from 'react-native';

import HAcumulated from './HAcumulated';
import HSpent from './HSpent';
import HDonated from './HDonated';
import HTransfer from './HTransfer';

const Tab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get('window');

const HistoryPoint = () => {
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
                    name="Tích"
                    component={HAcumulated}
                    options={{
                        tabBarLabelStyle: { fontSize: 14, fontWeight: '500' },
                        tabBarActiveTintColor: 'red',
                        tabBarInactiveTintColor: 'black',
                    }}
                />
                <Tab.Screen
                    name="Tiêu"
                    component={HSpent}
                    options={{
                        tabBarLabelStyle: { fontSize: 14, fontWeight: '500' },
                        tabBarActiveTintColor: 'red',
                        tabBarInactiveTintColor: 'black',
                    }}
                />
                <Tab.Screen
                    name="Chuyển"
                    component={HTransfer}
                    options={{
                        tabBarLabelStyle: { fontSize: 14, fontWeight: '500' },
                        tabBarActiveTintColor: 'red',
                        tabBarInactiveTintColor: 'black',
                    }}
                />
                <Tab.Screen
                    name="Nhận"
                    component={HDonated}
                    options={{
                        tabBarLabelStyle: { fontSize: 14, fontWeight: '500' },
                        tabBarActiveTintColor: 'red',
                        tabBarInactiveTintColor: 'black',
                    }}
                />
            </Tab.Navigator>
        </>
    );
};

export default HistoryPoint;
