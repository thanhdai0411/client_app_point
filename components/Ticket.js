import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Coin from './Coin';
import { box_shadow } from './GlobalStyles';
const Ticket = ({
    title = 'Giảm 10k Tổng hóa đơn',
    dead_time = '30/7/2022',
    number_coin = '100',
    number_count = '200',
    sub_title = 'Đổi điểm thành tiền',
    top = -70,
}) => {
    return (
        // <View>
        <View
            style={{
                marginTop: 20,
                backgroundColor: 'white',
                marginHorizontal: 15,
                borderRadius: 10,
                padding: 15,
                paddingVertical: 8,
                borderWidth: 1,
                borderColor: '#ddd',
                top: top,
            }}>
            <View>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: '500',
                        paddingBottom: 20,
                        paddingTop: 5,
                    }}>
                    {title}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: 10,
                    }}>
                    <Text style={{ fontSize: 17 }}>Hạn đổi: </Text>
                    <Text style={{ fontSize: 17, color: 'orange' }}>{dead_time}</Text>
                </View>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View
                    style={{
                        backgroundColor: '#eee',
                        width: 25,
                        height: 25,
                        borderRadius: 50,
                        // marginRight: 8,
                    }}></View>
                <Text style={{ color: '#ccc', fontWeight: 'bold' }}>
                    -----------------------------------------------
                </Text>
                <View
                    style={{
                        backgroundColor: '#eee',
                        width: 25,
                        height: 25,
                        borderRadius: 50,
                        // marginLeft: 8,
                    }}></View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <View>
                    <Coin count={number_coin} colorPoint="black" />
                </View>
                <View>
                    <Text style={{ fontSize: 17 }}>{sub_title}</Text>
                </View>
            </View>
        </View>
        // </View>
    );
};

export default Ticket;
