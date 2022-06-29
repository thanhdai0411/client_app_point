import { View, Text, SafeAreaView, Image } from 'react-native';
import React from 'react';
import CustomStatusBar from '../../../components/CustomStatusBar';
import Nothing from '../../../components/Nothing';

let header_color = '#178dde';
const History = () => {
    return (
        <SafeAreaView style={{ backgroundColor: header_color }}>
            {/* header */}
            <View
                style={{
                    backgroundColor: header_color,
                    paddingHorizontal: 15,
                    paddingTop: 20,
                    paddingBottom: 30,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <View>
                        <Text style={{ fontSize: 17, marginBottom: 5, color: 'white' }}>
                            Xin chào, <Text style={{ fontWeight: '500' }}>Thanh Dai</Text>
                        </Text>
                        <Text style={{ fontSize: 14, color: 'white' }}>
                            Bạn đang là Thành viên <Text>Bạc</Text>
                        </Text>
                    </View>
                    <View>
                        <Image
                            source={require('../../../assets/img/rank_1.png')}
                            style={{ width: 80, height: 80 }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: 'white',
                        borderWidth: 0.5,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        paddingVertical: 10,
                        paddingLeft: 10,
                        marginVertical: 15,
                    }}>
                    <Text style={{ fontSize: 17 }}>
                        <Text
                            style={{ fontSize: 30, marginRight: 10, fontWeight: '500' }}>
                            100{' '}
                        </Text>
                        Điểm
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white', fontSize: 16 }}>
                        Quá trình thăng hạng
                    </Text>
                    <Text style={{ color: 'white', fontSize: 16 }}>30.000</Text>
                </View>
                <View
                    style={{
                        height: 10,
                        backgroundColor: 'orange',
                        marginVertical: 10,
                    }}></View>
                <View>
                    <Text style={{ color: 'white', fontSize: 13 }}>
                        Tích lũy thêm 30.000 điểm để đạt hạng Thành Viên Vàng
                    </Text>
                </View>
            </View>
            {/* end header */}
            {/* body */}
            <View></View>
            {/* end body */}
        </SafeAreaView>
    );
};

export default History;
