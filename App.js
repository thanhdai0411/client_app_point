import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const { Navigator, Screen } = createNativeStackNavigator();

import Introduce from './pages/Introduce';
import Login from './pages/Authentication/Login';
import Main from './pages/Main/Main';

export default function App() {
    let isLoginSuccess = true;
    return (
        <NavigationContainer>
            <Navigator>
                {isLoginSuccess ? (
                    <Screen
                        name="Main"
                        component={Main}
                        options={{ headerShown: false }}
                    />
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
    );
}
