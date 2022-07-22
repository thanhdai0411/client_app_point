import React, { useState, useEffect, useCallback } from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert,
} from 'react-native';

import {
    ImageHeaderScrollView,
    TriggeringView,
} from 'react-native-image-header-scroll-view';

// import

import CustomStatusBar from '../../../components/CustomStatusBar';
import HomeBody from './HomeBody';
import { pointSelector } from '../../../redux/reducers/pointSlice';
import { userSelector } from '../../../redux/reducers/userSlice';
import { getGiftDB } from '../../../redux/reducers/giftSlice';
import { useSelector, useDispatch } from 'react-redux';
import MyText from '../../../components/MyText';
//
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import
import Coin from '../../../components/Coin';

//
import { box_shadow } from '../../../components/GlobalStyles';
import Fireworks from '../../../components/FireWork';
import ModalLoading from '../../../components/ModalLoading';

//
const { width, height } = Dimensions.get('window');

function Home({ navigation }) {
    const points = useSelector(pointSelector);
    const dispatch = useDispatch();
    const { info_user } = useSelector(userSelector);

    return (
        <>
            <ImageHeaderScrollView
                maxHeight={250}
                minHeight={85}
                headerImage={
                    info_user.wall
                        ? { uri: info_user.wall }
                        : require('../../../assets/img/wall.jpg')
                }
                showsVerticalScrollIndicator={false}
                renderFixedForeground={() => (
                    <View style={styles.home_header}>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.header_name}>
                                {info_user.username
                                    ? info_user.username
                                    : info_user.phone_number}
                                <Text> ơi !</Text>
                            </Text>

                            <Coin count={info_user.number_point} />
                            <Image />
                        </View>
                        {/* notify */}
                        {/* <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => navigation.navigate('Thông báo')}
                                style={{ marginRight: 10 }}>
                                <Ionicons
                                    name="ios-notifications-outline"
                                    size={30}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{
                                backgroundColor: 'red',
                                width: 23,
                                height: 23,
                                position: 'absolute',
                                borderRadius: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                top: 40,
                                right: 15,
                                borderWidth: 1,
                                borderColor: 'white',
                            }}>
                            <Text style={{ color: 'white', fontWeight: '500' }}>0</Text>
                        </View> */}

                        {/* end notify */}
                    </View>
                )}>
                <View style={{ top: -30 }}>
                    <View style={{ ...styles.header_category, ...box_shadow }}>
                        <View style={styles.header_category_container}>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => navigation.navigate('InfoUser')}
                                style={styles.header_category_item}>
                                <FontAwesome name="user-o" size={28} color="orange" />
                                <Text style={styles.header_category_name}>
                                    Thông tin cá nhân
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => navigation.navigate('TransFer')}
                                style={styles.header_category_item}>
                                <AntDesign name="retweet" size={30} color="red" />
                                <Text style={styles.header_category_name}>
                                    Chuyển điểm
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => navigation.navigate('RegisterDealer')}
                                style={styles.header_category_item}>
                                <AntDesign name="form" size={30} color="gray" />
                                <Text style={styles.header_category_name}>
                                    Đăng kí làm đại lý
                                </Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => navigation.navigate('WheelOfFortune1')}
                                style={styles.header_category_item}>
                                <AntDesign name="dashboard" size={28} color="green" />
                                <Text style={styles.header_category_name}>
                                    Vòng quay may mắn
                                </Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => navigation.navigate('InviteCode')}
                                style={styles.header_category_item}>
                                <MaterialIcons name="input" size={28} color="blue" />
                                <Text style={styles.header_category_name}>
                                    Nhập mã giới thiệu
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <HomeBody navigation={navigation} />
                </View>
            </ImageHeaderScrollView>
        </>
    );
}

// let primary_color = '#178dde';
// let header_color = '#178dde';

let primary_color = '#006db6';
let header_color = '#178dde';
let header_category = 'white';

const styles = StyleSheet.create({
    home_header: {
        // flex: 1,
        width: '100%',
        height: 200,
        // backgroundColor: header_color,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        position: 'relative',
        paddingTop: 50,
    },
    header_name: {
        color: 'white',
        fontSize: 20,
        marginBottom: 5,
        fontWeight: '500',
    },
    header_coin: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 45,
        backgroundColor: primary_color,
        flexDirection: 'row',
        // flex: 1
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    header_number_coins: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },

    header_logo: {
        width: 119,
        height: 119,
        marginRight: 10,
    },
    header_category: {
        backgroundColor: header_category,
        marginHorizontal: 15,
        position: 'absolute',
        // top: '10%',
        marginTop: -40,
        zIndex: 1,
        left: 0,
        right: 0,
        borderRadius: 10,
    },
    header_category_container: {
        marginVertical: 2,

        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 11,
        // borderRadius: 20,
    },
    header_category_item: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    header_category_name: {
        textAlign: 'center',
        // marginVertical: 5,
        // fontFamily: 'Poppins_500Medium',
        fontWeight: '500',
        marginTop: 8,
        fontSize: 15,
    },
});

export default Home;
