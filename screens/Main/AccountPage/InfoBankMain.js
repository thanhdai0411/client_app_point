import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Dimensions } from 'react-native';

// import
import { useIsFocused } from '@react-navigation/native';
import CustomStatusBar from '../../../components/CustomStatusBar';

import InfoBank from './InfoBank';
import InfoBankCheck from './InfoBankCheck';

const Tab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get('window');

const InfoBankMain = () => {
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
                {/* <Tab.Screen
                    name="Thông tin ngân hàng"
                    component={InfoBankCheck}
                    options={{
                        tabBarLabelStyle: { fontSize: 11.5, fontWeight: '400' },
                        tabBarActiveTintColor: 'red',
                        tabBarInactiveTintColor: 'black',
                    }}
                /> */}
                <Tab.Screen
                    name="Cập nhật thông tin "
                    component={InfoBank}
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

export default InfoBankMain;
