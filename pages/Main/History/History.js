import { View, Text, SafeAreaView, Image } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

// import
import CustomStatusBar from '../../../components/CustomStatusBar';
import Nothing from '../../../components/Nothing';
import CardHistory from '../../../components/CardHistory';
import { LinearGradient } from 'expo-linear-gradient';

let header_color = '#178dde';
const History = ({ navigation }) => {
    return (
        <SafeAreaView style={{ backgroundColor: header_color }}>
            {/* header */}
            <View
                style={{
                    backgroundColor: header_color,
                    paddingHorizontal: 15,
                    // paddingTop: 10,
                    paddingBottom: 30,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <View>
                        <Text style={{ fontSize: 18, marginBottom: 5, color: 'white' }}>
                            Xin chào, <Text style={{ fontWeight: '500' }}>Thanh Dai</Text>
                        </Text>
                        <Text style={{ fontSize: 16, color: 'white' }}>
                            Bạn là Thành viên <Text>Hoàng gia</Text>
                        </Text>
                    </View>
                    <View>
                        <Image
                            source={require('../../../assets/img/rank_6.png')}
                            style={{ width: 120, height: 121 }}
                        />
                        <Image
                            source={require('../../../assets/img/logo.png')}
                            style={{
                                width: 52.5,
                                height: 52.5,
                                position: 'absolute',
                                top: 38,
                                right: 33.7,
                                borderRadius: 5,
                            }}
                        />
                    </View>
                </View>
                <LinearGradient
                    colors={['#ccc', '#eee']}
                    start={{ x: 0.3, y: 0.6 }}
                    style={{
                        // backgroundColor: 'white',
                        borderWidth: 0.5,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        paddingVertical: 10,
                        paddingLeft: 10,
                        marginVertical: 15,
                    }}>
                    <Text style={{ fontSize: 17 }}>
                        <Text
                            style={{
                                fontSize: 30,
                                marginRight: 10,
                                fontWeight: '500',
                            }}>
                            100{' '}
                        </Text>
                        Điểm
                    </Text>
                </LinearGradient>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white', fontSize: 16 }}>
                        Quá trình thăng hạng
                    </Text>
                    <Text style={{ color: 'white', fontSize: 16 }}>30.000</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                        style={{
                            height: 10,
                            backgroundColor: 'orange',
                            marginVertical: 10,
                            flex: 1,
                        }}></View>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: '#eee',
                            borderRadius: 50,
                            marginLeft: 5,
                            padding: 1,
                            backgroundColor: '#ccc',
                        }}>
                        <AntDesign name="star" size={20} color="white" />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: 'white', fontSize: 13 }}>
                        Tích lũy 30.000 điểm để đạt hạng Thành Viên Hoàng gia
                    </Text>
                </View>
            </View>
            {/* end header */}
            {/* body */}
            <View
                style={{
                    backgroundColor: 'white',
                    height: '100%',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                }}>
                {/* item */}
                <View
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 30,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                    }}>
                    <CardHistory
                        name="Lịch sử giao dịch điểm"
                        onPress={() => navigation.navigate('HistoryPoint')}
                    />
                    <CardHistory
                        name="Lịch sử giao hàng"
                        onPress={() => navigation.navigate('HistoryOrder')}
                    />
                    <CardHistory
                        name="Điểm AWPoint là gì ?"
                        onPress={() => navigation.navigate('WhatAWPoint')}
                    />
                    <CardHistory
                        name="Đổi điểm"
                        onPress={() => navigation.navigate('GiftExchange')}
                    />
                </View>
                {/* end */}
            </View>
            {/* end body */}
        </SafeAreaView>
    );
};

export default History;
