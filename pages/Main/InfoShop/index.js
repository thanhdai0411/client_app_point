import { View, Text } from 'react-native';
import React from 'react';
import Nothing from '../../../components/Nothing';
const InfoShop = ({ route, navigation }) => {
    const { idShop } = route.params;
    return (
        <Nothing text={`Thông tin Shop ID ${idShop} đang cập nhật`} />
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //     <Text style={{ fontSize: 20 }}>InfoShop ID : {idShop}</Text>
        // </View>
    );
};

export default InfoShop;
