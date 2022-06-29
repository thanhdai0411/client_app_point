import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

// import
import request from '../../../utils/request';
import Nothing from '../../../components/Nothing';
import ButtonCustom from '../../../components/Button';
const HowPoint = () => {
    let obj = {
        code_scanner: '0000',
    };

    const postData = async () => {
        try {
            const res = await request.post('point/add', {
                code_scanner: '1001',
            });
            if (res.data.success) console.log('Thanh cong roi m oi');
        } catch (error) {
            console.log({ error });
        }
    };

    return (
        <View>
            <ButtonCustom name="Fetch" onPress={postData} />
        </View>
    );
};

export default HowPoint;
