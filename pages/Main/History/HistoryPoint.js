import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// import
import { useIsFocused } from '@react-navigation/native';
import CustomStatusBar from '../../../components/CustomStatusBar';
import { View, Dimensions } from 'react-native';

import HAcumulated from './HAcumulated';
import HSpent from './HSpent';
import HDonated from './HDonated';

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
                    name="Điểm đã tích"
                    component={HAcumulated}
                    options={{
                        tabBarLabelStyle: { fontSize: 11.5, fontWeight: '400' },
                        tabBarActiveTintColor: 'red',
                        tabBarInactiveTintColor: 'black',
                    }}
                />
                <Tab.Screen
                    name="Điểm đã tiêu"
                    component={HSpent}
                    options={{
                        tabBarLabelStyle: { fontSize: 11.5, fontWeight: '400' },
                        tabBarActiveTintColor: 'red',
                        tabBarInactiveTintColor: 'black',
                    }}
                />
                <Tab.Screen
                    name="Điểm giới thiệu"
                    component={HDonated}
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

export default HistoryPoint;
