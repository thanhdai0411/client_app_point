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
    Modal,
    ImageBackground,
    Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Progress from 'react-native-progress';
import WheelOfFortune from 'react-native-wheel-of-fortune';
import { useForm, Controller } from 'react-hook-form';

import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import Coin from '../../../components/Coin';
import ButtonCustom from '../../../components/Button';

import { getUserDB, userSelector } from '../../../redux/reducers/userSlice';
import CustomInput from '../../../components/CustomInput';
import request from '../../../utils/request';
import { nothing } from 'immer';

const participants = ['1000', '2000', 'Nothing', '50000', '100000', 'Chia 2', 'Nhân 2'];
const number = [0, 5, 10, 15, 20];

const { width, height } = Dimensions.get('screen');

const WheelOfFortune1 = ({ navigation }) => {
    const { info_user } = useSelector(userSelector);
    const dispatch = useDispatch();
    const { control, handleSubmit } = useForm();

    const [isValue, setIsValue] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalAmountSpin, setModalAmountSpin] = useState(false);
    const [modalGift, setModalGift] = useState(false);

    const [giftRandomEnough, setGiftRandomEnough] = useState(null);

    const [winner, setWinner] = useState({
        winnerValue: null,
        winnerIndex: null,
    });
    const [started, setStarted] = useState(false);
    const childRef = useRef();

    let already_spin = info_user.game.already_spin;
    let maxProcess = 20;

    let border_color = '#EDE6DB';
    const wheelOptions = {
        rewards: participants,
        knobSize: 20,
        borderWidth: 3,
        borderColor: border_color,
        innerRadius: 20,
        duration: 6000,

        backgroundColor: border_color,
        textAngle: 'horizontal',
        knobSource: require('./knob.png'),
        onRef: (ref) => (childRef.current = ref),
    };

    // trừ số lượt khi quay
    const subtractAmountSpin = async () => {
        try {
            const updateAmountSpin = await request.patch(
                `game/update_amount/${info_user.game._id}`
            );

            let updateCountAmountSpin;
            if (already_spin <= maxProcess - 1) {
                updateCountAmountSpin = await request.patch(
                    `game/update_amount_already/${info_user.game._id}`
                );
            }
            if (updateCountAmountSpin) {
                if (updateCountAmountSpin.data.success && updateAmountSpin.data.success) {
                    dispatch(getUserDB());
                }
            } else {
                if (updateAmountSpin.data.success) {
                    dispatch(getUserDB());
                }
            }
        } catch (err) {
            console.log('Update amount : ', err.message);
        }
    };

    // nhấn quay
    const buttonPressSpin = () => {
        if (info_user.game.amount > 0) {
            subtractAmountSpin();
            setStarted(true);
            childRef.current._onPress();
        } else {
            Alert.alert(
                'Thông báo',
                'Bạn đã hết số lần quay. Hãy mua thêm số lần quay để tiếp tục',
                [
                    {
                        text: 'Trở về',
                        style: 'cancel',
                    },
                    { text: 'Đi mua thêm lượt', onPress: () => setModalAmountSpin(true) },
                ]
            );
        }
    };

    // nhấn quay lại
    const buttonPressAgain = () => {
        if (info_user.game.amount > 0) {
            subtractAmountSpin();
            setWinner({ winnerIndex: null });
            setModalVisible(false);
            childRef.current._tryAgain();
        } else {
            Alert.alert(
                'Thông báo',
                'Bạn đã hết số lần quay. Hãy mua thêm số lần quay để tiếp tục',
                [
                    {
                        text: 'Trở về',
                        style: 'cancel',
                    },
                    { text: 'Đi mua thêm lượt', onPress: () => setModalAmountSpin(true) },
                ]
            );
        }
    };

    // lịch sử quay
    const historySpin = () => {
        navigation.navigate('HistorySpinGame');
    };

    // mua só lần quay
    const handlePlusAmountSpin = ({ amount_spin }) => {
        console.log('loading: amount');
        (async () => {
            const res = await request.post('/transfer/amount_spin', {
                buy_amount: amount_spin,
                phone_number: info_user.phone_number,
            });

            const htrIntroduce = {
                phone_number: info_user.phone_number,
                exchange_point: amount_spin * info_user.game.price_amount,
                info_exchange_point: `do mua ${amount_spin} lần vòng quay may mắn`,
            };

            const htr = await request.post('history_point/add_phone', htrIntroduce);

            console.log('loading: amount -> done');

            if (res.data.success && htr.data.success) {
                Alert.alert(
                    'Bạn mua số lần quay thành công',
                    `Bạn được cộng thêm ${amount_spin} lần quay`
                );

                dispatch(getUserDB());
                setModalAmountSpin(false);
            } else {
                Alert.alert('Thông báo', `${res.data.message}`);
            }
        })();
    };

    // quay được diedmr thành công => cộng điểm
    const handleSuccessSpin = () => {
        setModalVisible(false);

        const value = winner.winnerValue;

        let amount_plus;
        let htrUserSpin = {};
        if (value == 'Chia 2') {
            amount_plus = -info_user.number_point / 2;
            htrUserSpin = {
                user_id: info_user._id,
                game_spin: amount_plus,
                info_game_spin: `Bạn bị trừ ${amount_plus} vì quay vào "${value}"`,
            };
        } else if (value == 'Nhân 2') {
            amount_plus = info_user.number_point;
            htrUserSpin = {
                user_id: info_user._id,
                game_spin: amount_plus,
                info_game_spin: `Bạn được cộng thêm ${amount_plus} vì quay vào "${value}"`,
            };
        } else if (value == 'Nothing') {
            amount_plus = 0;
            htrUserSpin = {
                user_id: info_user._id,
                game_spin: amount_plus,
                info_game_spin: `Bạn được không được cộng điểm nào vì quay vào "${value}"`,
            };
        } else {
            amount_plus = value;
            htrUserSpin = {
                user_id: info_user._id,
                game_spin: amount_plus,
                info_game_spin: `Bạn được cộng thêm ${amount_plus} vì quay vào ô "${value}"`,
            };
        }
        (async () => {
            const plusNumberPoint = await request.patch('user/update_number_point', {
                phone_number: info_user.phone_number,
                amount_plus,
            });

            const htr_user = await request.post('history_point/add_id', htrUserSpin);

            if (plusNumberPoint.data.success && htr_user.data.success) {
                dispatch(getUserDB());
            }
        })();
    };

    // quay dc diểm
    const handleWinnerValue = (value, index) => {
        setWinner({ winnerValue: value, winnerIndex: index });
        if (value) setModalVisible(true);
    };

    // đủ số lần nhận quà
    const handleGift = () => {
        setModalGift(false);
    };

    // kiểm tra nếu đủ số làn random quà
    const giftWhenEnoughAMount = [
        'Cong thêm 10 lượt',
        'Cộng thêm 10k điểm',
        'Cộng thêm 1k điểm',
    ];
    const pressGift = () => {
        setModalGift(true);
        if (already_spin == maxProcess) {
            let gift = Math.floor(Math.random() * giftWhenEnoughAMount.length);

            setGiftRandomEnough(giftWhenEnoughAMount[gift]);
        } else {
            setGiftRandomEnough(null);
        }
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
                <View
                    style={{
                        backgroundColor: color_amount,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // width: width / 3,
                        minWidth: width / 3,
                        height: 35,
                        borderRadius: 10,
                        paddingHorizontal: 5,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        <Fontisto name="spinner-fidget" size={20} color="white" />
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: '800' }}>
                            {' '}
                            {info_user.game.amount}
                        </Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setModalAmountSpin(true)}>
                        <FontAwesome name="plus-square" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        backgroundColor: color_amount,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // width: width / 3,
                        minWidth: width / 3,

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

                <TouchableOpacity activeOpacity={0.5} onPress={historySpin}>
                    <Ionicons name="ios-newspaper-outline" size={35} color="black" />
                </TouchableOpacity>
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
            <View style={{ paddingTop: 150 }}>
                <WheelOfFortune
                    options={wheelOptions}
                    getWinner={(value, index) => handleWinnerValue(value, index)}
                />
            </View>
            {/* end wheel */}

            {/*  */}
            <View style={{ marginTop: 170, paddingHorizontal: 15 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Text style={{ color: 'white', fontSize: 16, bottom: -7 }}>
                        No Spin
                    </Text>
                    <TouchableOpacity onPress={pressGift}>
                        <AntDesign name="gift" size={30} color="orange" />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Progress.Bar
                        progress={already_spin / maxProcess}
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
                    {number.map((value, index) => (
                        <Text key={index} style={{ color: 'white', fontWeight: '500' }}>
                            {value}
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
                        {already_spin == maxProcess
                            ? 'Bạn đã quay đủ số lần mở quà ngay '
                            : 'Khi bạn quay đủ số lần sẽ nhận được môt phần quà'}
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
                                ? buttonPressSpin
                                : winner.winnerIndex != null
                                ? buttonPressAgain
                                : null
                        }
                    />
                </View>
            </View>

            {/* modal success spin  */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    }}>
                    <ImageBackground
                        source={require('../../../assets/img/firework.gif')}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 10,
                            padding: 15,
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                            width: 250,
                            marginBottom: 100,
                        }}>
                        <Text
                            style={{
                                fontSize: 18,
                                textAlign: 'center',
                                color: 'orange',
                            }}>
                            Xin chúc mừng bạn đã nhận được{' '}
                            <Text style={{ color: 'red' }}>
                                {participants[winner.winnerIndex]} điểm
                            </Text>
                            . Bạn còn{' '}
                            <Text style={{ color: 'red' }}>{info_user.game.amount}</Text>{' '}
                            số lần quay
                        </Text>
                        <ButtonCustom
                            name="CONTINUE"
                            onPress={handleSuccessSpin}
                            marginHorizontal={null}
                            padding={10}
                            borderRadius={5}
                            marginTop={10}
                            backgroundColor={'#377D71'}
                        />
                    </ImageBackground>
                </View>
            </Modal>
            {/* end modal success spin  */}

            {/* modal gift */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalGift}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalGift);
                }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    }}>
                    {already_spin == maxProcess ? (
                        <ImageBackground
                            source={require('../../../assets/img/firework.gif')}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 10,
                                padding: 15,
                                alignItems: 'center',
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5,
                                width: 250,
                                marginBottom: 100,
                            }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    textAlign: 'center',
                                    color: 'black',
                                }}>
                                Xin chúc mừng bạn nhận được món quà
                                <Text style={{ color: 'red' }}>
                                    {' '}
                                    " {giftRandomEnough} "
                                </Text>{' '}
                                khi quay đủ {maxProcess} lần
                            </Text>

                            <ButtonCustom
                                name="CONTINUE"
                                onPress={handleGift}
                                marginHorizontal={null}
                                padding={10}
                                borderRadius={5}
                                marginTop={10}
                                backgroundColor={'#377D71'}
                            />
                        </ImageBackground>
                    ) : (
                        <View
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 10,
                                padding: 15,
                                alignItems: 'center',
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5,
                                width: 250,
                                marginBottom: 100,
                            }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    textAlign: 'center',
                                    color: 'black',
                                }}>
                                Bạn chưa quay đủ số lần để nhận phần quà
                            </Text>

                            <ButtonCustom
                                name="CONTINUE"
                                onPress={handleGift}
                                marginHorizontal={null}
                                padding={10}
                                borderRadius={5}
                                marginTop={10}
                                backgroundColor={'#377D71'}
                            />
                        </View>
                    )}
                </View>
            </Modal>
            {/* end modal gift*/}

            {/* modal plus amount  */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalAmountSpin}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalAmountSpin(!modalAmountSpin);
                }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 10,
                            padding: 20,
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                            width: 300,
                            marginBottom: 100,
                        }}>
                        <Text style={{ fontSize: 18 }}>Nhập số lượt quay muốn mua </Text>
                        <View>
                            <Text style={{ fontSize: 18 }}>
                                {info_user.game.price_amount}đ được 1 lần quay
                            </Text>
                        </View>
                        <CustomInput
                            control={control}
                            keyboardType={'number-pad'}
                            rules={{ required: 'Bạn phải nhập số lượng muốn dổi' }}
                            name={'amount_spin'}
                            placeholder={'...........................................'}
                            marginVertical={15}
                            padding={null}
                            textAlign={'center'}
                            iconRight={
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => inputRef_1.current.focus()}>
                                    <EvilIcons name="pencil" size={30} color="#aaa" />
                                </TouchableOpacity>
                            }
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                            }}>
                            <ButtonCustom
                                name="Xác nhận"
                                marginHorizontal={null}
                                borderRadius={5}
                                padding={10}
                                marginRight={10}
                                onPress={handleSubmit(handlePlusAmountSpin)}
                            />
                            <ButtonCustom
                                name="Quay lại"
                                marginHorizontal={null}
                                borderRadius={5}
                                padding={10}
                                backgroundColor={'orange'}
                                onPress={() => setModalAmountSpin(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            {/* end modal plus amount  */}
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
