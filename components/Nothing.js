import { View, Text, Image } from 'react-native';
import React from 'react';

const Nothing = ({ text = 'Nothing' }) => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
            }}>
            <Image
                source={require('../assets/img/nothing.jpg')}
                style={{ width: 160, height: 160 }}
            />
            <Text style={{ fontSize: 20, marginTop: 10 }}>{text}</Text>
        </View>
    );
};

export default Nothing;
