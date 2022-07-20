import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Button,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Progress from 'react-native-progress';
import WheelOfFortune from 'react-native-wheel-of-fortune';

import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Coin from '../../../components/Coin';
import ButtonCustom from '../../../components/Button';
import Firework from '../../../components/FireWork';

import { getUserDB, userSelector } from '../../../redux/reducers/userSlice';

const participants = ['1000', '2000', '3000', '50000', '100000', 'Chia 2', 'Nhân 2'];
const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const { width, height } = Dimensions.get('screen');
const WheelOfFortune1 = () => {
    const { info_user } = useSelector(userSelector);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);

    const [winner, setWinner] = useState({
        winnerValue: null,
        winnerIndex: null,
    });
    const [started, setStarted] = useState(false);
    const childRef = useRef();
    let border_color = '#EDE6DB';
    const wheelOptions = {
        rewards: participants,
        knobSize: 25,
        borderWidth: 3,
        borderColor: border_color,
        innerRadius: 20,
        duration: 6000,

        backgroundColor: border_color,
        textAngle: 'horizontal',
        knobSource: require('./knob.png'),
        onRef: (ref) => (childRef.current = ref),
    };

    const buttonPress = () => {
        setStarted(true);
        childRef.current._onPress();
        // this.child._onPress();
    };

    const buttonPressAgain = () => {
        setWinner({ winnerIndex: null });
        childRef.current._tryAgain();
    };

    let header_color = '#ECB365';
    let color_amount = '#C84B31';
    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} />
            {/* header */}
            <View
                style={{
                    backgroundColor: header_color,
                    width: '100%',
                    paddingTop: 50,
                    paddingBottom: 7,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>
                <Image
                    source={
                        info_user.avatar
                            ? { uri: info_user.avatar }
                            : require('../../../assets/img/non_user.jpg')
                    }
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                />
                <View
                    style={{
                        backgroundColor: color_amount,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: 120,
                        height: 35,
                        borderRadius: 10,
                        paddingHorizontal: 5,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        <Fontisto name="spinner-fidget" size={20} color="white" />
                        <Text style={{ color: 'white', fontSize: 18 }}> 7</Text>
                    </View>
                    <View>
                        <FontAwesome name="plus-square" size={30} color="white" />
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: color_amount,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: 120,
                        height: 35,
                        borderRadius: 10,
                        paddingHorizontal: 5,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        <Coin count={info_user.number_point} />
                        {/* <Text style={{ color: 'white', fontSize: 18 }}> 7</Text> */}
                    </View>
                </View>

                <View>
                    <FontAwesome name="history" size={30} color="#eee" />
                </View>
            </View>
            {/* end header */}

            {/* title */}
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 25,
                        fontWeight: '600',
                        color: 'yellow',
                    }}>
                    VÒNG QUAY MAY MẮN
                </Text>
                <Text
                    style={{
                        textAlign: 'center',
                        marginTop: 5,
                        color: 'white',
                        fontWeight: '500',
                    }}>
                    Nhận ngay số điểm cực khủng khi bạn may mắn, nhưng nếu bạn xui cũng có
                    thể mất đi số điểm hiện có
                </Text>
            </View>

            {/* end title */}
            {/* wheel */}
            <View style={{ paddingTop: 170 }}>
                <WheelOfFortune
                    options={wheelOptions}
                    getWinner={(value, index) => {
                        setWinner({ winnerValue: value, winnerIndex: index });
                    }}
                />
            </View>
            {/* end wheel */}

            {/*  */}
            <View style={{ marginTop: 190, paddingHorizontal: 15 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Text style={{ color: 'white', fontSize: 18 }}>No Spin</Text>
                    <AntDesign name="gift" size={35} color="orange" />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Progress.Bar
                        progress={4 / 9.3}
                        animated={true}
                        width={null}
                        color={'yellow'}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 9,
                    }}>
                    {number.map((item, index) => (
                        <Text key={index} style={{ color: 'white', fontWeight: '500' }}>
                            {item}
                        </Text>
                    ))}
                </View>
                <View style={{ paddingTop: 20, paddingBottom: 15 }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            color: '#FEB139',
                            fontSize: 14,
                            fontWeight: '500',
                        }}>
                        Khi bạn quay đủ số lần sẽ nhận được môt phần quà
                    </Text>
                </View>
                <View>
                    <ButtonCustom
                        name={
                            !started
                                ? 'SPIN TO WIN'
                                : winner.winnerIndex != null
                                ? 'SPIN AGAIN'
                                : 'SPIN ALREADY RUN'
                        }
                        weightText="800"
                        sizeText={20}
                        marginHorizontal={null}
                        borderWidth={3}
                        borderColor={'yellow'}
                        opacityBtn={0.7}
                        padding={13}
                        backgroundColor={'orange'}
                        onPress={
                            !started
                                ? buttonPress
                                : winner.winnerIndex != null
                                ? buttonPressAgain
                                : null
                        }
                    />
                </View>
            </View>
            {/*  */}

            {winner.winnerIndex != null && (
                <View style={styles.winnerView}>
                    <Text style={styles.winnerText}>
                        You win {participants[winner.winnerIndex]}
                    </Text>

                    <TouchableOpacity
                        onPress={() => {
                            setWinner({ winnerIndex: null });
                            childRef.current._tryAgain();
                            // setStarted(false);

                            // this.child._tryAgain();
                        }}
                        style={styles.tryAgainButton}>
                        <Text style={styles.tryAgainText}>TRY AGAIN</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

let bgc_wheel = '#3F4E4F';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: bgc_wheel,
    },
    startButtonView: {
        position: 'absolute',
    },
    startButton: {
        backgroundColor: 'rgba(0,0,0,.5)',
        marginTop: 60,
        padding: 5,
        borderRadius: 100,
        width: 52.5,
        height: 52.5,
    },
    startButtonText: {
        textAlign: 'center',
        fontSize: 17,
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: 50,
        paddingTop: 10,
    },
    winnerView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tryAgainButton: {
        padding: 10,
    },
    winnerText: {
        fontSize: 30,
    },
    tryAgainButton: {
        padding: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    tryAgainText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default WheelOfFortune1;
