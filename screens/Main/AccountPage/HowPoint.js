import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

// import
import Nothing from '../../../components/Nothing';

const HowPoint = () => {
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <Nothing
                text="Trang đang được xây dựng"
                bottom={100}
                left={0}
                right={0}
                position="absolute"
            />
        </View>
    );
};

export default HowPoint;
