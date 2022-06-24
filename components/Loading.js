import { View, Text, Image } from 'react-native';
import React from 'react';

const Loading = () => {
    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                backgroundColor: 'white',
            }}>
            <Image
                source={require('../assets/img/loading_icon.gif')}
                style={{
                    width: 200,
                    height: 200,
                }}
            />
        </View>
    );
};

export default Loading;
