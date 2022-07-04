import { View, Text, Image } from 'react-native';
import React from 'react';
import { box_shadow } from '../components/GlobalStyles';

const HistoryCard = ({
    image_link = require('../assets/img/water4.jpg'),
    title = 'Tích điểm thành công',
    accumulate_point = '300',
    sub_action = 'Bạn được cộng thêm',
    action = 'từ hành động quét mã QRCode',
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
                    source={require('../assets/img/water4.jpg')}
                    style={{
                        width: 70,
                        height: 70,
                        borderRadius: 10,
                        marginRight: 10,
                    }}
                    resizeMode="stretch"
                />
            </View>
            <View style={{ width: '75%' }}>
                <Text style={{ fontSize: 17, fontWeight: '500' }}>{title}</Text>
                <View>
                    <Text style={{ fontSize: 15, marginVertical: 8 }}>
                        {sub_action} <Text>{accumulate_point} Điểm</Text>
                        <Text> {action}</Text>
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
