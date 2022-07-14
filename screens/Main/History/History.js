import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import Slider from '@react-native-community/slider';

// import
import CustomStatusBar from '../../../components/CustomStatusBar';
import Nothing from '../../../components/Nothing';
import CardHistory from '../../../components/CardHistory';
import { LinearGradient } from 'expo-linear-gradient';
import { userSelector } from '../../../redux/reducers/userSlice';
import { pointSelector } from '../../../redux/reducers/pointSlice';

let header_color = '#377D71';
const History = ({ navigation }) => {
    const { info_user } = useSelector(userSelector);
    let rangeRank = 100000;
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
                            Xin chào,{' '}
                            <Text style={{ fontWeight: '500' }}>
                                {info_user.username
                                    ? info_user.username
                                    : info_user.phone_number}
                            </Text>
                        </Text>
                        <Text style={{ fontSize: 16, color: 'white' }}>
                            Bạn là Thành viên <Text>Nhập môn</Text>
                        </Text>
                    </View>
                    <View>
                        <Image
                            source={require('../../../assets/img/rank_6.png')}
                            style={{ width: 120, height: 121 }}
                        />
                        {info_user.avatar ? (
                            <Image
                                source={{ uri: info_user.avatar }}
                                style={{
                                    width: 52.5,
                                    height: 52.5,
                                    position: 'absolute',
                                    top: 38,
                                    right: 33.7,
                                    borderRadius: 5,
                                }}
                            />
                        ) : (
                            <Image
                                source={require('../../../assets/img/water4.jpg')}
                                style={{
                                    width: 52.5,
                                    height: 52.5,
                                    position: 'absolute',
                                    top: 38,
                                    right: 33.7,
                                    borderRadius: 5,
                                }}
                            />
                        )}
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
                            {info_user.number_point}{' '}
                        </Text>
                        Điểm
                    </Text>
                </LinearGradient>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white', fontSize: 16 }}>
                        Quá trình thăng hạng
                    </Text>
                    <Text style={{ color: 'white', fontSize: 16 }}>{rangeRank}</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                    }}>
                    <Slider
                        style={{
                            flex: 1,
                            height: 13,
                            backgroundColor: 'white',
                            borderRadius: 5,
                        }}
                        minimumValue={0}
                        value={info_user.number_point}
                        step={1}
                        maximumValue={rangeRank}
                        minimumTrackTintColor="black"
                        maximumTrackTintColor="red"
                        thumbTintColor="orange"
                        thumbImage={require('../../../assets/img/beatify.png')}
                        // onSlidingStart={(value) => console.log(value)}
                        onValueChange={(value) => console.log(value)}
                    />

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
                <View>
                    <Text style={{ color: 'white', fontSize: 13 }}>
                        Tích lũy {rangeRank} điểm để đạt hạng Hoàng gia
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
