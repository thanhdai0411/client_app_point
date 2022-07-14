import { View, Text } from 'react-native';
import React from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

const MyText = ({ children, ...style }) => {
    let [fontsLoaded] = Font.useFonts({
        'Inter-SemiBoldItalic':
            'https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12',
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <Text style={{ fontFamily: 'Inter-SemiBoldItalic', ...style }}>{children}</Text>
    );
};

export default MyText;
