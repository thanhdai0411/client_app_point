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
                height: '100%',
                ...styleProps,
            }}>
            <Image
                source={require('../assets/img/btri.jpg')}
                style={{ width: 250, height: 250 }}
            />
            <Text style={{ fontSize: 20, textAlign: 'center' }}>{text}</Text>
            {button}
        </View>
    );
};

export default Nothing;
