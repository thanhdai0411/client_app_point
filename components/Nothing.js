import { View, Text, Image } from 'react-native';
import React from 'react';
import CustomButton from './Button';

let buttonDefault = false;
const Nothing = ({ text = 'Nothing', button = buttonDefault, ...styleProps }) => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                ...styleProps,
            }}>
            <Image
                source={require('../assets/img/nothing.jpg')}
                style={{ width: 160, height: 160 }}
            />
            <Text style={{ fontSize: 20, marginTop: 10, textAlign: 'center' }}>
                {text}
            </Text>
            {button}
        </View>
    );
};

export default Nothing;
