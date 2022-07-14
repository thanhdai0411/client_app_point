import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import { box_shadow } from '../components/GlobalStyles';

const HistoryCard = ({
    image_link = require('../assets/img/water4.jpg'),
    title = 'Tích điểm thành công',
    point = '300',
    sub_action = 'Bạn được cộng thêm',
    action,
    time = '10:32',
    date = '04/07/2022',
}) => {
    return (
        <View
            style={{
                backgroundColor: 'white',
                padding: 10,
                marginHorizontal: 5,
                marginVertical: 3,

                borderRadius: 5,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                ...box_shadow,
            }}>
            <View style={{ width: '25%' }}>
                <Image
                    source={image_link}
                    style={{
                        width: 70,
                        height: 70,
                        borderRadius: 10,
                        marginRight: 10,
                        borderWidth: 1,
                        borderColor: '#eee',
                    }}
                    resizeMode="stretch"
                />
            </View>
            <View style={{ width: '75%' }}>
                <Text style={{ fontSize: 17, fontWeight: '500' }}>{title}</Text>
                <View>
                    <Text
                        style={{ fontSize: 15, marginVertical: 5, textAlign: 'justify' }}
                        numberOfLines={4}>
                        {sub_action} <Text style={{ color: 'orange' }}>{point} </Text>Điểm
                        <Text style={{ color: '#2155CD' }}> {action}</Text>
                    </Text>
                </View>
                <View>
                    <Text style={{ color: 'red' }}>
                        <Text>{time} -</Text>
                        <Text> {date}</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default HistoryCard;
